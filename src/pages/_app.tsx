import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import theme from "../theme";
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache";
import { AppProps } from "next/app";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
const client = createClient({
  url: "https://tob87.sse.codesandbox.io/graphql",
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {});
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {});
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument
              },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user
                  };
                }
              }
            );
          }
        }
      }
    }),
    fetchExchange
  ]
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
