/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { compose, withProps, branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router-dom';
import { schemas } from '@sloops/library-utils';
import { Forms, Button, Icon } from '@sloops/library-ui-components';
import { businessApi, uiApi } from '@sloops/library-ui-data-wrappers';

const renderText = ({ input }) => <div>{input.value}</div>;

const hoursValues = Array
  .from({ length: 24 })
  .map((_, ix) => `${ix.toString().padStart(2, '0')}:00`)
  .map(time => ({ label: time, value: time }));

const openingHoursArrayRenderer = ({
  fields,
  meta: { error },
}) => (
  <div>
    { error && <div>{ error }</div> }
    <table className="pages-table">
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th>Open</th>
          <th>Day</th>
          <th>Opening Hour</th>
          <th>Closing Hour</th>
        </tr>
      </thead>
      <tbody>
        {
          fields.map((openingHour, ix) => (
            <tr key={ix}>
              <td><Forms.ToggleSwitch name={`${openingHour}.open`} label="Open" /></td>
              <td className="pages-td-text"><Forms.Field name={`${openingHour}.day`} component={renderText} /></td>
              <td>
                <Forms.SelectField
                  name={`${openingHour}.openingHour`}
                  options={hoursValues}
                />
              </td>
              <td>
                <Forms.SelectField
                  name={`${openingHour}.closingHour`}
                  options={hoursValues}
                />
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

// const renderCategoryPicker = ({ input, meta, ...props }) => (<select
//   {...input}
//   {...props}
// >
//   {
//     [
//       'Category 1',
//       'Category 2',
//       'Category 3',
//       'Category 4',
//       'Category 5',
//     ].map(category => <option key={category} value={category}>{category}</option>)
//   }
// </select>);

// TODO: implement this
const categoriesOptions = [
  {
    value: 'category-1',
    label: 'Category 1',
  },
  {
    value: 'category-2',
    label: 'Category 2',
  },
  {
    value: 'category-3',
    label: 'Category 3',
  },
  {
    value: 'category-4',
    label: 'Category 4',
  },
  {
    value: 'category-5',
    label: 'Category 5',
  },
];

const categoriesArrayRenderer = ({
  fields,
  meta: { error },
}) => (
  <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '35px' }}>
    { error && <li>{ error }</li> }
    {
      fields.map((category, ix) => (
        <div>
          <li key={ix} className="business-product-categories-item">
            <Forms.SelectField
              options={categoriesOptions}
              name={category}
              style={{ width: '400px' }}
            />
            {
            ix !== 0 &&
            <Button
              className="delete-button"
              onClick={() => fields.remove(ix)}
              icon={<Icon name="bin" />}
              iconPosition="right"
              danger
            />
          }
          </li> <br />
          {
            ix === fields.length - 1 &&
            <Button
              label="Add new category"
              minimal
              onClick={() => fields.push()}
              className="user-account-array-field-add-btn"
              icon={<Icon name="circled-add" />}
            />
          }
        </div>
      ))
    }
  </ul>
);

const LogoUploadFieldInput = ({ upload }) => (<Forms.UploadField
  upload={upload}
  name="logo"
  mimeTypes={[
    'image/jpeg',
    'image/png',
  ]}
  limit={2 * 1024 * 1024}
  error=""
/>);

const LogoUploadField = compose(uiApi.mutation.upload('BUSINESS_LOGO', []))(LogoUploadFieldInput);

const PicturesUploadFieldInput = ({ upload }) => (<Forms.UploadField
  upload={upload}
  multiple
  name="pictures"
  mimeTypes={[
    'image/jpeg',
    'image/png',
  ]}
  limit={2 * 1024 * 1024}
  error=""
/>);

const PicturesUploadField = compose(uiApi.mutation.upload('BUSINESS_PICTURE', []))(PicturesUploadFieldInput);

const Fields = ({ initialValues, allErrors }) => (
  <div>
    <div className="business-product-details">
      {
        initialValues.name && (
          <div className="business-product-images">
            <LogoUploadField />
          </div>
        )
      }
      <div className="business-product-data">
        <Forms.TextField name="name" type="text" label="Name" />
        <Forms.TextField name="phoneNumber" type="text" label="Phone number" />
      </div>
    </div>
    <Forms.LongTextField name="description" label="Description" />
    <div className="pages-form-container-label">Categories</div>
    <Forms.FieldArray
      name="categories"
      component={categoriesArrayRenderer}
    />
    <div className="business-address-field">
      <Forms.AddressField
        name="address"
        apiKey="AIzaSyB_eudWv35hPw9D-epkWQs8mifT3bhTqpw"
        height={400}
        error={allErrors['address.number'] ? allErrors['address.number'].replace('address.number', 'Number') : ''}
      />
    </div>
    <div className="business-opening-field">
      <Forms.FieldArray
        name="openingHours"
        component={openingHoursArrayRenderer}
      />
    </div>
    {initialValues.name && <PicturesUploadField />}
  </div>
);

const formProvider = Forms.Form({
  displayErrorList: false,
  formName: 'updateMyBusiness',
  customButtons: [
    <Button
      label="Cancel"
      icon={<Icon name="circled-x" />}
      secondary
      key="1"
      type="button"
      onClick={() => window && window.history.back()}
      className="float-left"
    />,
    <Button
      label="Save"
      icon={<Icon name="circled-ok" />}
      key="2"
      type="submit"
      className="float-right"
    />,
  ],
  schema: schemas.businesses.updateMyBusiness,
  submitHandler: async (
    {
      logo,
      name,
      description,
      categories,
      phoneNumber,
      address: {
        lat,
        lng,
        number,
        street,
        area,
        city,
        zip,
        state,
        country,
      },
      openingHours,
      pictures,
    },
    dispatch,
    props,
  ) => props.makeApiCall({
    business: {
      logo,
      name,
      description,
      categories,
      phoneNumber,
      address: {
        lat,
        lng,
        number,
        street,
        area,
        city,
        zip,
        state,
        country,
      },
      openingHours: openingHours.map(({
        open,
        day,
        openingHour,
        closingHour,
      }) => ({
        open,
        day,
        openingHour,
        closingHour,
      })),
      pictures,
    },
  }),
  successHandler: (reset, result, dispatch, props) => {
    props.history.push('/business/details');
  }, // eslint-disable-line no-unused-vars
  errorHandler: (error, dispatch) => {}, // eslint-disable-line no-unused-vars
});

const EditBusinessForm = compose(
  businessApi.query.myBusiness,
  businessApi.mutation.updateMyBusiness,
  withProps(({ myBusiness }) => {
    const openingHours = (
      myBusiness
      && myBusiness.myBusiness
      && myBusiness.myBusiness.openingHours
    ) || [
        {
          open: true, day: 'Monday', openingHour: '08:00', closingHour: '20:00',
        },
        {
          open: true, day: 'Tuesday', openingHour: '08:00', closingHour: '20:00',
        },
        {
          open: true, day: 'Wednesday', openingHour: '08:00', closingHour: '20:00',
        },
        {
          open: true, day: 'Thursday', openingHour: '08:00', closingHour: '20:00',
        },
        {
          open: true, day: 'Friday', openingHour: '08:00', closingHour: '20:00',
        },
        {
          open: true, day: 'Saturday', openingHour: '08:00', closingHour: '20:00',
        },
        {
          open: true, day: 'Sunday', openingHour: '08:00', closingHour: '20:00',
        },
      ];

    return {
      initialValues: {
        openingHours,
        categories: ['Category 1'],
        ...(myBusiness && myBusiness.myBusiness),
      },
    };
  }),
  withRouter,
  branch(
    props => !props.myBusiness || props.myBusiness.loading,
    renderComponent(() => <div>loading...</div>),
  ),
  formProvider,
)(Fields);

const EditBusiness = () => (
  <div className="pages-form-container">
    <div className="pages-form-container-title">
      Business Details
    </div>
    <div className="pages-form-container-content">
      <EditBusinessForm />
    </div>
  </div>
);

export default EditBusiness;
