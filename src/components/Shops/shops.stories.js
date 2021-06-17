import React from 'react';

import Shops from './Shops';

export default {
  component: Shops,
  title: 'Shops',
};

const Template = args => <Shops {...args} />;

export const Default = Template.bind({});
Default.args = {
  place_id: 260482678,
  licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
  boundingbox: [
    '52.071460513235',
    '52.391460513235',
    '5.0287743088235',
    '5.3487743088235',
  ],
  lat: '52.23146051323526',
  lon: '5.18877430882353',
  display_name: 'Hilversum, North Holland, Netherlands, 1221CN, Netherlands',
  class: 'place',
  type: 'postcode',
  importance: 0.33499999999999996,
};

export const Empty = Template.bind({});
Empty.args = {};
