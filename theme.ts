import { ChakraProps, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
export default extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: (props: ChakraProps) => ({
      body: {
        bg: mode("white", "gray.800")(props),
      },
    }),
  },
});
