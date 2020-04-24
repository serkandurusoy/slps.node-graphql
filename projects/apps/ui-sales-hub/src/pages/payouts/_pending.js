import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataList, Forms, Icon, Button } from '@sloops/library-ui-components';

// TODO: just mocked data

const dataListHeader = {
  checkbox: { label: '', type: DataList.Checkbox },
  fullName: { label: 'Full Name', type: DataList.Text },
  role: { label: 'Role', type: DataList.Text },
  direct: { label: 'Direct', type: DataList.Text },
  referrals: { label: 'Referrals', type: DataList.Text },
  status: { label: 'Paid', type: DataList.Text },
  profile: { label: '\u00a0', type: DataList.Button, width: 40 },
};
const dataListData = [
  {
    checkbox: { checked: false, onChange: () => {} },
    fullName: { label: 'Jon Doe' },
    role: { label: 'Sales Manager' },
    direct: { label: '3000$' },
    referrals: { label: '1000$' },
    status: { label: 'No', type: 'waiting' },
    profile: { label: 'Profile', onClick() {} },
  },
  {
    checkbox: { checked: false, onChange: () => {} },
    fullName: { label: 'Jon Doe' },
    role: { label: 'Sales Manager' },
    direct: { label: '3000$' },
    referrals: { label: '1000$' },
    status: { label: 'No', type: 'waiting' },
    profile: { label: 'Profile', onClick() {} },
  },
];

const PayoutsPendingComponent = ({
  header,
  data,
}) => (
  <div>
    <div className="pages-search-tools">
      <div className="pages-search-field-wrapper small margin-right-20">
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
          placeHolder="Search (Full name)"
        />
      </div>
      <div className="pages-search-field-wrapper small selector">
        <Forms.SelectFieldInput
          placeholder="Payout Period"
          options={[{ label: 'January 2017', value: 'january_2017' }]}
        />
      </div>
      <div className="pages-buttons">
        <Button label="Confirm" />
      </div>
    </div>
    <DataList.DataList header={header} data={data} />
  </div>
);

PayoutsPendingComponent.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

// TODO: class just for future data integration...
class PayoutsPending extends Component {
  state = {}
  render() {
    return (
      <PayoutsPendingComponent
        header={dataListHeader}
        data={dataListData}
      />
    );
  }
}

export default PayoutsPending;
