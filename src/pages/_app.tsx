import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";
import { Provider, createClient } from "urql";
import { AppProps } from "next/app";

const client = createClient({
  url: "https://tob87.sse.codesandbox.io/graphql",
  fetchOptions: {
    credentials: "include"
  }
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
