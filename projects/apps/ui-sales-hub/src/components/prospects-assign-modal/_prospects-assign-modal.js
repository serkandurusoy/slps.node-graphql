import React from 'react';
import PropTypes from 'prop-types';
import { Forms, Modal, Button } from '@sloops/library-ui-components';

const ProspectsAssignModal = ({ isOpen, onCloseModal }) => (
  <Modal
    isOpen={isOpen}
    onCloseModal={onCloseModal}
    title="Assign responsible team member"
    maxWidth="450px"
  >
    <div>
      <div className="text-center">
        John Doe
      </div>
      <div className="margin-bottom-30 text-center">
        Straßburger str. 6, 10405, Berlin
      </div>
      <div className="margin-bottom-30">
        <Forms.SelectFieldInput
          autoComplete
          options={[{ label: 'User 1', value: 'user-1' }, { label: 'User 2', value: 'user-2' }]}
        />
      </div>
      <div className="text-center">
        <Button label="Confirm" onClick={onCloseModal} />
      </div>
    </div>
  </Modal>
);

ProspectsAssignModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default ProspectsAssignModal;
