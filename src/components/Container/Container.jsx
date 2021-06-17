import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

class Container extends Component {
  render() {
    const { children } = this.props;
    return (
      <Box
        pos="relative"
        m="auto"
        maxWidth={['95%', '90%', '80%']}
      >
        {children}
      </Box>
    );
  }
}

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
