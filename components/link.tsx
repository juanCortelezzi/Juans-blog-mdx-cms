import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
export const Link = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  );
};
