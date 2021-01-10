import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ChakraProps, ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
  styles: {
    global: (props: ChakraProps) => ({
      body: {
        bg: mode("white", "gray.800")(props),
      },
    }),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
