import React from 'react';
import PropTypes from 'prop-types';
import { DataList, Button, Forms, Icon, Modal } from '@sloops/library-ui-components';

// TODO: just mocked data

const dataListHeader = {
  expandableData: { label: '\u00a0', type: DataList.Expand, width: 40 },
  name: { label: 'Name', type: DataList.Text },
  category: { label: 'Category', type: DataList.Text },
  inStock: { label: 'In Stock', type: DataList.Switcher },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
  secondButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = [
  {
    expandableData: [[
      {
        label: 'SKU',
        value: '001771153148',
      },
      {
        label: 'Price',
        value: '99EUR',
      },
      {
        label: 'Size',
        value: '42',
      },
      {
        switcher: true,
        checked: false,
        onChange() {},
      },
    ],
    [
      {
        label: 'SKU',
        value: '001771153148',
      },
      {
        label: 'Price',
        value: '100EUR',
      },
      {
        label: 'Size',
        value: '41',
      },
      {
        switcher: true,
        checked: true,
        onChange() {},
      },
    ]],
    name: { label: 'Fancy Shoes' },
    category: { label: 'Shoes' },
    inStock: {
      checked: false,
      onChange() {},
    },
    firstButton: {
      label: 'Edit',
      icon: 'edit',
      onClick() {},
    },
    secondButton: {
      label: 'Delete',
      icon: 'bin',
      danger: true,
      onClick() {},
    },
  },
  {
    expandableData: [[
      {
        label: 'SKU',
        value: '001771153148',
      },
      {
        label: 'Price',
        value: '99EUR',
      },
      {
        label: 'Size',
        value: '42',
      },
      {
        switcher: true,
        checked: false,
        onChange() {},
      },
    ],
    [
      {
        label: 'SKU',
        value: '001771153148',
      },
      {
        label: 'Price',
        value: '100EUR',
      },
      {
        label: 'Size',
        value: '41',
      },
      {
        switcher: true,
        checked: true,
        onChange() {},
      },
    ]],
    name: { label: 'Rolex Watch' },
    category: { label: 'Watch' },
    inStock: { checked: true, onChange() {} },
    firstButton: {
      label: 'Edit',
      icon: 'edit',
      onClick() {},
    },
    secondButton: {
      label: 'Delete',
      icon: 'bin',
      danger: true,
      onClick() {},
    },
  },
];

const InventoryComponent = ({
  dataList,
  dataHeader,
  isModalOpened,
  closeModal,
  openModal,
  openBarcodeView,
  openManualUploadView,
}) => (
  <div>
    <div className="pages-search-tools no-margin-top">
      <div className="pages-search-field-wrapper">
        <Button
          className="pages-search-btn" // TODO: create text field with action buttons
          onClick={() => {}}
          icon={<Icon name="search" />}
          iconPosition="right"
        />
        <Forms.TextFieldInput
          className="pages-search-field"
          name="pages-leads-search"
          type="text"
          placeHolder="Search (Name, email, phone number)"
        />
      </div>
      <div className="pages-buttons">
        <Button label="Add new Product" onClick={() => openModal('add-new-product')} />
      </div>
    </div>
    <div>
      <DataList.DataList header={dataHeader} data={dataList} />
    </div>
    <Modal
      maxWidth="400px"
      isOpen={isModalOpened === 'add-new-product'}
      title="Scan or upload new product"
      onCloseModal={closeModal}
    >
      <div className="text-center">
        <Button label="Barcode scanner" large fullWidth onClick={() => openModal('barcode-confirmation')} />
        <Button label="Manual upload" className="margin-top-30" large fullWidth onClick={openManualUploadView} />
      </div>
    </Modal>
    <Modal
      maxWidth="400px"
      isOpen={isModalOpened === 'barcode-confirmation'}
      title="Confirm access to device camera"
      onCloseModal={closeModal}
    >
      <div className="text-center">
        <Button label="Confirm" large fullWidth onClick={openBarcodeView} />
        <Button label="Deny" danger className="margin-top-30" large fullWidth onClick={closeModal} />
      </div>
    </Modal>
  </div>
);

InventoryComponent.propTypes = {
  dataList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  dataHeader: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isModalOpened: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openBarcodeView: PropTypes.func.isRequired,
  openManualUploadView: PropTypes.func.isRequired,
};

// TODO: class just for future data integration...
class Inventory extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }
  state = {
    isModalOpened: '',
  }
  closeModal = () => {
    this.setState({
      isModalOpened: '',
    });
  }
  openModal = (type) => {
    this.setState({
      isModalOpened: type,
    });
  }
  openBarcodeView = () => {
    this.props.history.push(`${this.props.match.url}/add/barcode`);
  }
  openManualUploadView = () => {
    this.props.history.push(`${this.props.match.url}/add`);
  }
  render() {
    return (
      <InventoryComponent
        dataList={dataListData}
        dataHeader={dataListHeader}
        isModalOpened={this.state.isModalOpened}
        openModal={this.openModal}
        closeModal={this.closeModal}
        openBarcodeView={this.openBarcodeView}
        openManualUploadView={this.openManualUploadView}
        {...this.props}
      />
    );
  }
}

export default Inventory;
