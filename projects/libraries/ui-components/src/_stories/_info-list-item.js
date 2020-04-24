import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, date } from '@storybook/addon-knobs';
import { formatDate, formatTime } from '@sloops/library-utils';
import InfoListItem from '../InfoListItem';

const stories = storiesOf('InfoListItem component', module);

// demo content for list component - example - meetings list
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
    margin-top: 20px;
  }
  @media (min-width: 1024px) {
    margin-top: 28px;
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
  margin-left: 40px;
  padding: 0 5px;
  @media (min-width: 768px) {
    margin-left: 47px;
  }
  @media (min-width: 1024px) {
    margin-left: 147px;
    min-width: 150px;
  }
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
    font-size: 18px;
  }
`;

const MeetingsListItemWhiteSection = ({
  dateString, timeString, timestamp, userName, locale,
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
};

MeetingsListItemWhiteSection.defaultProps = {
  dateString: '',
  timeString: '',
  timestamp: 0,
  userName: '',
  location: '',
  locale: '',
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

stories.add('InfoListItem component playground', withInfo('demonstrates InfoListItem and properties')(() => (<InfoListItem
  whiteSection={<MeetingsListItemWhiteSection
    timestamp={date('Timestamp', new Date('12 May 2017'))}
    locale={text('Locale', '')}
    date={text('Date (as is)', '')}
    time={text('Time (as is)', '')}
    userName={text('User Name', 'John Doe')}
  />}
  blueSection={<MeetingsListItemBlueSection
    location={text('Location', 'Oxford Street 100')}
    city={text('City', 'London')}
  />}
/>)));
