import React from 'react';
import { Box, Button, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const Searchbar = (props) => {
  const { zipcode, setZipcode } = props;
  console.log(zipcode);
  return (
    <Box
      my={5}
    >
      <Stack spacing={4}>
        <Text>
          A micro brewery nearby? Fill in your postal code and find out!
        </Text>
        <form onSubmit={e => props.startSearch(e)}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
            >
              <SearchIcon color="gray.300"/>
            </InputLeftElement>
            <Input
              value={zipcode}
              maxLength={7}
              onChange={setZipcode}
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
  startSearch: PropTypes.func,
  setZipcode: PropTypes.func,
  zipcode: PropTypes.string,
};

export default Searchbar;
