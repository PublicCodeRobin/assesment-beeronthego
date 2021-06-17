import React from 'react';

import ShopFinder from './ShopFinder';

export default {
  component: ShopFinder,
  title: 'ShopFinder',
};

const Template = args => <ShopFinder {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Error 504: bad request',
};
