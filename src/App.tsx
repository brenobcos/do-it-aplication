import { ChakraProvider } from '@chakra-ui/react';
import {theme} from "./styles/theme"
import React from 'react';

export const App = () => {
  return(
    <ChakraProvider theme={theme}>
      <h1>Aula 03</h1>
    </ChakraProvider>
  )
}
