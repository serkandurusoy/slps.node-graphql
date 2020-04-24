import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Forms, Button } from '@sloops/library-ui-components';
import { NoSaleModal } from '../../components/no-sale-modal';

const PipelineContactsProspectsEditComponent = ({
  closeNoSaleModal,
  openNoSaleModal,
  isNoSaleModalOpen,
}) => (
  <div>
    <div>
      <Button label="No sale" secondary onClick={openNoSaleModal} />
    </div>
    <div>
      <Forms.LongTextFieldInput label="Notes" name="notes" />
    </div>
    <NoSaleModal isOpen={isNoSaleModalOpen} onCloseModal={closeNoSaleModal} />
  </div>
);

PipelineContactsProspectsEditComponent.propTypes = {
  closeNoSaleModal: PropTypes.func.isRequired,
  openNoSaleModal: PropTypes.func.isRequired,
  isNoSaleModalOpen: PropTypes.bool.isRequired,
};

// TODO: class just for future data integration...
class PipelineContactsProspectsEdit extends Component {
  state = {
    isNoSaleModalOpen: false,
  }
  closeNoSaleModal = () => {
    this.setState({
      isNoSaleModalOpen: false,
    });
  }
  openNoSaleModal = () => {
    this.setState({
      isNoSaleModalOpen: true,
    });
  }
  render() {
    return (
      <PipelineContactsProspectsEditComponent
        openNoSaleModal={this.openNoSaleModal}
        closeNoSaleModal={this.closeNoSaleModal}
        isNoSaleModalOpen={this.state.isNoSaleModalOpen}
        {...this.props}
      />
    );
  }
}

export default PipelineContactsProspectsEdit;
