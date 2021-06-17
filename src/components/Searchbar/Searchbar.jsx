import React, { Component } from 'react';
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  Box,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
    };
  }
  handleInputData = (inputData) => {
    const { setZipcode } = this.props;
    return setZipcode(inputData.target.value);
  };
  render() {
    const { zipcode } = this.props;
    return (
      <Box
        my={5}
      >
        <Stack spacing={4}>
          <Text>
          A micro brewery nearby? Fill in your postal code and find out!
          </Text>
          <form onSubmit={e => this.props.startSearch(e)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
              >
                <SearchIcon color="gray.300"/>
              </InputLeftElement>
              <Input
                value={zipcode}
                maxLength={7}
                onChange={this.handleInputData}
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
  }
}

export default Searchbar;
Searchbar.propTypes = {
  startSearch: PropTypes.func,
  setZipcode: PropTypes.func,
  zipcode: PropTypes.string,
};
