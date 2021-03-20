import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../theme";

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ChakraProvider>
  );
}
