/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Forms, Button, Icon, Layouts } from '@sloops/library-ui-components';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { setViewType } from '../../store/actions';
import { RetailerAccountsAddLeadsModal } from '../../components/retailer-accounts-add-leads-modal';

// TODO: static data

const openingHours = [
  {
    open: true, day: 'Monday', openingHour: '08:00', closingHour: '20:00',
  },
  {
    open: true, day: 'Tuesday', openingHour: '08:00', closingHour: '20:00',
  },
  {
    open: true, day: 'Wednesday', openingHour: '08:00', closingHour: '20:00',
  },
  {
    open: true, day: 'Thursday', openingHour: '08:00', closingHour: '20:00',
  },
  {
    open: true, day: 'Friday', openingHour: '08:00', closingHour: '20:00',
  },
  {
    open: true, day: 'Saturday', openingHour: '08:00', closingHour: '20:00',
  },
  {
    open: true, day: 'Sunday', openingHour: '08:00', closingHour: '20:00',
  },
];

const hoursValues = Array
  .from({ length: 24 })
  .map((_, ix) => `${ix.toString().padStart(2, '0')}:00`)
  .map(time => ({ label: time, value: time }));

const RetailerAccountAddComponent = ({
  redirectAction,
  history,
  location,
  viewType,
  me,
  setViewTypeDispatch,
  leads,
  addLeads,
  isLeadsModalOpened,
  closeLeadModal,
  openLeadModal,
}) => (
  <Layouts.SalesDashboardLayout
    history={history}
    location={location}
    activeOption="accounts"
    activeSuboption={location.pathname}
    isAdministrator={me.me.isAdministrator}
    isSalesManager={me.me.isSalesManager}
    isSalesRepresentative={me.me.isSalesRepresentative}
    viewType={viewType}
    switchView={setViewTypeDispatch}
  >
    <div className="retailer-accounts pages-form-container">
      <div className="pages-form-container-title">
        Retailer’s details
      </div>
      <div className="pages-form-container-subtitle">
        Owner Details
      </div>
      <div className="pages-form-container-content">
        <Forms.TextFieldInput
          name="first-name"
          label="First Name"
        />
        <Forms.TextFieldInput
          name="last-name"
          type="text"
          label="Last Name"
        />
        <Forms.TextFieldInput
          name="email-address"
          label="Email Address"
        />
        <Forms.TextFieldInput
          name="phone-number"
          label="Phone Number"
        />
        <div>
          <Button label="Add new number" minimal onClick={() => {}} className="user-account-array-field-add-btn" icon={<Icon name="circled-add" />} />
        </div>
      </div>
      <div className="pages-form-container-subtitle">
        Shop Details
      </div>
      <div className="pages-form-container-content clearfix">
        <div className="retailer-accounts-half">
          <div className="retailer-accounts-shop-logo">[logo here]</div>
        </div>
        <div className="retailer-accounts-half retailer-accounts-shop-data">
          <Forms.TextFieldInput
            name="shop-name"
            label="Shop Name"
          />
          <Forms.TextFieldInput
            name="shop-category"
            label="Category"
          />
          {/* <div className="pages-form-container-label">Store Type</div>
           // TODO: we don't need these fields now
          <Forms.CheckboxFields
            buttonized
            options={[{ label: 'Online', value: 'online' }, { label: 'Offline', value: 'offline' }]}
            name="shop-type" className="retailer-accounts-shop-type" onChange={() => {}}
          /> */}
        </div>
      </div>
      <div className="pages-form-container-content clearfix margin-top-30">
        <table className="pages-table">
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <th>Open</th>
              <th>Day</th>
              <th>Opening Hour</th>
              <th>Closing Hour</th>
            </tr>
          </thead>
          <tbody>
            {
              openingHours.map((openingHour, ix) => (
                <tr key={ix}>
                  <td><Forms.ToggleSwitchField small name={`${openingHour}.open`} label="Open" /></td>
                  <td><div className="pages-td-text">{openingHour.day}</div></td>
                  <td><Forms.SelectFieldInput name={`${openingHour}.openingHour`} options={hoursValues} /></td>
                  <td><Forms.SelectFieldInput name={`${openingHour}.closingHour`} options={hoursValues} /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {/* <div className="pages-form-container-content clearfix">
         // TODO: we don't need this field now
          <div className="retailer-accounts-two-thirds">
            <Forms.CheckboxField
              name="same-date"
              value="same-date"
              label="The same data for all fields"
              className="retailer-accounts-checkbox"
              onChange={() => {}}
            />
          </div>
      </div> */}
      <div className="pages-form-container-content clearfix margin-top-30">
        <Forms.TextFieldInput
          name="shop-shipping"
          label="Delivery Settings"
        />
        <Forms.CheckboxField
          name="shop-shipping-international"
          value="shop-shipping-international"
          label="International shipping"
          className="retailer-accounts-checkbox"
          onChange={() => {}}
        />
      </div>
      <div className="pages-form-container-content clearfix margin-top-30">
        <div className="margin-bottom-30">
          <Forms.AddressFieldInput
            name="address"
            apiKey="AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw"
            width={480}
            height={400}
            error=""
          />
        </div>
        <Forms.TextFieldInput
          name="shop-phonenumber"
          label="Phone Number"
        />
        <Forms.LongTextFieldInput
          name="shop-description"
          label="Description"
        />
      </div>
      <div className="pages-form-container-content clearfix margin-top-30">
        <div className="retailer-accounts-products-dropzone">
          Drag and drop images or <span className="highlighted">select them</span> from your computer
        </div>
      </div>
      <div className="pages-form-container-content clearfix margin-top-30">
        <div className="retiler-accounts-product-image">
          <Button danger size="small" className="delete-button" icon={<Icon size={15} name="bin" />} />
          [image here]
        </div>
        <div className="retiler-accounts-product-image">
          <Button danger size="small" className="delete-button" icon={<Icon size={15} name="bin" />} />
          [image here]
        </div>
        <div className="retiler-accounts-product-image">
          <Button danger size="small" className="delete-button" icon={<Icon size={15} name="bin" />} />
          [image here]
        </div>
        <div className="retiler-accounts-product-image">
          <Button danger size="small" className="delete-button" icon={<Icon size={15} name="bin" />} />
          [image here]
        </div>
      </div>
      <div className="retailer-accounts-buttons">
        <Button
          label="Cancel"
          secondary
          className="retailer-accounts-cancel-button"
          icon={<Icon name="circled-x" />}
          onClick={redirectAction}
        />
        <Button
          label="Save"
          className="retailer-accounts-save-button"
          icon={<Icon name="circled-ok" />}
          onClick={openLeadModal}
        />
      </div>
      <RetailerAccountsAddLeadsModal
        isOpen={isLeadsModalOpened}
        onCloseModal={closeLeadModal}
        leads={leads}
        addLeads={addLeads}
        onDone={redirectAction}
      />
    </div>
  </Layouts.SalesDashboardLayout>
);

RetailerAccountAddComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string.isRequired,
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setViewTypeDispatch: PropTypes.func.isRequired,
  redirectAction: PropTypes.func.isRequired,
  leads: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  addLeads: PropTypes.func.isRequired,
  isLeadsModalOpened: PropTypes.bool.isRequired,
  openLeadModal: PropTypes.func.isRequired,
  closeLeadModal: PropTypes.func.isRequired,
};

// TODO: class just for future data integration...
class RetailerAccountAdd extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    viewType: PropTypes.string.isRequired,
  }
  state = {
    isLeadsModalOpened: false,
    leads: [],
  }
  addLeads = leads => this.setState({ leads });
  closeLeadModal = () => {
    this.setState({ isLeadsModalOpened: false });
  }
  openLeadModal = () => {
    this.setState({ isLeadsModalOpened: true });
  }
  redirectAction = () => {
    let url = '/accounts/open';
    if (this.props.viewType === 'admin' || this.props.viewType === 'admin') {
      url = `/${this.props.viewType}${url}`;
    }
    this.props.history.push(url);
  }
  render() {
    return (
      <RetailerAccountAddComponent
        redirectAction={this.redirectAction}
        leads={this.state.leads}
        addLeads={this.addLeads}
        isLeadsModalOpened={this.state.isLeadsModalOpened}
        openLeadModal={this.openLeadModal}
        closeLeadModal={this.closeLeadModal}
        {...this.props}
      />
    );
  }
}

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
)(RetailerAccountAdd);
