import React, { FC, useState } from 'react';
import { Box, Button, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const Searchbar: FC<{
  startSearch: Function,
  zipcode?: string,
}> = (props) => {
  const [zipcode, setZipcode] = useState('');
  return (
    <Box
      my={5}
    >
      <Stack spacing={4}>
        <Text>
          A micro brewery nearby? Fill in your postal code and find out!
        </Text>
        <form onSubmit={e => props.startSearch(e, zipcode)}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
            >
              <SearchIcon color="gray.300"/>
            </InputLeftElement>
            <Input
              value={zipcode}
              maxLength={7}
              onChange={e => setZipcode(e.target.value)}
              type="text"
              placeholder="1234 AB"
            />
            <Button
              ml={2}
              color={'white'}
              type="submit"
              bg="second.200"
            >Search
            </Button>
          </InputGroup>

        </form>
      </Stack>
    </Box>
  );
};

Searchbar.propTypes = {
  startSearch: PropTypes.func.isRequired,
  zipcode: PropTypes.string,
};

export default React.memo(Searchbar);
