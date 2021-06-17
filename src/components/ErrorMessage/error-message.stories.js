import React from 'react';

import ErrorMessage from './ErrorMessage';

export default {
  component: ErrorMessage,
  title: 'ErrorMessage',
};

const Template = args => <ErrorMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Error 504: bad request',
};

export const Empty = Template.bind({});
Empty.args = {};
