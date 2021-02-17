import NextLink from "next/link";
import { Link as ChakraLink, LinkOverlay as ChakraLinkOverlay } from "@chakra-ui/react";

export const Link = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  );
};

export const LinkOverlay = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLinkOverlay {...rest}>{children}</ChakraLinkOverlay>
    </NextLink>
  );
};
