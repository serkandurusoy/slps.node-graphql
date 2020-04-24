import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

const createMutationHoc = (
  gql,
  {
    transformArgs,
    transformResult,
  },
) => WrappedComponent => graphql(gql)(class extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }

  state = {
    loading: false,
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

  makeApiCall = async (...inputArgs) => {
    const mutationArgs = transformArgs(...inputArgs);

    this.setStateIfMounted(() => ({
      loading: true,
    }));

    try {
      const {
        data,
      } = await this.props.mutate(mutationArgs);
      this.setStateIfMounted(() => ({
        loading: false,
      }));
      return { result: transformResult(data) };
    } catch (e) {
      this.setStateIfMounted(() => ({
        loading: false,
      }));
      const networkErrorMessage = e.networkError
        && e.networkError.message;
      const graphQLErrorMessage = e.graphQLErrors
        && e.graphQLErrors[0]
        && e.graphQLErrors[0].message;
      const errorMessage = networkErrorMessage || graphQLErrorMessage;
      return { error: { _error: errorMessage } };
    }
  }

  render() {
    const {
      loading,
    } = this.state;

    const {
      mutate,
      ...props
    } = this.props;

    return (<WrappedComponent
      {...props}
      loading={loading}
      makeApiCall={this.makeApiCall}
    />);
  }
});

export default createMutationHoc;
