/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Forms, Modal, Button } from '@sloops/library-ui-components';

class RetailerAccountAddLeadsModal extends Component {
  state = {
    leads: this.props.leads.length ? this.props.leads : [
      {
        shopName: '',
        firstName: '',
        lastName: '',
        address: {},
        email: '',
        phoneNumber: '',
      },
    ],
    activeLead: 0,
  }
  setFieldsValue = (field, index, value) => {
    const newState = [...this.state.leads];
    newState[index][field] = value;
    this.setState({ leads: newState });
  }
  setLead = activeLead => this.setState({ activeLead })
  addMoreLeads = () => {
    const newState = [...this.state.leads];
    const nextIndex = newState.length;
    newState.push({
      shopName: '',
      firstName: '',
      lastName: '',
      address: {},
      email: '',
      phoneNumber: '',
    });
    this.setState({ leads: newState, activeLead: nextIndex });
  }
  addLeadsAndClose = () => {
    this.props.addLeads(this.state.leads);
    this.props.onCloseModal();
    this.props.onDone();
  }
  render() {
    const { isOpen, onCloseModal } = this.props;
    return (
      <Modal
        maxWidth="520px"
        isOpen={isOpen}
        title={`Referrals / Lead ${this.state.activeLead + 1}`}
        onCloseModal={onCloseModal}
      >
        <div style={{ width: 380 }}>
          <div className="pages-circled-pagination">
            <ul className="pages-circled-pagination-list">
              {this.state.leads.map((lead, leadsIndex) => (
                <li key={leadsIndex} onClick={() => this.setLead(leadsIndex)} className={this.state.activeLead === leadsIndex ? 'active' : ''}>{leadsIndex + 1}</li>
              ))}
            </ul>
          </div>
          <div>
            {this.state.leads.map((lead, leadsIndex) => (
              <div key={leadsIndex} style={{ display: this.state.activeLead === leadsIndex ? 'block' : 'none' }}>
                <Forms.TextFieldInput name="shop-name" type="text" label="Shop Name" value={lead.shopName} onChange={v => this.setFieldsValue('shopName', leadsIndex, v)} />
                <Forms.TextFieldInput name="first-name" type="text" label="First Name" value={lead.firstName} onChange={v => this.setFieldsValue('firstName', leadsIndex, v)} />
                <Forms.TextFieldInput name="last-name" type="text" label="Last Name" value={lead.lastName} onChange={v => this.setFieldsValue('lastName', leadsIndex, v)} />
                <div className="margin-bottom-30">
                  <Forms.AddressFieldInput
                    name="address"
                    label="Address"
                    error=""
                    apiKey="AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw"
                    width={380}
                    height={300}
                    value={lead.address}
                  />
                </div>
                <Forms.TextFieldInput name="email" type="text" label="Email" value={lead.email} onChange={v => this.setFieldsValue('email', leadsIndex, v)} />
                <Forms.TextFieldInput name="phone-number" type="text" label="Phone Number" value={lead.phoneNumber} onChange={v => this.setFieldsValue('phoneNumber', leadsIndex, v)} />
              </div>
            ))}
            <div className="clearfix">
              <Button label="Add More" secondary className="float-left" onClick={this.addMoreLeads} />
              <Button label="Done" className="float-right" onClick={this.addLeadsAndClose} />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

RetailerAccountAddLeadsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  addLeads: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  leads: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default RetailerAccountAddLeadsModal;
