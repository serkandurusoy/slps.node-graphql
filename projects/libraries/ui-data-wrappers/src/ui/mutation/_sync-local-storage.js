import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CrossStorageClient } from 'cross-storage';

const mutation = crossStorageUrl => WrappedComponent =>
  class extends Component {
    static propTypes = {
      syncToStore: PropTypes.func,
      methodsOnly: PropTypes.bool,
      pollInterval: PropTypes.number,
    }

    static defaultProps = {
      syncToStore: () => {},
      methodsOnly: false,
      pollInterval: 10,
    }

    state = {
      initializing: true,
      working: false,
      error: false,
      storage: {},
    }

    async componentWillMount() {
      window.timers = window.timers || {};
      window.timers.crossStorage = window.timers.crossStorage || [];

      window.timers.crossStorage.forEach(timer => clearInterval(timer));
      window.timers.crossStorage = [];

      this.storage = new CrossStorageClient(crossStorageUrl, {
        timeout: this.props.pollInterval * 1000,
        frameId: 'sloopsCrossStorage',
      });

      try {
        await this.storage.onConnect();

        await this.syncLocalStorageToState();

        /* TODO: instead of polling, we can set up dedicated event tracking html pages
           for each subscribing domain so that we can use
           window.addEventListener('storage', console.log, false)
           to synchronize back to the component state
         */
        if (this.props.pollInterval > 0) {
          window.timers.crossStorage.push(setInterval(
            this.syncLocalStorageToState,
            this.props.pollInterval * 1000,
          ));
        }

        this.syncState({ initializing: false, error: false });
      } catch (ignore) {
        this.syncState({ initializing: false, error: true });
      }
    }

    componentDidMount() {
      this.componentIsMounted = true;
    }

    async componentWillUnmount() {
      this.componentIsMounted = false;
      if (this.props.pollInterval > 0) {
        window.timers.crossStorage.forEach(timer => clearInterval(timer));
        window.timers.crossStorage = [];
      }
    }

    setStateIfMounted = (stateFunction, callback) => {
      if (this.componentIsMounted) {
        this.setState(stateFunction, callback);
      }
    }

    getLocalStorage = async (key) => {
      this.syncState({ working: true, error: false });
      try {
        const value = await this.storage.get(`sloops:${key}`);
        await this.syncLocalStorageToState();
        this.syncState({ working: false, error: false });
        return JSON.parse(value);
      } catch (ignore) {
        this.syncState({ working: false, error: true });
        return false;
      }
    }

    setLocalStorage = async (key, value) => {
      this.syncState({ working: true, error: false });
      try {
        await this.storage.set(`sloops:${key}`, JSON.stringify(value));
        await this.syncLocalStorageToState();
        this.syncState({ working: false, error: false });
        return true;
      } catch (ignore) {
        this.syncState({ working: false, error: true });
        return false;
      }
    }

    syncState = (payload) => {
      this.setStateIfMounted(() => payload, () => {
        const {
          initializing,
          working,
          error,
          storage,
        } = this.state;
        this.props.syncToStore({
          initializing,
          working,
          error,
          storage,
        });
      });
    }

    syncLocalStorageToState = async () => {
      // TODO: document.hidden helps reduce load on inactive tabs, but causes ux inconsistencies
      if (!document.hidden) {
        this.syncState({ working: true, error: false });
        try {
          const allKeys = await this.storage.getKeys();
          const sloopsKeys = allKeys.reduce((sloopsKeysBuilder, key) => {
            const sloopsKey = key.split('sloops:')[1];
            return sloopsKey ? [
              ...sloopsKeysBuilder,
              sloopsKey,
            ] : sloopsKeysBuilder;
          }, []);
          const storage = await sloopsKeys
            .reduce(async (localStorageBuilderPromise, key) => {
              const localStorageBuilder = await localStorageBuilderPromise;
              const value = await this.storage.get(`sloops:${key}`);
              return {
                ...localStorageBuilder,
                [key]: JSON.parse(value),
              };
            }, {});
          this.syncState({ storage, working: false, error: false });
        } catch (ignore) {
          this.syncState({ working: false, error: true });
        }
      }
    }

    componentIsMounted = false

    delLocalStorage = async (key) => {
      this.syncState({ working: true, error: false });
      try {
        await this.storage.del(`sloops:${key}`);
        await this.syncLocalStorageToState();
        this.syncState({ working: false, error: false });
        return true;
      } catch (ignore) {
        this.syncState({ working: false, error: true });
        return false;
      }
    }

    render() {
      const {
        initializing,
        working,
        error,
        storage,
      } = this.state;

      const {
        syncToStore,
        methodsOnly,
        pollInterval,
        ...props
      } = this.props;

      return methodsOnly
        ? <WrappedComponent
          localStorage={{
            dispatch: {
              set: this.setLocalStorage,
              del: this.delLocalStorage,
            },
          }}
          {...props}
        />
        : <WrappedComponent
          localStorage={{
            dispatch: {
              get: this.getLocalStorage,
              set: this.setLocalStorage,
              del: this.delLocalStorage,
            },
            state: {
              initializing,
              working,
              error,
              storage,
            },
          }}
          {...props}
        />;
    }
  };

export default mutation;
