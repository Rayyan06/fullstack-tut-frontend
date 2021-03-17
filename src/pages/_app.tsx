
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import theme from '../theme'

import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps ){
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp