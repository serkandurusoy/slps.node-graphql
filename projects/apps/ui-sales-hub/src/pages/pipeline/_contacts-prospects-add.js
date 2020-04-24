import React, { Component } from 'react';
import { Forms } from '@sloops/library-ui-components';

const PipelineContactsProspectsAddComponent = () => (
  <div>
    <Forms.LongTextFieldInput label="Notes" name="notes" />
  </div>
);

// TODO: class just for future data integration...
class PipelineContactsProspectsAdd extends Component {
  state = {}
  render() {
    return (
      <PipelineContactsProspectsAddComponent {...this.props} />
    );
  }
}

export default PipelineContactsProspectsAdd;
