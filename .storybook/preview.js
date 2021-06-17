import React from "react"
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import theme from '../src/theme/theme'

const extendedTheme = (theme) => {
  return extendTheme({
    ...theme,
  });
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn) => {

  return (
    <ChakraProvider theme={extendedTheme(theme)}>
      <StoryFn/>
    </ChakraProvider>
  )
}

export const decorators = [withChakra]
