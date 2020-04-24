import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';
import Button from '../button';
import Icon from '../icon';
import genericFile from './_upload-field-generic-file-icon';

const styles = {
  dropZone: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '244px',
    borderRadius: '25px',
    backgroundColor: 'rgba(185, 195, 200, 0.2)',
    boxShadow: '0 0 100px 0 rgba(18, 43, 35, 0.1)',
    border: 'dashed 1px #979797',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontFamily: 'Open Sans',
    fontSize: '14px',
    color: '#657d95',
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  dropZoneHighlight: {
    color: '#4acba4',
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
    display: 'inline-block',
    boxSizing: 'border-box',
    borderRadius: 15,
    width: 200,
    margin: '10px',
    boxShadow: '0 0 100px 0 rgba(18, 43, 35, 0.1)',
  },
  imageContainer: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    borderRadius: 2,
    width: '100%',
    height: 160,
  },
  buttonsWrapper: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '20px',
    margin: '5px',
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 1,
  },
  retryButton: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    zIndex: 1,
  },
  fileName: {
    boxSizing: 'border-box',
    position: 'absolute',
    fontFamily: 'Open Sans',
    fontSize: 12,
    lineHeight: '16px',
    padding: 2,
    color: '#635E4F',
    bottom: '5px',
    left: 0,
    width: 184,
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'no-wrap',
    textOverflow: 'ellipsis',
  },
  fileNameWithUploadError: {
    backgroundColor: '#DDB5AE',
    color: '#fff',
  },
  dropError: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    whiteSpace: 'no-wrap',
    textOverflow: 'ellipsis',
    backgroundColor: '#DDB5AE',
    padding: 16,
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: '22px',
    color: '#fff',
    zIndex: 2,
  },
};

export class UploadFieldInput extends Component {
  static displayName = 'UploadField';

  static propTypes = {
    upload: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    limit: PropTypes.number,
    mimeTypes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.oneOfType([ // eslint-disable-line
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    onChange: PropTypes.func, // eslint-disable-line
    input: PropTypes.object, // eslint-disable-line
    error: PropTypes.string.isRequired,
  };

  static defaultProps = {
    limit: 2 * 1024 * 1024,
    multiple: false,
  };

  static sortByFileName = files => [...files].sort((l, r) => (l.name > r.name ? 1 : -1))

  static sortFiles = (files) => {
    if (typeof files === 'string') return files;
    if (typeof files[0] === 'string') return [...files].sort();
    return files
      .reduce(([successful, failed], file) => ([
        UploadFieldInput.sortByFileName([...successful, ...(file.progress >= 0 ? [file] : [])]),
        UploadFieldInput.sortByFileName([...failed, ...(file.progress < 0 ? [file] : [])]),
      ]), [[], []])
      .reduce((outer, inner) => [...outer, ...inner], []);
  }

  state = {
    initialFiles: (() => {
      const value = (this.props.input && this.props.input.value) || this.props.value;
      return !value
        ? []
        : this.props.multiple
          ? value
          : UploadFieldInput.sortFiles([value]);
    })(),
    newFiles: [],
    rejectedFiles: [],
  }

  componentDidMount() {
    this.componentIsMounted = true;
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  onChange = (
    this.props.input
    && this.props.input.onChange
  ) || this.props.onChange

  onDrop = async (acceptedFiles, rejectedFiles) => {
    this.setStateIfMounted(() => ({
      rejectedFiles: UploadFieldInput.sortFiles([
        ...!this.props.multiple
        && acceptedFiles.length > 1
        && acceptedFiles.slice(1),
        ...rejectedFiles,
      ].map(file => file.name)),
    }), () => setTimeout(() => this.setStateIfMounted(() => ({ rejectedFiles: [] })), 3000));

    if (!this.props.multiple) acceptedFiles.splice(1);

    const newFiles = await Promise.all(acceptedFiles
      .filter(acceptedFile =>
        [
          ...this.state.initialFiles.map(fileUrl => fileUrl.split('/').slice(-1)[0]),
          ...this.state.newFiles.map(file => file.name),
        ].findIndex(fileName =>
          fileName === this.normalizeFileName(acceptedFile.name)) === -1)
      .map(async file => ({
        file,
        name: this.normalizeFileName(file.name),
        downloadUrl: '',
        type: file.type,
        dataURL: await this.blobToDataURL(file),
        size: file.size,
        progress: 0,
      })));

    if (newFiles.length) {
      this.setStateIfMounted(state => ({
        newFiles: UploadFieldInput.sortFiles(!this.props.multiple
          ? newFiles
          : [...state.newFiles, ...newFiles]),
      }), () => {
        newFiles.forEach((file) => {
          this.props.upload(file, (fileName, downloadUrl, progress) =>
            this.setStateIfMounted(state => ({
              newFiles: UploadFieldInput.sortFiles(state.newFiles.map(newFile => ({
                ...newFile,
                downloadUrl: newFile.name === fileName ? downloadUrl : newFile.downloadUrl,
                progress: newFile.name === fileName ? progress : newFile.progress,
              }))),
            }), () => {
              if (progress === 100) this.callOnChange();
            }));
        });
      });
    }
  }

  setStateIfMounted = (stateFunction, callback) => {
    if (this.componentIsMounted) {
      this.setState(stateFunction, callback);
    }
  }

  componentIsMounted = false

  retryFile = (name) => {
    const file = this.state.newFiles.find(newFile => newFile.name === name);
    if (file) {
      this.props.upload(file, (fileName, downloadUrl, progress) =>
        this.setStateIfMounted(state => ({
          newFiles: UploadFieldInput.sortFiles(state.newFiles.map(newFile => ({
            ...newFile,
            downloadUrl: newFile.name === fileName ? downloadUrl : newFile.downloadUrl,
            progress: newFile.name === fileName ? progress : newFile.progress,
          }))),
        }), () => {
          if (progress === 100) this.callOnChange();
        }));
    }
  }

  removeFile = (urlOrName) => {
    this.setStateIfMounted(state => ({
      initialFiles: state.initialFiles.filter(file => file !== urlOrName),
      newFiles: state.newFiles.filter(file => file.name !== urlOrName),
    }), () => {
      this.callOnChange();
    });
  }

  normalizeFileName = name => name.replace(/[^\w\d_\-.]+/ig, '').toLowerCase()

  callOnChange = () => {
    const newValue = [
      ...this.state.initialFiles,
      ...this.state.newFiles
        .filter(newFile => !!newFile.downloadUrl && newFile.progress === 100)
        .map(newFile => newFile.downloadUrl),
    ];
    const value = this.props.multiple ? newValue : newValue.slice(-1)[0];
    this.onChange(value || null);
  }

  blobToDataURL = async blob => new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = e => resolve(e.target.result);
    fileReader.readAsDataURL(blob);
  })

  renderFilePreview = (file) => {
    const initialFile = typeof file === 'string';
    const id = initialFile ? file : file.name;
    const fileName = id.split('/').slice(-1)[0];
    const image = initialFile
      ? file
      : (!initialFile && file.type.indexOf('image') === -1)
        ? genericFile
        : file.dataURL;
    // const color = initialFile ? '#DAF2CB' : file.progress >= 0 ? '#F2ECB6' : '#DDB5AE';
    const progress = initialFile ? 100 : file.progress;
    return (
      <div
        key={id}
        style={{
          ...styles.imageWrapper,
        }}
      >
        <div style={styles.buttonsWrapper}>
          <div
            style={{
              ...styles.imageContainer,
              backgroundImage: `url(${image})`,
            }}
          />
          {
            !initialFile && progress < 0 && <Button
              style={styles.retryButton}
              className="delete-button"
              icon={<Icon name="circled-add" />}
              tiny
              onClick={(e) => {
                e.stopPropagation();
                this.retryFile(id);
              }}
            />
          }
          <Button
            style={styles.deleteButton}
            className="delete-button"
            danger
            tiny
            disabled={progress > 0 && progress < 100}
            icon={<Icon name="bin" />}
            onClick={(e) => {
              e.stopPropagation();
              this.removeFile(id);
            }}
          />
          {
            <div
              style={{
                ...styles.fileName,
                background: progress > 0 && progress < 100
                  ? `linear-gradient(90deg, #DAF2CB ${progress}%, #ffffff ${100 - progress}%)`
                  : '#ffffff',
              }}
            >
              {fileName}
            </div>
          }
        </div>
      </div>
    );
  }

  renderDropError = () => (
    <div
      style={styles.dropError}
      onClick={e => e.stopPropagation()}
    >
      {this.state.rejectedFiles.join(', ')}
      {' '}
      {this.state.rejectedFiles.length === 1 ? 'is' : 'are'}
      {' '}
      not allowed for upload. Please make sure you are uploading
      {' '}
      {!this.props.multiple ? 'just one file' : 'files'}
      {' '}
      where file size is less than
      {' '}
      {Math.round(this.props.limit / 1024 / 1024)}
      {' '}
      MB, file type matches
      {' '}
      {this.props.mimeTypes.map(type => type.replace('image/', '')).join(', ')}
      {' '}
      file name is different than existing files.
    </div>
  )

  render() {
    return (
      <Dropzone
        disablePreview
        // disableClick
        style={styles.dropZone}
        multiple={this.props.multiple}
        onDrop={this.onDrop}
        accept={this.props.mimeTypes.join(', ')}
        maxSize={this.props.limit}
      >
        {
          !this.state.initialFiles.length && !this.state.newFiles.length
            ? (
              <div>
                Drag and drop images or
                <span style={styles.dropZoneHighlight}> select them </span>
                from your computer
              </div>
            ) : null
        }
        {
          [
            ...this.state.initialFiles,
            ...this.state.newFiles,
          ]
            .filter((file, ix, arr) => this.props.multiple || ix === arr.length - 1)
            .map(this.renderFilePreview)
        }
        {!!this.state.rejectedFiles.length && this.renderDropError()}
      </Dropzone>
    );
  }
}

const UploadField = props => <Field component={UploadFieldInput} {...props} />;

export default UploadField;
