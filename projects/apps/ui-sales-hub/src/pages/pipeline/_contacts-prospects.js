import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataList, Forms, Icon, Button } from '@sloops/library-ui-components';
import { ProspectsAssignModal } from '../../components/prospects-assign-modal';

// TODO: just mocked data

const dataListHeader = {
  timeToClose: { label: 'Time to close', type: DataList.Text },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = (history, match) => ([
  {
    timeToClose: { label: '< 1 day', className: 'pages-list-label-warning' },
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test21321@email.com', email: 'test12312@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jon-doe-22/12345/edit`) },
  },
  {
    timeToClose: { label: '< 5 hours', className: 'pages-list-label-danger' },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jane-doedoedoedoe-222/45678/edit`) },
  },
  {
    timeToClose: { label: '< 2 days' },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jane-doedoedoedoe-222/45678/edit`) },
  },
]);

const dataListHeaderInactive = {
  responsible: { label: 'Responsible', type: DataList.Button },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListDataInactive = (c, history, match) => ([
  {
    responsible: { label: 'Assign', onClick: () => { c.setState({ isAssignModalOpened: true }); } },
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test21321@email.com', email: 'test12312@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jon-doe-22/12345/edit`) },
  },
  {
    responsible: { label: 'Assign', onClick: () => { c.setState({ isAssignModalOpened: true }); } },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jane-doedoedoedoe-222/45678/edit`) },
  },
]);

const dataListHeaderActive = {
  responsible: { label: 'Responsible', type: DataList.Text },
  ...dataListHeader,
};
const dataListDataActive = (history, match) => ([
  {
    responsible: { label: 'Steve Novak' },
    timeToClose: { label: '< 1 hour', className: 'pages-list-label-danger' },
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test21321@email.com', email: 'test12312@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/steve-novak/123456/edit`) },
  },
  {
    responsible: { label: 'Steve Novak' },
    timeToClose: { label: '< 5 hours', className: 'pages-list-label-warning' },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/steve-novak/45678/edit`) },
  },
  {
    responsible: { label: 'Steve Novak 2' },
    timeToClose: { label: '< 2 days' },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/steve-novak/45678/edit`) },
  },
]);

const PipelineContactsProspectsComponent = ({
  header,
  data,
  isAddButton,
  handleAddNewProspect,
  isAssignModalOpened,
  closeAssignModal,
}) => (
  <div>
    <div className="pages-search-tools">
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
      {
        isAddButton
          ? (
            <div className="pages-buttons">
              <Button label="Add New Prospect" onClick={handleAddNewProspect} />
            </div>
          ) : null
      }
    </div>
    <DataList.DataList header={header} data={data} />
    <ProspectsAssignModal isOpen={isAssignModalOpened} onCloseModal={closeAssignModal} />
  </div>
);

PipelineContactsProspectsComponent.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isAddButton: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleAddNewProspect: PropTypes.func.isRequired,
  isAssignModalOpened: PropTypes.bool.isRequired,
  closeAssignModal: PropTypes.func.isRequired,
};

// TODO: class just for future data integration...
class PipelineContactsProspects extends Component {
  state = {
    isAssignModalOpened: false,
  }
  handleAddNewProspect = () => {
    this.props.history.push(`${this.props.match.url}/add`);
  };
  isProspectsInactive = () => this.props.match.url.includes('/prospects-inactive');
  isProspectsActive = () => this.props.match.url.includes('/prospects-active');
  dataListHeader = () => {
    if (this.isProspectsInactive()) return dataListHeaderInactive;
    if (this.isProspectsActive()) return dataListHeaderActive;
    return dataListHeader;
  }
  dataListData = () => {
    if (this.isProspectsInactive()) {
      return dataListDataInactive(this, this.props.history, this.props.match);
    }
    if (this.isProspectsActive()) return dataListDataActive(this.props.history, this.props.match);
    return dataListData(this.props.history, this.props.match);
  }
  closeAssignModal = () => {
    this.setState({ isAssignModalOpened: false });
  }
  render() {
    return (
      <PipelineContactsProspectsComponent
        header={this.dataListHeader()}
        data={this.dataListData()}
        isAddButton={!this.isProspectsInactive() && !this.isProspectsActive()}
        handleAddNewProspect={this.handleAddNewProspect}
        isAssignModalOpened={this.state.isAssignModalOpened}
        closeAssignModal={this.closeAssignModal}
        {...this.props}
      />
    );
  }
}

PipelineContactsProspects.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default PipelineContactsProspects;
