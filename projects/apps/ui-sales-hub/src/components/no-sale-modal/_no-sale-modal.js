import React from 'react';
import PropTypes from 'prop-types';
import { Forms, Modal, Button } from '@sloops/library-ui-components';

const NoSaleModal = ({ isOpen, onCloseModal }) => (
  <Modal
    maxWidth="420px"
    isOpen={isOpen}
    title="No Sale"
    onCloseModal={onCloseModal}
  >
    <div className="text-center">
      <p>
        The contact will be re-assign to the sales manager.
      </p>
      <p>
        Please provide information in the note below about the cause
      </p>
      <Forms.LongTextFieldInput name="note" />
      <Button label="Confirm" onClick={onCloseModal} />
    </div>
  </Modal>
);

NoSaleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default NoSaleModal;
