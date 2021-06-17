import React, { Component } from 'react';
import Home from './Views/Home/Home';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import theme from './theme/theme';

class App extends Component {
  extendedTheme = (theme) => {
    return extendTheme({
      ...theme,
    });
  }

  render() {
    return (
      <ChakraProvider theme={this.extendedTheme(theme)}>
        <Home/>
      </ChakraProvider>

    );
  }
}

export default App;
