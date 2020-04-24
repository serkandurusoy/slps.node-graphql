import React from 'react';
import PropTypes from 'prop-types';
import { Forms, Button } from '@sloops/library-ui-components';

const ContactsLeadsProspectsForm = ({ location, history, viewType }) => {
  const title = () => {
    if (location.pathname.includes('/leads')) return 'Edit existing lead';
    if (location.pathname.includes('/prospects') && location.pathname.includes('/add')) return 'Add new prospect';
    if (location.pathname.includes('/prospects') || location.pathname.includes('/churn')) return 'Edit existing prospect';
    return null;
  };
  const isAdding = () => location.pathname.includes('/add');
  const isEditing = () => location.pathname.includes('/edit');
  const handleCancel = () => {
    history.goBack();
  };
  const handleSave = () => {
    // TODO: add save and edit logic here too
    let url = location.pathname.includes('/leads') ? '/pipeline/contacts/leads' : '/pipeline/contacts/prospects';
    if (viewType === 'admin' || viewType === 'manager') {
      url = location.pathname.includes('/leads') ? `/${viewType}/pipeline/contacts/leads` : `/${viewType}/pipeline/contacts/prospects-inactive`;
    }
    history.push(url);
  };
  const handleEdit = () => handleSave();
  const convertToRetailer = () => {
    let url = '/accounts/add';
    if (viewType === 'admin' || viewType === 'manager') url = `/${viewType}${url}`;
    history.push(url);
  };
  return (
    <div>
      <div className="pages-form-container-title">
        {title()}
      </div>
      {
        isAdding()
          ? (
            <div className="pages-form-container-subtitle with-margin-top">
              Owner details
            </div>
          ) : null
      }
      {
        isEditing() ? (
          <div className="pages-form-container-subtitle with-margin-top">
            <Button label="Convert to Retailer" onClick={convertToRetailer} />
          </div>
        ) : null
      }
      <div className="pages-form-container-content">
        <Forms.TextFieldInput
          name="first-name"
          type="text"
          label="First name"
        />
        <Forms.TextFieldInput
          name="last-name"
          type="text"
          label="Last name"
        />
        <Forms.TextFieldInput
          name="email-address"
          type="text"
          label="Email address"
        />
        <Forms.TextFieldInput
          name="phone-number"
          type="text"
          label="Phone number"
        />
        <div className="pages-form-container-subtitle with-margin-top">
          Shop details
        </div>
        <Forms.TextFieldInput
          name="shop-name"
          type="text"
          label="Shop name"
        />
        <div className="margin-bottom-30">
          <Forms.AddressFieldInput
            name="address"
            apiKey="AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw"
            width={280}
            height={400}
            error=""
          />
        </div>
        <div className="clearfix">
          <Button label="Cancel" onClick={handleCancel} secondary className="float-left" />
          {isAdding() ? <Button label="Save" secondary className="float-right" onClick={handleSave} /> : null}
          {isEditing() ? <Button label="Edit" secondary className="float-right" onClick={handleEdit} /> : null}
        </div>
      </div>
    </div>
  );
};

ContactsLeadsProspectsForm.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string.isRequired,
};

export default ContactsLeadsProspectsForm;
