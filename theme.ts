import { ChakraProps, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: Partial<ThemeConfig> = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const styles = {
  global: (props: ChakraProps) => ({
    body: {
      bg: mode("white", "gray.800")(props),
    },
  }),
} as any;

export default extendTheme({ config, styles });
