import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { hashPassword } from '@sloops/library-utils';
import { httpBasicAuth } from './_gql';

const mutation = WrappedComponent => graphql(httpBasicAuth)(class extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }

  state = {
    error: false,
    loading: false,
    rejected: false,
    authenticated: false,
    retries: 0,
  }

  componentDidMount() {
    this.componentIsMounted = true;
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  setStateIfMounted = (stateFunction, callback) => {
    if (this.componentIsMounted) {
      this.setState(stateFunction, callback);
    }
  }

  componentIsMounted = false

  makeApiCall = async (password) => {
    this.setStateIfMounted(state => ({
      loading: true,
      retries: state.retries + 1,
    }));

    try {
      const {
        data,
      } = await this.props.mutate({
        variables: {
          password: hashPassword(password),
        },
      });
      const authenticated = data && data.httpBasicAuth && data.httpBasicAuth.authenticated;
      this.setStateIfMounted(() => ({
        loading: false,
        authenticated,
        rejected: !authenticated,
      }));
    } catch (e) {
      this.setStateIfMounted(() => ({
        loading: false,
        error: true,
      }));
    }

    if (!this.state.authenticated && this.state.retries <= 3) {
      setTimeout(() => {
        this.setStateIfMounted(() => ({
          error: false,
          loading: false,
          rejected: false,
          authenticated: false,
        }));
      }, 2000);
    }
  }

  render() {
    const {
      authenticated,
      rejected,
      loading,
      error,
    } = this.state;

    const {
      mutate,
      ...props
    } = this.props;

    return (<WrappedComponent
      authenticated={authenticated}
      rejected={rejected}
      loading={loading}
      error={error}
      makeApiCall={this.makeApiCall}
      {...props}
    />);
  }
});

export default mutation;
