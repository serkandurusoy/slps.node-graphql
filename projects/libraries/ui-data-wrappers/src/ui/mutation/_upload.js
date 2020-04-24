import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import axios from 'axios';
import { getSignedUploadUrl } from './_gql';

const mutation = (targetType, targetArgs) =>
  WrappedComponent =>
    graphql(getSignedUploadUrl)(class extends Component {
      static propTypes = {
        mutate: PropTypes.func.isRequired,
      }

      componentDidMount() {
        this.componentIsMounted = true;
      }

      componentWillUnmount() {
        this.componentIsMounted = false;
      }

      componentIsMounted = false

      upload = async (file, setProgress) => {
        try {
          const {
            data,
          } = await this.props.mutate({
            variables: {
              fileName: file.name,
              fileType: file.type,
              targetType,
              targetArgs,
            },
          });
          const {
            uploadUrl,
            downloadUrl,
          } = {
            ...(data && data.getSignedUploadUrl && {
              uploadUrl: data.getSignedUploadUrl.uploadUrl,
              downloadUrl: data.getSignedUploadUrl.downloadUrl,
            }),
          };

          await axios({
            method: 'PUT',
            url: uploadUrl,
            headers: { 'Content-Type': file.type },
            data: file.file,
            onUploadProgress({ loaded, total }) {
              setProgress(
                file.name,
                downloadUrl,
                Math.min(100, Math.round((loaded * 100) / total)),
              );
            },
          });
        } catch (e) {
          if (this.componentIsMounted) setProgress(file.name, '', -1);
        }
      }

      render() {
        const {
          mutate,
          ...props
        } = this.props;

        return (<WrappedComponent
          upload={this.upload}
          {...props}
        />);
      }
    });

export default mutation;
