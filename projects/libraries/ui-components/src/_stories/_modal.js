import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Modal from '../modal';

const stories = storiesOf('Modal component', module);

const dummyData = `
  lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
`;

stories.add('Modal Window with close button and title', withInfo('demonstrates modal window with custom content, close button and title')(() => (
  <div style={{ width: '800px' }}>
    <div style={{ backgroundColor: 'green', color: 'white', padding: '100px' }}>
      {dummyData}
    </div>
    <Modal
      isOpen
      title="Custom title for modal"
      maxWidth="400px"
    >
      <div style={{ textAlign: 'center' }}>Test content of modal window!</div>
    </Modal>
  </div>
)));

stories.add('Modal Window without close button and title', withInfo('demonstrates modal window with custom content')(() => (
  <div style={{ width: '800px' }}>
    <div style={{ backgroundColor: 'green', color: 'white', padding: '100px' }}>
      {dummyData}
    </div>
    <Modal
      isOpen
      maxWidth="400px"
      noCloseButton
    >
      <div>Modal window without title and close button, just custom content!</div>
    </Modal>
  </div>
)));
