import { configure, setAddon, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { withKnobs } from '@storybook/addon-knobs'
import StoryWrapper from './StoryWrapper';

setOptions({
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: false,
  hierarchySeparator: /\//,
});

addDecorator(withKnobs)
addDecorator(StoryWrapper)

function loadStories() {
  require('../src/_stories')
}

configure(loadStories, module)
