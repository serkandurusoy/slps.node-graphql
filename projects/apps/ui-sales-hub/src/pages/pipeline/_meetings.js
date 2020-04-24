import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabNav, Button } from '@sloops/library-ui-components';
import { PipelineMeetingItem } from '../../components/pipeline-meeting-item';
import { ScheduleMeetingModal } from '../../components/schedule-meeting-modal';

// TODO: just mocked data

const pastMeetingsData = [
  {
    id: 1,
    timestamp: 1502441400000,
    userName: 'Jon Doe',
    userLink: '/pipeline/contacts/leads/jon-doe/12345/edit',
    location: 'Oxford Street 100',
    city: 'London',
  },
  {
    id: 2,
    timestamp: 1502801400000,
    userName: 'Jon Doe',
    userLink: '/pipeline/contacts/leads/jon-doe/12345/edit',
    location: 'Oxford Street 100',
    city: 'London',
  },
];

const upcomingMeetingsData = [
  {
    id: 1,
    timestamp: 1510753800000,
    userName: 'Jon Doe',
    userLink: '/pipeline/contacts/leads/jon-doe/12345/edit',
    location: 'Oxford Street 100',
    city: 'London',
  },
  {
    id: 2,
    timestamp: 1510833000000,
    userName: 'Jon Doe',
    userLink: '/pipeline/contacts/leads/jon-doe/12345/edit',
    location: 'Oxford Street 100',
    city: 'London',
  },
];

const PipelineMeetingsComponent = ({
  pastMeetings,
  meetings,
  match,
  history,
  closeMeetingModal,
  openMeetingModal,
  isMeetingModalOpen,
}) => {
  const submenuItems = [
    {
      label: 'Upcoming meetings',
      onClick: () => history.push(`${match.url}/meetings`),
      active: !pastMeetings,
    },
    {
      label: 'Past meetings',
      onClick: () => history.push(`${match.url}/past`),
      active: pastMeetings,
    },
  ];
  return (
    <div>
      <TabNav items={submenuItems} />
      <div className="pages-search-tools">
        <div className="pages-buttons">
          <Button label="Schedule a meeting" onClick={openMeetingModal} />
        </div>
      </div>
      <div>
        {meetings.map(meeting => (
          <PipelineMeetingItem key={meeting.id} {...meeting} />
        ))}
      </div>
      <ScheduleMeetingModal isOpen={isMeetingModalOpen} onCloseModal={closeMeetingModal} />
    </div>
  );
};

PipelineMeetingsComponent.propTypes = {
  pastMeetings: PropTypes.bool.isRequired,
  meetings: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  closeMeetingModal: PropTypes.func.isRequired,
  openMeetingModal: PropTypes.func.isRequired,
  isMeetingModalOpen: PropTypes.bool.isRequired,
};

// TODO: class just for future data integration...
class PipelineMeetings extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }
  state = {
    isMeetingModalOpen: false,
  }
  closeMeetingModal = () => {
    this.setState({
      isMeetingModalOpen: false,
    });
  }
  openMeetingModal = () => {
    this.setState({
      isMeetingModalOpen: true,
    });
  }
  render() {
    return (
      <PipelineMeetingsComponent
        pastMeetings={this.props.location.pathname.includes('/pipeline/meetings/past')}
        meetings={this.props.location.pathname.includes('/pipeline/meetings/past') ? pastMeetingsData : upcomingMeetingsData}
        location={this.props.location}
        history={this.props.history}
        match={this.props.match}
        openMeetingModal={this.openMeetingModal}
        closeMeetingModal={this.closeMeetingModal}
        isMeetingModalOpen={this.state.isMeetingModalOpen}
      />
    );
  }
}

export default PipelineMeetings;
