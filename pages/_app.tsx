import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { AnimatePresence } from "framer-motion";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";

function MyApp({ Component, pageProps, router }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
