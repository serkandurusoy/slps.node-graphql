import React from 'react';
import PropTypes from 'prop-types';
import { TabNav, Button } from '@sloops/library-ui-components';
import { PipelineMeetingItem } from '../../components/pipeline-meeting-item';

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

const DashboardRepresentative = ({ handleSeeMoreRedirect }) => {
  const submenuItems = [
    {
      label: 'Upcoming Meetings',
      onClick: () => {},
      active: true,
    },
  ];
  return (
    <div className="dashboard-page dashboard-page-admin-manager">
      <div className="dashboard-page-content">
        <div className="dashboard-page-nav">
          <div className="dashboard-page-tabnav">
            <TabNav items={submenuItems} />
          </div>
          <div className="dashboard-page-user">
            <span className="user-name">
              John Doe <span>(0948123)</span>
            </span>
          </div>
        </div>
        <div className="dashboard-page-meetings">
          {upcomingMeetingsData.map(meeting => (
            <PipelineMeetingItem key={meeting.id} {...meeting} />
          ))}
        </div>
      </div>
      <div className="dashboard-page-sidebar">
        <div className="dashboard-info-badge">
          <div className="dashboard-badge-amount">
            212.398 €
          </div>
          <div className="dashboard-badge-label">
            Total available payout
          </div>
        </div>
        <div className="statistics-item">
          <div className="statistics-item-title">
            Your earnings total June
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Direct
            </div>
            <div className="statistics-item-content-number">
              2.000 $
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Referral
            </div>
            <div className="statistics-item-content-number">
              500 $
            </div>
          </div>
          <div className="statistics-item-element">
            <div className="statistics-item-content-label">
              Last month tota
            </div>
            <div className="statistics-item-content-number highlighted">
              2.500 $
            </div>
          </div>
          <div className="statistics-item-element">
            <Button label="See more" onClick={handleSeeMoreRedirect} />
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardRepresentative.propTypes = {
  handleSeeMoreRedirect: PropTypes.func.isRequired,
};

export default DashboardRepresentative;
