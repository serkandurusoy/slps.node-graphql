import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { UploadFieldInput } from '../forms/_upload-field';

const stories = storiesOf('Forms/UploadField input component', module);

const fakeUploader = (file, setProgress) => {
  const cloudStorageDomain = 'slps-stg-images.storage.googleapis.com';
  const folder = '/path/to/folder/';
  const downloadUrl = `https://${cloudStorageDomain}${folder}${file.name}`;
  let progress = 0;
  const increment = Math.round(10 + (Math.random() * 30));
  const timer = setInterval(() => {
    if (increment >= 20) {
      setProgress(file.name, downloadUrl, Math.min(100, progress += increment));
    } else {
      // somewhat random fake upload error
      setProgress(file.name, '', -1);
    }
    if (increment < 20 || progress >= 100) clearInterval(timer);
  }, 300);
};

const limit = 2 * 1024 * 1024;

const mimeTypes = [
  'image/jpeg',
  'image/png',
];

const getRandomDimension = () => 400 + (Math.round((Math.random() * 50)) * 10);

const initialFiles = [
  `https://loremflickr.com/${getRandomDimension()}/${getRandomDimension()}/kitten`,
  `https://loremflickr.com/${getRandomDimension()}/${getRandomDimension()}/puppy`,
];


stories.add('Single jpg or png file', withInfo('demonstrates usecase with logo upload as single image in jpg or png format')(() => (<UploadFieldInput
  mimeTypes={mimeTypes}
  limit={limit}
  onChange={action('files changed')}
  upload={fakeUploader}
  error=""
  value={initialFiles[0]}
/>)));

stories.add('Multiple jpg files', withInfo('demonstrates usecase with product picture upload as multiple images in jpg format')(() => (<UploadFieldInput
  mimeTypes={mimeTypes.slice(0, 1)}
  limit={limit}
  onChange={action('files changed')}
  upload={fakeUploader}
  error=""
  multiple
  value={initialFiles}
/>)));
