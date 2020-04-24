import React from 'react';
import PropTypes from 'prop-types';
import { Forms, Modal, Button } from '@sloops/library-ui-components';

const ScheduleMeetingModal = ({ isOpen, onCloseModal }) => (
  <Modal
    maxWidth="420px"
    isOpen={isOpen}
    title="Schedule a Meeting"
    onCloseModal={onCloseModal}
  >
    <div className="text-center">
      <Forms.TextFieldInput name="title" type="text" label="Title" />
      <Forms.TextFieldInput name="lead" type="text" label="Lead" />
      <Forms.DateTimeInput name="datetime" type="text" label="Date and Time" />
      <Forms.TextFieldInput name="location" type="text" label="Location" />
      <Forms.LongTextFieldInput name="notes" label="Notes" />
      <Button label="Send" onClick={onCloseModal} />
    </div>
  </Modal>
);

ScheduleMeetingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ScheduleMeetingModal;
