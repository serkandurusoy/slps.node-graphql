import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { refreshToken } from './_gql';

const mutation = WrappedComponent => graphql(refreshToken)(class extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    localStorage: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    token: PropTypes.string,
    exp: PropTypes.number,
  }

  static defaultProps = {
    token: '',
    exp: 0,
  }

  state = {
    loading: false,
  }

  componentWillMount() {
    window.timers = window.timers || {};
    window.timers.refreshToken = window.timers.refreshToken || [];

    window.timers.refreshToken.forEach(timer => clearTimeout(timer));
    window.timers.refreshToken = [];
  }

  componentDidMount() {
    this.componentIsMounted = true;
  }

  async componentWillReceiveProps(props) {
    // TODO: improve this logic to handle role changes within the day
    if (props.exp !== this.props.exp && props.exp > 0) {
      const remainingMillis = (props.exp * 1000) - Date.now();
      if (remainingMillis <= 0) {
        props.localStorage.dispatch.del('token');
      } else if (remainingMillis <= 60 * 1000) {
        await this.refreshToken(props.token);
      } else {
        window.timers.refreshToken.forEach(timer => clearTimeout(timer));
        window.timers.refreshToken = [];
        // TODO: let's refactor this to proper frame communication and proper checks
        // await this.refreshToken(props.token);
        window.timers.refreshToken.push(setTimeout(
          () => this.refreshToken(props.token),
          remainingMillis - (60 * 1000),
        ));
      }
    }
  }

  componentWillUnmount() {
    window.timers.refreshToken.forEach(timer => clearTimeout(timer));
    window.timers.refreshToken = [];
    this.componentIsMounted = false;
  }

  setStateIfMounted = (stateFunction, callback) => {
    if (this.componentIsMounted) {
      this.setState(stateFunction, callback);
    }
  }

  componentIsMounted = false

  refreshToken = async (token) => {
    this.setStateIfMounted(() => ({
      loading: true,
    }));

    try {
      const {
        data,
      } = await this.props.mutate({
        variables: {
          token,
        },
      });
      this.setStateIfMounted(() => ({
        loading: false,
      }));
      if (data && data.refreshToken) {
        this.props.localStorage.dispatch.set('token', data.refreshToken.token);
      }
    } catch (e) {
      this.setStateIfMounted(() => ({
        loading: false,
      }));
      this.props.localStorage.dispatch.del('token');
    }
  }

  render() {
    const {
      loading,
    } = this.state;

    const {
      mutate,
      localStorage,
      token,
      ...props
    } = this.props;

    return (<WrappedComponent
      loading={loading}
      {...props}
    />);
  }
});

export default mutation;
