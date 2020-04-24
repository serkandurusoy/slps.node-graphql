/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';
import { withRouter, Redirect } from 'react-router-dom';
import { businessApi, accountsApi } from '@sloops/library-ui-data-wrappers';
import { Button, Icon, ImageCarousel } from '@sloops/library-ui-components';

const BusinessDetails = ({
  myBusiness: {
    myBusiness,
  },
  me: {
    loading,
  },
  history,
}) => {
  if (loading) return null;
  return (
    <div>
      {
        !myBusiness
          ? <Redirect to="/business/edit" />
          : (
            <div className="shop-details">
              <div className="shop-details__actions">
                <Button
                  onClick={() => history.push('/business/edit')}
                  label="Edit details"
                  icon={<Icon name="circled-add" />}
                  iconPosition="left"
                  large
                />
              </div>
              { myBusiness &&
              <div>
                <div className="shop-details__main">
                  <div className="shop-details__info">
                    <div className="shop-details__info-head">
                      <div className="shop-details__logo-wrapper">
                        { myBusiness.logo
                          ? <img src={myBusiness.logo} alt="Logo" className="shop-details__logo" />
                          : <span>Logo not uploaded</span>
                        }
                      </div>
                      <div className="shop-details__info-head-text">
                        <h2 className="shop-details__title">{ myBusiness.name }</h2>
                        <div className="shop-details__soon">Closing soon: 6PM</div>
                        {myBusiness.categories.length && (
                          <div className="shop-details__categories">
                            Categories
                            <div className="shop-details__categories-label">{ myBusiness.categories.join(', ') }</div>
                          </div>)}
                      </div>
                    </div>
                    <div className="shop-details__info-triptic">
                      {(myBusiness.phoneNumber || myBusiness.address) && (
                        <div>
                          <div className="shop-details__label">Contact:</div>
                          <div className="shop-details__content">
                            { myBusiness.phoneNumber }<br />
                            {
                              myBusiness.address
                              && Object
                                .entries(myBusiness.address)
                                .filter(e => !['lat', 'lng'].includes(e[0]))
                                .map(e => e[1])
                                .join(' ')
                            }<br />
                          </div>
                        </div>)}
                      {myBusiness.openingHours.length && (
                        <div>
                          <div className="shop-details__label">Opening hours:</div>
                          <div className="shop-details__content">
                            { myBusiness.openingHours.map(openingHour => (
                              openingHour.open &&
                              <div key={openingHour.day}>
                                <span
                                  className={
                                    openingHour.open
                                    ? 'shop-details__open-item is-active'
                                    : 'shop-details__open-item'
                                  }
                                >
                                  <strong>
                                    { openingHour.day }:
                                  </strong>&nbsp;
                                  { openingHour.openingHour } - { openingHour.closingHour }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>)}
                      {/* <div> // TODO: for now we don't implement that
                        <div className="shop-details__label">Online delivery:</div>
                        <div className="shop-details__content">
                          { myBusiness.description }
                        </div>
                      </div> */}
                    </div>
                    {myBusiness.description && (
                      <div className="shop-details__info-longtext">
                        <div className="shop-details__label">Description:</div>
                        <div className="shop-details__content">
                          { myBusiness.description }
                        </div>
                      </div>)}
                  </div>
                  {/* <div className="shop-details__map" /> */}
                </div>
                {myBusiness && myBusiness.pictures
                  ? <ImageCarousel images={myBusiness.pictures} />
                  : null}
              </div>
              }
            </div>)
      }
    </div>
  );
};

BusinessDetails.propTypes = {
  myBusiness: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default compose(
  withRouter,
  businessApi.query.myBusiness,
  branch(
    props => !props.myBusiness || props.myBusiness.loading,
    renderComponent(() => <div>loading...</div>),
  ),
  connect(
    ({
      ui: {
        account: {
          id,
          firstHit,
        },
      },
    }) => ({
      userId: id,
      firstHit,
    }),
    null,
  ),
  accountsApi.query.me,
)(BusinessDetails);
