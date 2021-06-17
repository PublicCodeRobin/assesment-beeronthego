import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

function ErrorMessage(props) {
  const { message } = props;
  return (
    <Box
      borderRadius={'lg'}
      color="white"
      p={5}
      bg={'red.300'}
      mb={5}
    >
      <WarningIcon/> Oeps! {!!message ? message : 'Er ging iets verkeerd!' }
    </Box>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
