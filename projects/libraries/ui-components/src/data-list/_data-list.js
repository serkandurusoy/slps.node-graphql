/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { formatDate, formatTime } from '@sloops/library-utils';
import ComponentButton from '../button';
import { ToggleSwitchField } from '../forms/_toggle-switch-field';
import { CheckboxField } from '../forms/_checkbox-field';
import Icon from '../icon';

// TODO: needs some more improvements:
// - split parts into separate files
// - create simpler and cleaner api
// - RWD

const COLORS = {
  white: '#ffffff',
  silver: '#aaaaaa',
  darkSilver: '#cccccc',
  green: '#4acba4',
  red: 'red',
  orange: 'orange',
  downriver: '#0e345e',
  yellowGreen: '#b8e986',
  rawUmber: '#7d5513',
  lynch: '#657d95',
  alabaster: '#f7f7f7',
  clearDay: '#f4fffc',
  athensGray: '#EAEDF1',
};

const TableStyled = styled.table`
  border: 0;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: separate;
  width: 100%;
`;

const HeaderStyled = styled.tr`
  font-weight: bold;
  border: 0;
`;

const HeaderThStyled = styled.th`
  font-family: 'Montserrat';
  font-size: 16px;
  text-align: left;
  color: ${COLORS.downriver};
  vertical-align: middle;
  background-color: transparent;
  font-weight: 500;
  border: 0;
  padding: 20px 10px;
  ${({ value }) => {
    if (value.type && value.type.name === 'Checkbox') return 'width: 30px;';
    if (value.width) return `width: ${value.width}px;`;
    return '';
  }}
  &:first-child {
    padding-left: 50px;
  }
  &:last-child {
    padding-right: 50px;
  }
  `;

const ListItemStyled = styled.tr`
  ${({ data }) => (data.checkbox && data.checkbox.checked ? `
    background-color: ${COLORS.clearDay};
  ` : `
    background-color: ${COLORS.white};
  `)}
  border: 0;
  box-shadow: inset 0 10px 20px 0 rgba(18, 43, 35, 0.05);
  border-radius: 25px;
  position: relative;
  vertical-align: middle;
  &:first-child {
    box-shadow: none;
  }
  &:last-child {
    box-shadow: inset 0 10px 20px 0 rgba(18, 43, 35, 0.05), 0 10px 20px 0 rgba(18, 43, 35, 0.05);
  }
  `;

const ListItemTdStyled = styled.td`
  &:first-child {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    padding-left: 50px;
  }
  &:last-child {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    padding-right: 50px;
  }
  ${({ data }) => (data.checkbox && data.checkbox.checked ? `
    border-top: solid 2px ${COLORS.green};
    border-bottom: solid 2px ${COLORS.green};
    &:first-child {
      border-left: solid 2px ${COLORS.green};
    }
    &:last-child {
      border-right: solid 2px ${COLORS.green};
    }
  ` : `
    border-top: 0;
    border-bottom: 0;
  `)}
  padding: 20px 10px;
  height: 40px;
  `;

const SpanStyled = styled.span`
  display: inline-block;
  vertical-align: middle;
  background-color: transparent;
  font-family: 'Open Sans';
  font-size: 18px;
  color: ${COLORS.downriver};
  word-wrap: break-word;
  a {
    color: ${COLORS.downriver};
    text-decoration: none;
  }
  ${({ data }) => {
    if (!data) return '';
    if (data.type && data.type === 'principal') return `color: ${COLORS.green};`;
    if (data.type && data.type === 'important') return `color: ${COLORS.red};`;
    return '';
  }}
  `;

const commonBadgeStyles = `
  text-align: center;
  font-size: 14px;
  padding: 4px 9px;
  border-radius: 100px;
  white-space: nowrap;
  `;

const StatusWaitingStyled = styled.span`
  ${commonBadgeStyles}
  color: ${COLORS.rawUmber};
  background-color: ${COLORS.orange};
  `;

const StatusClosedStyled = styled.span`
  ${commonBadgeStyles}
  background-color: ${COLORS.yellowGreen};
  color: ${COLORS.lynch};
  `;

const StatusConfirmedStyled = styled.span`
  ${commonBadgeStyles}
  background-color: ${COLORS.alabaster};
  color: ${COLORS.downriver};
  `;

const ImageStyled = styled.img`
  width: 164px;
  max-width: 100%;
  padding: 4px;
  border-radius: 100px;
  `;

const ExpandableListItemStyled = styled.tr`
  > td > div {
    margin-left: 20px;
    margin-right: 20px;
    padding: 30px;
    background-color: ${COLORS.athensGray};
  }
  `;

const ExpandableItemStyled = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  `;

const CheckboxWrapperStyled = styled.div`width: 30px;`;

const ComponentButtonStyled = styled(ComponentButton)`
  display: block;
  margin: 40px auto 10px;
  `;

export const Text = ({ data }) => (
  <SpanStyled data={data} className={data.className ? data.className : ''}>
    {data.type === 'waiting' && <StatusWaitingStyled>{data.label}</StatusWaitingStyled>}
    {data.type === 'closed' && <StatusClosedStyled>{data.label}</StatusClosedStyled>}
    {data.type === 'confirmed' && <StatusConfirmedStyled>{data.label}</StatusConfirmedStyled>}
    {(data.type !== 'closed' && data.type !== 'waiting' && data.type !== 'confirmed') && data.label}
  </SpanStyled>
);

Text.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const PhoneNumber = ({ data }) => <SpanStyled>{data}</SpanStyled>;

PhoneNumber.propTypes = {
  data: PropTypes.string.isRequired,
};

export const Email = ({ data }) => <SpanStyled><a target="_parent" href={`mailto:${data.email}`}>{data.label}</a></SpanStyled>;

Email.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export const FormattedDate = ({ data }) => (
  <SpanStyled>{formatDate(new Date(data).getTime())}</SpanStyled>
);

FormattedDate.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const FormattedDateTime = ({ data }) => (
  <SpanStyled>
    {formatDate(new Date(data).getTime())} - {formatTime(new Date(data).getTime())}
  </SpanStyled>
);

FormattedDateTime.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const Image = ({ data }) => (
  <ImageStyled src={data} />
);

Image.propTypes = {
  data: PropTypes.string.isRequired,
};

export const Checkbox = ({ data }) => (
  <CheckboxWrapperStyled>
    <CheckboxField checked={data.checked} onChange={data.onChange} />
  </CheckboxWrapperStyled>
);

Checkbox.propTypes = {
  data: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export const Expand = ({ handleExpand, expanded }) => (
  <div onClick={handleExpand} style={{ cursor: 'pointer' }}>
    {expanded ? <span>▲</span> : <span>▼</span>}
  </div>
);

Expand.propTypes = {
  handleExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export const Button = ({
  data: {
    label, icon, danger, onClick,
  },
}) => {
  if (!label && !icon) {
    return null;
  }
  return (
    icon
      ? <ComponentButton
        icon={<Icon name={icon} />}
        size="small"
        danger={danger}
        onClick={() => onClick()}
      />
      : label
        ? <ComponentButton
          label={label}
          danger={danger}
          onClick={() => onClick()}
        />
        : null
  );
};

Button.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Button.defaultProps = {
  data: {},
};

export const Switcher = ({ data: { checked, onChange } }) => (
  <ToggleSwitchField checked={checked} onChange={onChange} />
);

Switcher.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Switcher.defaultProps = {
  data: {},
};

const ListItem = ({
  header, data, handleExpand, expanded,
}) => (
  <ListItemStyled data={data}>
    {
      Object.entries(data).map(([key, value]) => {
        if (header[key]) {
          const RenderComponent = header[key].type;
          return (
            <ListItemTdStyled
              key={key}
              data={data}
            >
              <RenderComponent
                data={value}
                handleExpand={handleExpand}
                expanded={expanded}
              />
            </ListItemTdStyled>
          );
        }
        return null;
      })
    }
  </ListItemStyled>
);

const componentTypes = [
  Text,
  Email,
  Button,
  PhoneNumber,
  FormattedDate,
  FormattedDateTime,
  Image,
  Checkbox,
  Switcher,
  Expand,
];

ListItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.shape({
      label: PropTypes.string,
    })])),
  header: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.oneOf(componentTypes).isRequired,
  })).isRequired,
  handleExpand: PropTypes.func,
  expanded: PropTypes.bool,
};

ListItem.defaultProps = {
  data: {},
  handleExpand: () => {},
  expanded: false,
};

const ListHeader = ({ header }) => (
  <HeaderStyled checkbox={header.checkbox}>
    {
      Object.entries(header).map(([key, value]) => (
        <HeaderThStyled key={key} value={value}>
          {value.label}
        </HeaderThStyled>
      ))
    }
  </HeaderStyled>
);

ListHeader.propTypes = {
  header: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.oneOf(componentTypes).isRequired,
  })).isRequired,
};

export class DataList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.objectOf(PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.oneOf(componentTypes).isRequired,
    })).isRequired,
  }
  static defaultProps = {
    data: [],
  }
  state = {
    expanded: null,
  }
  handleExpand = (ix) => {
    if (this.state.expanded === `${ix}expandable`) {
      this.setState({ expanded: null });
    } else {
      this.setState({
        expanded: `${ix}expandable`,
      });
    }
  }
  render() {
    const { data, header } = this.props;
    const dataListRows = [];
    // TODO: Julian please refactor this to use an immutable function like Array.prototype.reduce or
    // Array.prototype.map and generally avoid initializing empty arrays/objects in order to
    // append/modify them with a loop later on because you don't want that array reference kept
    // there and shrinking/growing arbitrarily. (ping me if you need help, Serkan.)
    data.forEach((d, ix) => {
      if (d.expandableData) {
        dataListRows.push(<ListItem
          key={ix}
          header={header}
          data={d}
          handleExpand={() => this.handleExpand(ix)}
          expanded={this.state.expanded === `${ix}expandable`}
        />);
        /* eslint-disable react/jsx-closing-tag-location */
        dataListRows.push(<ExpandableListItemStyled key={`${ix}expandable`} style={{ display: this.state.expanded === `${ix}expandable` ? 'table-row' : 'none' }}>
          <td colSpan={Object.keys(d).length}>
            <div>
              {d.expandableData.map((item, dataIndex) => (
                <ExpandableItemStyled key={dataIndex}>
                  <div>
                    {item.map((i, itemIndex) => (
                      i.switcher
                        ? (
                          <div key={itemIndex}>
                            <ToggleSwitchField checked={i.checked} onChange={i.onChange} />
                          </div>
                        )
                        : (
                          <div key={itemIndex}>
                            <div>{i.label}</div>
                            <div>{i.value}</div>
                          </div>
                        )
                    ))}
                  </div>
                </ExpandableItemStyled>
              ))}
              <ComponentButtonStyled secondary label="Show more" onClick={() => {}} />
            </div>
          </td>
        </ExpandableListItemStyled>);
        /* eslint-enable react/jsx-closing-tag-location */
      } else {
        dataListRows.push(<ListItem key={ix} header={header} data={d} />);
      }
    });
    return (
      <TableStyled>
        <thead>
          <ListHeader header={header} data={data} />
        </thead>
        <tbody>
          {dataListRows}
        </tbody>
      </TableStyled>
    );
  }
}
