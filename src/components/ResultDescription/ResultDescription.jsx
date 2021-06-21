import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

const ResultDescription  = (props) => {
  const { resultText, noResultText, introText, loading, loadingText } = props;
  return (
    !loading ? (
      <Text>
        {
          (!!resultText) ? (
            `${introText} ${resultText}`
          ) : (
            noResultText
          )
        }
      </Text>
    ) : (
      loadingText && (
        <Text>
          {loadingText}
        </Text>
      )
    )
  );
};

ResultDescription.propTypes = {
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  resultText: PropTypes.string, // e.g. Larenseweg 34g ...
  introText: PropTypes.string.isRequired,
  noResultText: PropTypes.string.isRequired,
};

export default React.memo(ResultDescription);
