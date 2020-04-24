import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { DataList, Layouts, TabNav, Button, Forms, Icon } from '@sloops/library-ui-components';
import { setViewType } from '../../store/actions';

// TODO: just mocked data

const dataListHeader = checkedState => ({
  ...(checkedState ? {
    checkbox: { label: '', type: DataList.Checkbox },
  } : {}),
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
  firstButton: { label: '\u00a0', type: DataList.Button, width: 40 },
});
const dataListData = (checkedState, toggleItemCheck, checkedItemsIds) => ([
  {
    ...(checkedState ? {
      checkbox: { checked: (checkedItemsIds.includes(1)), onChange: () => toggleItemCheck(1) },
    } : {}),
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test21321@email.com', email: 'test12312@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: {
      label: 'Delete', icon: 'bin', danger: true, onClick() {},
    },
  },
  {
    ...(checkedState ? {
      checkbox: { checked: (checkedItemsIds.includes(2)), onChange: () => toggleItemCheck(2) },
    } : {}),
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
    firstButton: {
      label: 'Delete', icon: 'bin', danger: true, onClick() {},
    },
  },
]);

const dataListHeaderDelegated = {
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  status: { label: 'Status', type: DataList.Text },
};
const dataListDataDelegated = [
  {
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    status: { label: 'Closed', type: 'closed' },
  },
  {
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    status: { label: 'Waiting for inventory', type: 'waiting' },
  },
];

const dataListManagerHeader = {
  responsible: { label: 'Responsible', type: DataList.Text },
  fullName: { label: 'Full Name', type: DataList.Text },
  address: { label: 'Address', type: DataList.Text },
  email: { label: 'Email', type: DataList.Email },
  phoneNumber: { label: 'Phone Number', type: DataList.PhoneNumber },
};
const dataListManagerData = [
  {
    responsible: { label: 'Steve Novak' },
    fullName: { label: 'Jon Doe 22' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
  },
  {
    responsible: { label: 'Steve Novak' },
    fullName: { label: 'Jane Doedoedoedoe 222' },
    address: { label: 'High Street 1, EV123, London' },
    email: { label: 'test2232@email.com', email: 'test222@email.com' },
    phoneNumber: '333 785 4459',
  },
];

const delegatedSelectOptions = [
  { value: 'all', label: 'All delegated' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
];

const ReferralsComponent = ({
  history,
  location,
  match,
  dataList,
  dataHeader,
  me,
  viewType,
  setViewTypeDispatch, // eslint-disable-line no-shadow
  convertToProspects,
  cancelConvertToProspects,
  convertToProspectsState,
  isNotRep,
  delegate,
  cancelDelegate,
  delegateState,
  confirm,
  checkedItems,
}) => {
  const submenuItems = [
    {
      label: 'Referrals',
      onClick: () => history.push(match.url),
      active: location.pathname === match.url,
    },
    ...(!['admin', 'manager'].includes(viewType) ? [
      {
        label: 'Delegated',
        onClick: () => history.push(`${match.url}/delegated`),
        active: location.pathname === `${match.url}/delegated`,
      },
    ] : []),
  ];
  return (
    <Layouts.SalesDashboardLayout
      history={history}
      location={location}
      activeOption="referrals"
      activeSuboption={location.pathname}
      isAdministrator={me.me.isAdministrator}
      isSalesManager={me.me.isSalesManager}
      isSalesRepresentative={me.me.isSalesRepresentative}
      viewType={viewType}
      switchView={setViewTypeDispatch}
    >
      <div>
        <TabNav items={submenuItems} />
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
            !isNotRep
              ? (
                <div className="clearfix">
                  {
                    location.pathname !== match.url
                      ? (
                        <div className="pages-select-wrapper">
                          <Forms.SelectFieldInput
                            name="pages-leads-search"
                            placeholder="Search (Name, email, phone number)"
                            options={delegatedSelectOptions}
                            style={{ width: '200px' }}
                          />
                        </div>
                      ) : null
                  }
                  {
                    location.pathname === match.url ? (
                      <div className="pages-buttons">
                        <div>
                          {!delegateState ?
                            convertToProspectsState ? <Button label="Cancel Conversion" onClick={cancelConvertToProspects} /> : <Button label="Convert to prospects" onClick={convertToProspects} /> : null}
                          {!convertToProspectsState ?
                            delegateState ? <Button label="Cancel Delegation" onClick={cancelDelegate} /> : <Button label="Delegate" onClick={delegate} /> : null}
                        </div>
                      </div>
                    ) : (
                      <div className="pages-info-block">
                        <div>Total payout from delegated referrals: 500$</div>
                        <div>Payout from delegated referrals in [Current Month]: 100$</div>
                      </div>
                    )
                  }
                </div>
              ) : null
          }
          {!isNotRep && (convertToProspectsState || delegateState) && checkedItems
            ? <div className="clearfix"><Button label="Confirm" onClick={confirm} /></div> : null}
        </div>
        <div>
          <DataList.DataList header={dataHeader} data={dataList} />
        </div>
      </div>
    </Layouts.SalesDashboardLayout>
  );
};

ReferralsComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataList: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  dataHeader: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
  convertToProspects: PropTypes.func.isRequired,
  cancelConvertToProspects: PropTypes.func.isRequired,
  convertToProspectsState: PropTypes.bool.isRequired,
  delegate: PropTypes.func.isRequired,
  cancelDelegate: PropTypes.func.isRequired,
  delegateState: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  isNotRep: PropTypes.bool.isRequired,
  checkedItems: PropTypes.bool.isRequired,
};

ReferralsComponent.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

// TODO: class just for future data integration...
class Referrals extends Component {
  state = {
    convertToProspectsState: false,
    delegateState: false,
    checkedItemsIds: this.initialCheckedItems,
  }
  initialCheckedItems = [1, 2] // TODO: just mocked data for now ofc
  convertToProspects = () => {
    this.setState({
      convertToProspectsState: true,
      checkedItemsIds: this.initialCheckedItems,
    });
  }
  cancelConvertToProspects = () => {
    this.setState({
      convertToProspectsState: false,
    });
  }
  delegate = () => {
    this.setState({
      delegateState: true,
      checkedItemsIds: this.initialCheckedItems,
    });
  }
  cancelDelegate = () => {
    this.setState({
      delegateState: false,
    });
  }
  confirm = () => { // TODO: implement confirm action
    this.setState({
      delegateState: false,
      convertToProspectsState: false,
    });
  }
  toggleItemCheck = (id) => {
    let newState = [...this.state.checkedItemsIds];
    if (newState.includes(id)) {
      newState = newState.filter(i => i !== id);
    } else {
      newState.push(id);
    }
    this.setState({
      checkedItemsIds: newState,
    });
  }
  isNotRep = () => ['admin', 'manager'].includes(this.props.viewType)
  dataList = () => {
    if (this.isNotRep()) return dataListManagerData;
    return this.props.location.pathname.includes('/referrals') ? dataListData(this.state.convertToProspectsState || this.state.delegateState, this.toggleItemCheck, this.state.checkedItemsIds) : dataListDataDelegated;
  };
  dataHeader = () => {
    if (this.isNotRep()) return dataListManagerHeader;
    return this.props.location.pathname.includes('/referrals') ? dataListHeader(this.state.convertToProspectsState || this.state.delegateState) : dataListHeaderDelegated;
  };
  render() {
    return (
      <ReferralsComponent
        dataList={this.dataList()}
        dataHeader={this.dataHeader()}
        convertToProspects={this.convertToProspects}
        cancelConvertToProspects={this.cancelConvertToProspects}
        convertToProspectsState={this.state.convertToProspectsState}
        confirmModalOpened={this.state.confirmModalOpened}
        delegate={this.delegate}
        cancelDelegate={this.cancelDelegate}
        delegateState={this.state.delegateState}
        confirm={this.confirm}
        isNotRep={this.isNotRep()}
        checkedItems={!!(this.state.checkedItemsIds && this.state.checkedItemsIds.length)}
        {...this.props}
      />
    );
  }
}

Referrals.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string.isRequired,
};

export default compose(
  connect(
    ({
      ui: {
        account: {
          id,
        },
        viewType,
      },
    }) => ({
      userId: id,
      viewType,
    }),
    {
      setViewTypeDispatch: setViewType,
    },
  ),
  accountsApi.query.me,
)(Referrals);
