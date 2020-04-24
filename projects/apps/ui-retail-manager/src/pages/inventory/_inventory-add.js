import React from 'react';
import { Forms, Button, Icon } from '@sloops/library-ui-components';

// TODO: just mocked data

const coloursCheckboxOptions = [
  {
    label: 'Black',
    value: 'black',
    checked: true,
  },
  {
    label: 'White',
    value: 'white',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Pink',
    value: 'pink',
  },
];

const sizesCheckboxOptions = [
  {
    label: '6',
    value: '6',
  },
  {
    label: '7.5',
    value: '7.5',
  },
  {
    label: '8',
    value: '8',
    checked: true,
  },
  {
    label: '8.5',
    value: '8.5',
  },
  {
    label: '9',
    value: '9',
  },
];

const InventoryAddComponent = () => (
  <div className="inventory pages-form-container">
    <div className="pages-form-container-title">
      Add new product
    </div>
    <div className="pages-form-container-subtitle">
      Product Details
    </div>
    <div className="pages-form-container-content">
      <div className="inventory-product-details">
        <div className="inventory-product-images">
          <div>
            Drag and drop images or <span className="inventory-image-highlight">select them</span> from your computer
          </div>
        </div>
        <div className="inventory-product-data">
          <Forms.TextFieldInput
            name="product-name"
            type="text"
            label="Name - Required"
          />
          <Forms.TextFieldInput
            name="product-brand"
            type="text"
            label="Brand"
          />
          <Forms.TextFieldInput
            name="product-category"
            type="text"
            label="Category - Required"
          />
        </div>
      </div>
      <Forms.TextFieldInput
        name="product-model"
        type="text"
        label="Model / Product code"
      />
      <Forms.LongTextFieldInput
        name="product-description"
        type="text"
        label="Description"
      />
      <div className="inventory-product-parameters">
        <div className="inventory-product-main">
          <Forms.TextFieldInput
            name="product-adefault-price"
            type="text"
            label="Default Price"
          />
        </div>
        <div className="inventory-product-types">
          <Forms.SelectFieldInput
            name="product-currency"
            options={[{ label: 'EUR', value: 'eur' }]}
            label="Currency"
          />
        </div>
      </div>
      <div className="inventory-product-parameters">
        <div className="inventory-product-main">
          <Forms.TextFieldInput
            name="product-weight"
            type="text"
            label="Weight"
          />
        </div>
        <div className="inventory-product-types">
          <Forms.SelectFieldInput
            name="product-weight-unit"
            options={[{ label: 'G', value: 'g' }]}
            label="Unit"
          />
        </div>
      </div>
      <div className="inventory-product-parameters">
        <div className="inventory-product-main">
          <div className="pages-form-container-label">Product Dimensions</div>
          <div className="inventory-dimensions">
            <Forms.TextFieldInput
              name="product-dimensions-x"
              type="text"
            />
            <div className="inventory-dimensions-separator">
              <Icon name="x" size={14} />
            </div>
            <Forms.TextFieldInput
              name="product-dimensions-y"
              type="text"
            />
            <div className="inventory-dimensions-separator">
              <Icon name="x" size={14} />
            </div>
            <Forms.TextFieldInput
              name="product-dimensions-z"
              type="text"
            />
          </div>
        </div>
        <div className="inventory-product-types">
          <Forms.SelectFieldInput
            name="product-dimensions-unit"
            options={[{ label: 'CM', value: 'cm' }]}
            label="Unit"
          />
        </div>
      </div>
    </div>
    <div className="pages-form-container-subtitle inventory-variants-title">
      <div>Variants</div>
      <div className="inventory-title-tools">
        <span className="link"><Icon name="kaleidoscope" size={12} color="#4acba4" /> Quick scan</span> <Icon name="sliders" size={12} color="#b9c3c8" /> Sort by - <span className="link">Colour</span>
      </div>
    </div>
    <div className="pages-form-container-content">
      <div className="pages-form-container-label">Product Dimensions</div>
      <div className="inventory-checkboxes">
        <div className="inventory-checkbox-list">
          <Forms.CheckboxFields
            options={coloursCheckboxOptions}
            name="product-colours"
            buttonized
            onChange={() => {}}
          />
        </div>
        <div className="inventory-checkbox-add-btn">
          <Button
            icon={<Icon name="circled-add" />}
          />
        </div>
      </div>
      <div className="inventory-checkboxes">
        <div className="pages-form-container-label">Size</div>
        <div className="inventory-checkbox-list">
          <Forms.CheckboxFields
            options={sizesCheckboxOptions}
            name="product-size"
            buttonized
            onChange={() => {}}
          />
        </div>
        <div className="inventory-checkbox-add-btn">
          <Button
            icon={<Icon name="circled-add" />}
          />
        </div>
      </div>
      <div className="inventory-product-parameters">
        <div className="inventory-product-main">
          <Forms.TextFieldInput
            name="product-adefault-price"
            type="text"
            label="Default Price"
          />
        </div>
        <div className="inventory-product-types">
          <Forms.SelectFieldInput
            name="product-currency"
            options={[{ label: 'EUR', value: 'eur' }]}
            label="Currency"
          />
        </div>
      </div>
      <div className="inventory-change-price">
        <div className="pages-form-container-label">Change price</div>
        <Forms.ToggleSwitchField
          checked
          name="product-price-change"
          onChange={() => {}}
          value="change-price"
        />
      </div>
      <div className="inventory-field-with-button">
        <div className="pages-form-container-label">Barcode</div>
        <div className="inventory-field-with-button-wrapper">
          <Button
            className="inventory-field-with-button-btn"
            onClick={() => {}}
            icon={<Icon name="edit" />}
            iconPosition="right"
          />
          <Forms.TextFieldInput
            className="inventory-field-with-button-field"
            name="product-barcode"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="inventory-buttons">
      <Button
        label="Cancel"
        secondary
        className="inventory-cancel-button"
        icon={<Icon name="circled-x" />}
      />
      <Button
        label="Save"
        className="inventory-save-button"
        icon={<Icon name="circled-ok" />}
      />
      <Button
        label="Preview"
        secondary
        className="inventory-preview-button"
        icon={<Icon name="doc-search" />}
      />
    </div>
  </div>
);

export default InventoryAddComponent;
