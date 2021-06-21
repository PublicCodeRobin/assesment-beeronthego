import React, { FC } from 'react';
import Home from './Views/Home/Home';

import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/theme';

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Home/>
    </ChakraProvider>
  );
};

export default App;
