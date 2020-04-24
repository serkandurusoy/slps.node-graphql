import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataList, Forms, Icon, Button } from '@sloops/library-ui-components';
import { ProspectsAssignModal } from '../../components/prospects-assign-modal';

// TODO: just mocked data

const dataListHeader = {
  responsible: { label: 'Responsible', type: DataList.Button },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = (c, history, match) => ([
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
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jon-doedoedoedoe-222/6789/edit`) },
  },
]);

const PipelineContactsChurnComponent = ({
  header,
  data,
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
      <div className="pages-info-block">
        <div>Contacts below declared that they are not interested to join</div>
      </div>
    </div>
    <DataList.DataList header={header} data={data} />
    <ProspectsAssignModal isOpen={isAssignModalOpened} onCloseModal={closeAssignModal} />
  </div>
);

PipelineContactsChurnComponent.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isAssignModalOpened: PropTypes.bool.isRequired,
  closeAssignModal: PropTypes.func.isRequired,
};

// TODO: class just for future data integration...
class PipelineContactsChurn extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }
  state = {
    isAssignModalOpened: false,
  }
  closeAssignModal = () => {
    this.setState({ isAssignModalOpened: false });
  }
  render() {
    return (
      <PipelineContactsChurnComponent
        header={dataListHeader}
        data={dataListData(this, this.props.history, this.props.match)}
        isAssignModalOpened={this.state.isAssignModalOpened}
        closeAssignModal={this.closeAssignModal}
        {...this.props}
      />
    );
  }
}

export default PipelineContactsChurn;
