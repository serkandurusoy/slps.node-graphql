import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InfoListItem } from '@sloops/library-ui-components';
import { formatDate, formatTime } from '@sloops/library-utils';

const COLORS = {
  gray: '#657d95',
  white: '#ffffff',
  submarine: '#b9c3c8',
  downriver: '#0e345e',
};

const commonWrapperInsideStyles = `
  vertical-align: top;
  margin-top: 10px;
  display: inline-block;
  @media (min-width: 768px) {
    margin-top: 25px;
  }
  @media (min-width: 1024px) {
    margin-top: 35px;
  }
`;

const WrapperInsideDateStyled = styled.div`
  ${commonWrapperInsideStyles}
  @media (min-width: 768px) {
    margin-left: 15px;
    padding: 0 5px;
  }
  @media (min-width: 1024px) {
    margin-left: 31px;
    min-width: 245px;
  }
`;

const WrapperInsideLeadStyled = styled.div`
  ${commonWrapperInsideStyles}
  margin-left: 10px;
  @media (min-width: 768px) {
    margin-left: 24px;
  }
  @media (min-width: 1024px) {
    margin-left: 44px;
    min-width: 69px;
  }
`;

const WrapperInsideLocationStyled = styled.div`
  ${commonWrapperInsideStyles}
  margin-left: 40%;
  padding: 0 5px;
`;

const MeetingLabelStyled = styled.div`
  font-size: 8px;
  color: ${COLORS.submarine};
  @media (min-width: 1024px) {
    font-size: 10px;
  }
  @media (min-width: 1024px) {
    min-width: 69px;
    font-size: 12px;
  }
`;

const MeetingDateStyled = styled.div`
  font-size: 10px;
  color: ${COLORS.downriver};
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const MeetingNameStyled = styled.div`
  font-size: 10px;
  color: ${COLORS.gray};
  max-width: 100px;
  @media (min-width: 768px) {
    font-size: 13px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
    max-width: 130px;
    margin-top: 6px;
  }
`;

const MeetingAddressStyled = styled.div`
  font-size: 10px;
  color: ${COLORS.white};
  @media (min-width: 768px) {
    font-size: 15px;
  }
  @media (min-width: 1024px) {
    font-size: 16px;
  }
  @media (min-width: 1224px) {
    font-size: 18px;
  }
`;

const UserLinkStyled = styled.div`
  font-size: 80%;
  display: block;
  margin-top: 5px;
`;

const MeetingsListItemWhiteSection = ({
  dateString,
  timeString,
  timestamp,
  userName,
  userLink,
  locale,
}) => (
  <div>
    <WrapperInsideDateStyled>
      <MeetingLabelStyled>
        Meeting date
      </MeetingLabelStyled>
      <MeetingDateStyled>
        {timestamp && !dateString && !timeString
          ? <span>{formatDate(timestamp, locale)} - {formatTime(timestamp, locale)}</span> : null}
        {dateString && timeString ? <span>{dateString} - {timeString}</span> : null}
      </MeetingDateStyled>
    </WrapperInsideDateStyled>
    <WrapperInsideLeadStyled>
      <MeetingLabelStyled>
        Lead
      </MeetingLabelStyled>
      <MeetingNameStyled>
        {userName}
        {userLink ? <UserLinkStyled><Link to={userLink}>See more</Link></UserLinkStyled> : null}
      </MeetingNameStyled>
    </WrapperInsideLeadStyled>
  </div>
);

MeetingsListItemWhiteSection.propTypes = {
  dateString: PropTypes.string,
  timeString: PropTypes.string,
  timestamp: PropTypes.number,
  userName: PropTypes.string,
  location: PropTypes.string,
  locale: PropTypes.string,
  userLink: PropTypes.string,
};

MeetingsListItemWhiteSection.defaultProps = {
  dateString: '',
  timeString: '',
  timestamp: 0,
  userName: '',
  location: '',
  locale: '',
  userLink: '',
};

const MeetingsListItemBlueSection = ({ location, city, ...props }) => (
  <WrapperInsideLocationStyled {...props}>
    <MeetingLabelStyled>
      Location
    </MeetingLabelStyled>
    <MeetingAddressStyled>
      {location},
    </MeetingAddressStyled>
    <MeetingAddressStyled>
      {city}
    </MeetingAddressStyled>
  </WrapperInsideLocationStyled>
);

MeetingsListItemBlueSection.propTypes = {
  location: PropTypes.string,
  city: PropTypes.string,
};

MeetingsListItemBlueSection.defaultProps = {
  location: '',
  city: '',
};

const PipelineMeetingItem = ({
  timestamp,
  locale,
  date,
  time,
  userName,
  userLink,
  location,
  city,
}) => (
  <InfoListItem
    whiteSection={<MeetingsListItemWhiteSection
      timestamp={timestamp}
      locale={locale}
      date={date}
      time={time}
      userName={userName}
      userLink={userLink}
    />}
    blueSection={<MeetingsListItemBlueSection
      location={location}
      city={city}
    />}
  />
);

PipelineMeetingItem.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  timestamp: PropTypes.number,
  userName: PropTypes.string,
  location: PropTypes.string,
  locale: PropTypes.string,
  city: PropTypes.string,
  userLink: PropTypes.string,
};

PipelineMeetingItem.defaultProps = {
  date: '',
  time: '',
  timestamp: 0,
  userName: '',
  location: '',
  locale: '',
  city: '',
  userLink: '',
};

export default PipelineMeetingItem;
