import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Forms } from '@sloops/library-ui-components';
import { PipelineMeetingItem } from '../../components/pipeline-meeting-item';
import { ScheduleMeetingModal } from '../../components/schedule-meeting-modal';
import { NoSaleModal } from '../../components/no-sale-modal';

const upcomingMeetingsData = [
  {
    id: 1,
    timestamp: 1510753800000,
    userName: 'Jon Doe',
    location: 'Oxford Street 100',
    city: 'London',
  },
  {
    id: 2,
    timestamp: 1510833000000,
    userName: 'Jon Doe',
    location: 'Oxford Street 100',
    city: 'London',
  },
];

const PipelineContactsLeadsEditComponent = ({
  closeModal,
  openModal,
  isModalOpen,
  viewType,
}) => (
  <div>
    <div>
      <Button label="No sale" secondary onClick={() => openModal('no-sale')} />
    </div>
    <div>
      <Forms.LongTextFieldInput label="Notes" name="notes" />
    </div>
    {
      viewType !== 'admin' && viewType !== 'manager'
        ? (
          <div className="clearfix margin-top-30">
            <div className="float-left pages-title">
              Upcoming meetings
            </div>
            <div className="float-right">
              <Button label="Schedule a meeting" onClick={() => openModal('schedule-meeting')} />
            </div>
          </div>
        ) : null
    }
    {
      viewType !== 'admin' && viewType !== 'manager'
        ? (
          <div className="margin-top-30">
            {upcomingMeetingsData.map(meeting => (
              <PipelineMeetingItem key={meeting.id} {...meeting} />
            ))}
          </div>
        ) : null
    }
    {
      viewType !== 'admin' && viewType !== 'manager'
        ? <ScheduleMeetingModal isOpen={isModalOpen === 'schedule-meeting'} onCloseModal={closeModal} />
        : null
    }
    <NoSaleModal isOpen={isModalOpen === 'no-sale'} onCloseModal={closeModal} />
  </div>
);

PipelineContactsLeadsEditComponent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.string.isRequired,
  viewType: PropTypes.string.isRequired,
};

// TODO: class just for future data integration...
class PipelineContactsLeadsEdit extends Component {
  state = {
    isModalOpen: '',
  }
  closeModal = () => {
    this.setState({
      isModalOpen: '',
    });
  }
  openModal = (type) => {
    this.setState({
      isModalOpen: type,
    });
  }
  render() {
    return (
      <PipelineContactsLeadsEditComponent
        isModalOpen={this.state.isModalOpen}
        closeModal={this.closeModal}
        openModal={this.openModal}
        {...this.props}
      />
    );
  }
}

export default PipelineContactsLeadsEdit;
