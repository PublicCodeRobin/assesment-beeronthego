import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

const Container: FC = (props) => {
  const { children } = props;
  return (
    <Box
      pos="relative"
      m="auto"
      maxWidth={[
        '95%',
        '90%',
        '80%',
      ]}
    >
      {children}
    </Box>
  );
};

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
