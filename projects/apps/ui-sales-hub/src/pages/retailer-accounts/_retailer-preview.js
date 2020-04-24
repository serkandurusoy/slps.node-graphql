import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { accountsApi } from '@sloops/library-ui-data-wrappers';
import { Layouts } from '@sloops/library-ui-components';
import { setViewType } from '../../store/actions';

const RetailerPreview = ({
  history,
  location,
  viewType,
  setViewTypeDispatch,
  me,
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
    <div>
      <div className="owner-details clearfix">
        <div>
          <div className="owner-details-label">Full Name</div>
          <div className="owner-details-value">John Doe</div>
        </div>
        <div className="margin-top-30 clearfix">
          <div className="owner-details-column">
            <div className="owner-details-label">Email Address</div>
            <div className="owner-details-value">john.doe@example.com</div>
          </div>
          <div className="owner-details-column">
            <div className="owner-details-label">Phone Number</div>
            <div className="owner-details-value">+49555555555</div>
          </div>
        </div>
        <div className="margin-top-30 clearfix">
          <div className="owner-details-column">
            <div className="owner-details-label">Status</div>
            <div className="owner-details-value">Waiting for inventory</div>
          </div>
          <div className="owner-details-column">
            <div className="owner-details-label">Last Status Change</div>
            <div className="owner-details-value">12th May 2017</div>
          </div>
        </div>
      </div>
      <div className="shop-details margin-top-30">
        <div>
          <div className="shop-details__main">
            <div className="shop-details__info">
              <div className="shop-details__info-head">
                <img src="" alt="Logo" className="shop-details__logo" />
                <div className="shop-details__info-head-text">
                  <h2 className="shop-details__title">Business name</h2>
                  <div className="shop-details__soon">Closing soon: 6PM</div>
                  <div className="shop-details__categories">
                    Categories
                    <div className="shop-details__categories-label">Clothes, Shoes</div>
                  </div>
                </div>
              </div>
              <div className="shop-details__info-triptic">
                <div>
                  <div className="shop-details__label">Contact:</div>
                  <div className="shop-details__content">
                    Lorem ipsum
                  </div>
                </div>
                <div>
                  <div className="shop-details__label">Opening hours:</div>
                  <div className="shop-details__content">
                    <div>
                      <span className="shop-details__open-item is-active">
                        <strong>Friday:</strong>&nbsp;
                        08:00 - 20:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shop-details__info-longtext">
                <div className="shop-details__label">Description:</div>
                <div className="shop-details__content">
                  Lorem ipsum dolor
                </div>
              </div>
            </div>
          </div>
          <div className="shop-details__gallery">
            <img src="" alt="" className="shop-details__gallery-item" />
            <img src="" alt="" className="shop-details__gallery-item" />
          </div>
        </div>
      </div>
    </div>
  </Layouts.SalesDashboardLayout>
);

RetailerPreview.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  me: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewType: PropTypes.string,
  setViewTypeDispatch: PropTypes.func,
};

RetailerPreview.defaultProps = {
  viewType: '',
  setViewTypeDispatch: () => {},
};

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
)(RetailerPreview);
