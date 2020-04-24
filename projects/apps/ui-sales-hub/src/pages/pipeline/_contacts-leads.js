import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataList, Forms, Icon, Button } from '@sloops/library-ui-components';

// TODO: just mocked data

const dataListHeader = {
  upcomingMeeting: { label: 'Upcoming Meeting', type: DataList.FormattedDateTime },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = (history, match) => ([
  {
    upcomingMeeting: 1506419512153,
    fullName: { label: 'Jon Doe' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test@email.com', email: 'test@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jon-doe/12345/edit`) },
  },
  {
    upcomingMeeting: 1509615600000,
    fullName: { label: 'Jane Doedoedoedoe' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2@email.com', email: 'test@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jane-doedoedoedoe/6789/edit`) },
  },
]);

const dataListManagerHeader = {
  responsible: { label: 'Responsible', type: DataList.Text },
  upcomingMeeting: { label: 'Upcoming Meeting', type: DataList.FormattedDateTime },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListManagerData = (history, match) => ([
  {
    responsible: { label: 'Steve Novak' },
    upcomingMeeting: 1506419512153,
    fullName: { label: 'Jon Doe' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test@email.com', email: 'test@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jon-doe/12345/edit`) },
  },
  {
    responsible: { label: 'Steve Novak' },
    upcomingMeeting: 1509615600000,
    fullName: { label: 'Jane Doedoedoedoe' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2@email.com', email: 'test@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: { label: 'Edit', icon: 'edit', onClick: () => history.push(`${match.url}/jane-doedoedoedoe/6789/edit`) },
  },
]);

const PipelineContactsLeadsComponent = ({
  header, data, history, viewType,
}) => {
  const handleAddNewProspect = () => {
    let url = '/pipeline/contacts/prospects/add';
    if (viewType === 'admin' || viewType === 'manager') {
      url = `/${viewType}/pipeline/contacts/prospects/add`;
    }
    history.push(url);
  };
  return (
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
          viewType !== 'admin' && viewType !== 'manager'
            ? (
              <div className="pages-buttons">
                <Button label="Add New Prospect" onClick={handleAddNewProspect} />
              </div>
            ) : null
        }
      </div>
      <DataList.DataList header={header} data={data} />
    </div>
  );
};

PipelineContactsLeadsComponent.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string.isRequired,
};

// TODO: class just for future data integration...
class PipelineContactsLeads extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    viewType: PropTypes.string.isRequired,
  }
  state = {}
  render() {
    const {
      viewType, match, history, ...props
    } = this.props;
    return (
      <PipelineContactsLeadsComponent
        header={!['admin', 'manager'].includes(viewType) ? dataListHeader : dataListManagerHeader}
        data={!['admin', 'manager'].includes(viewType) ? dataListData(history, match) : dataListManagerData(history, match)}
        viewType={viewType}
        match={match}
        history={history}
        {...props}
      />
    );
  }
}

export default PipelineContactsLeads;
