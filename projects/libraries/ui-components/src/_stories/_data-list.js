import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { Button, DataList, FormattedDate, PhoneNumber, Email, Text, Image, Checkbox } from '../data-list';

const stories = storiesOf('DataList component', module);

const listPropFewHeaders = {
  fullName: { label: 'Full Name', type: Text },
  shopName: { label: 'Shop Name', type: Text },
};

stories.add('Few columns / No data', withInfo('demonstrates list few columns and no data')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList header={listPropFewHeaders} />
  </div>
)));

const listPropFewDataForFewHeaders = [
  {
    fullName: { label: 'Serkan Durusoy' },
    shopName: { label: 'Durusoy Shop' },
  },
];

stories.add('Few columns / Few data', withInfo('demonstrates list few columns and few data')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList data={listPropFewDataForFewHeaders} header={listPropFewHeaders} />
  </div>
)));

const listPropLotsOfDataForFewHeaders = [
  {
    fullName: { label: 'Serkan Durusoy' },
    shopName: { label: 'Durusoy Shop' },
  },
  {
    fullName: { label: 'Cagri Yardimci' },
    shopName: { label: 'Architecture Baz' },
  },
  {
    fullName: { label: 'Enrico Cerroni' },
    shopName: { label: 'Gemoter' },
  },
  {
    fullName: { label: 'Micheal Jordan' },
    shopName: { label: 'Nike' },
  },
  {
    fullName: { label: 'George Clooney' },
    shopName: { label: 'Films & Co' },
  },
  {
    fullName: { label: 'Alison Wonderland' },
    shopName: { label: 'DJ Shop' },
  },
];

stories.add('Few columns/Lots of data', withInfo('demonstrates list few columns and lots of data')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList data={listPropLotsOfDataForFewHeaders} header={listPropFewHeaders} />
  </div>
)));

const listPropLotsOfHeaders = {
  fullName: { label: 'Full Name', type: Text },
  shopName: { label: 'Shop Name', type: Text },
  email: { label: 'Email', type: Email },
  addedOn: { label: 'Added On', type: FormattedDate },
  phoneNumber: { label: 'Phone Number', type: PhoneNumber },
  shopType: { label: 'Type', type: Text },
  status: { label: 'Status', type: Text },
  firstButton: { label: '\u00a0', type: Button },
  secondButton: { label: '\u00a0', type: Button },
};

const listPropFewDataForLotsOfHeaders = [
  {
    fullName: { label: 'Serkan Durusoy' },
    shopName: { label: 'Durusoy Shop' },
    email: { label: 'serkan@email.com', email: 'serkan@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '+21 5456 565641',
    shopType: { label: 'Direct', type: 'principal' },
    status: { label: 'Closed' },
    firstButton: { label: 'Edit', icon: 'edit', onClick() { return action('Edit'); } },
    secondButton: {
      label: 'Delete', icon: 'bin', danger: true, onClick() { return action('Delete'); },
    },
  },
].map(d => ({
  ...d,
  firstButton: {
    ...d.firstButton,
    value: `${d.fullName} ${d.shopName}`,
  },
  secondButton: {
    ...d.secondButton,
    value: `${d.shopName}`,
  },
}));

stories.add('Lots of columns/Few data', withInfo('demonstrates list  lots of columns')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList data={listPropFewDataForLotsOfHeaders} header={listPropLotsOfHeaders} />
  </div>
)));

const listPropLotsOfDataForLotsOfHeaders = [
  {
    fullName: { label: 'Serkan Durusoy' },
    shopName: { label: 'Durusoy Shop' },
    email: { label: 'serkan@email.com', email: 'serkan@email.com' },
    addedOn: '11/07/17',
    phoneNumber: '333 785 4459',
    shopType: { label: 'Direct', type: 'principal' },
    status: { label: 'Closed', type: 'closed' },
    firstButton: { label: 'Edit', icon: 'edit', onClick() { return action('Edit'); } },
    secondButton: {
      label: 'Delete', icon: 'bin', danger: true, onClick() { return action('Delete'); },
    },
  },
  {
    fullName: { label: 'Cagri Yardimci' },
    shopName: { label: 'Architecture Baz' },
    email: { label: 'cagry@email.com', email: 'cagryl@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '3544433459',
    shopType: { label: 'Affiliate' },
    status: { label: 'Waiting for products', type: 'waiting' },
    firstButton: { label: 'Edit', onClick() { return action('Edit'); } },
  },
  {
    fullName: { label: 'Enrico Cerroni' },
    shopName: { label: 'Gemoter' },
    email: { label: 'gemoter@email.com', email: 'gemoterl@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '0039 06 9694720',
    shopType: { label: 'Affiliate' },
    status: { label: 'Closed', type: 'closed' },
    firstButton: { label: 'Edit', onClick() { return action('Edit'); } },
  },
  {
    fullName: { label: 'Micheal Jordan' },
    shopName: { label: 'Nike' },
    email: { label: 'mike@email.com', email: 'mikel@email.com' },
    addedOn: '11/07/17',
    phoneNumber: '333 7854459',
    shopType: { label: 'Direct', type: 'principal' },
    status: { label: 'Confirmed', type: 'confirmed' },
    firstButton: { label: 'Edit', onClick() { return action('Edit'); } },
    secondButton: { label: 'Delete', danger: true, onClick() { return action('Delete'); } },
  },
  {
    fullName: { label: 'George Clooney' },
    shopName: { label: 'Films & Co' },
    email: { label: 'george@email.com', email: 'george@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '333 7854459',
    shopType: { label: 'Affiliate' },
    status: { label: 'Closed', type: 'closed' },
    firstButton: { label: 'Edit', onClick() { return action('Edit'); } },
    secondButton: { label: 'Delete', danger: true, onClick() { return action('Delete'); } },
  },
  {
    fullName: { label: 'Alison Wonderland' },
    shopName: { label: 'DJ Shop' },
    email: { label: 'wunder@email.com', email: 'wunder@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '3337854459',
    shopType: { label: 'Affiliate' },
    status: { label: 'Closed', type: 'closed' },
    firstButton: { label: 'Edit', onClick() { return action('Edit'); } },
  },
].map(d => ({
  ...d,
  firstButton: {
    ...d.firstButton,
    value: `${d.fullName} ${d.shopName}`,
  },
  secondButton: {
    ...d.secondButton,
    value: `${d.shopName}`,
  },
}));

stories.add('Lots of columns/Lots of data', withInfo('demonstrates list  lots of columns and lots of data')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList data={listPropLotsOfDataForLotsOfHeaders} header={listPropLotsOfHeaders} />
  </div>
)));

const withImageDataHeaders = {
  image: { label: 'Image', type: Image },
  fullName: { label: 'Full Name', type: Text },
  shopName: { label: 'Shop Name', type: Text },
  email: { label: 'Email', type: Email },
  addedOn: { label: 'Added On', type: FormattedDate },
  phoneNumber: { label: 'Phone Number', type: PhoneNumber },
  shopType: { label: 'Type', type: Text },
};

const withImagesData = [
  {
    image: 'http://via.placeholder.com/160x110',
    fullName: { label: 'Alison Wonderland' },
    shopName: { label: 'DJ Shop' },
    email: { label: 'wunder@email.com', email: 'wunder@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '3337854459',
    shopType: { label: 'Affiliate' },
  },
  {
    image: 'http://via.placeholder.com/160x110',
    fullName: { label: 'Alison Wonderland' },
    shopName: { label: 'DJ Shop' },
    email: { label: 'wunder@email.com', email: 'wunder@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '3337854459',
    shopType: { label: 'Affiliate' },
  },
];

stories.add('With images', withInfo('demonstrates list with images')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList data={withImagesData} header={withImageDataHeaders} />
  </div>
)));

const withCheckboxesDataHeaders = {
  checkbox: { label: '', type: Checkbox },
  fullName: { label: 'Full Name', type: Text },
  shopName: { label: 'Shop Name', type: Text },
  email: { label: 'Email', type: Email },
  addedOn: { label: 'Added On', type: FormattedDate },
  phoneNumber: { label: 'Phone Number', type: PhoneNumber },
  shopType: { label: 'Type', type: Text },
};

const withCheckboxessData = [
  {
    checkbox: { checked: true, onChange: () => {} },
    fullName: { label: 'Alison Wonderland' },
    shopName: { label: 'DJ Shop' },
    email: { label: 'wunder@email.com', email: 'wunder@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '3337854459',
    shopType: { label: 'Affiliate' },
  },
  {
    checkbox: { checked: false, onChange: () => {} },
    fullName: { label: 'Alison Wonderland' },
    shopName: { label: 'DJ Shop' },
    email: { label: 'wunder@email.com', email: 'wunder@email.com' },
    addedOn: '11/12/99',
    phoneNumber: '3337854459',
    shopType: { label: 'Affiliate' },
  },
];

stories.add('With checkboxes', withInfo('demonstrates list with images')(() => (
  <div style={{ backgroundColor: '#f7f7f7', padding: '30px' }}>
    <DataList data={withCheckboxessData} header={withCheckboxesDataHeaders} />
  </div>
)));
