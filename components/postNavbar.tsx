import { Text, Flex, Spacer, useColorModeValue } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ThemeSwitch from "./themeSwitch";
import { Link } from "./link";
export const PostNavbar = ({ preview }: { preview: boolean }) => {
  const color = useColorModeValue("white", "white");
  return (
    <>
      {preview ? (
        <Flex
          justify="center"
          align="center"
          w="full"
          position="absolute"
          left={0}
          top={0}
          bg="black"
          pt={1}
        >
          <Text fontSize="xl" color={color}>
            This is a preview
          </Text>
          &nbsp;
          <Link href="/api/exit-preview" fontSize="xl" color="teal.500">
            exit
          </Link>
        </Flex>
      ) : null}
      <Flex justify="center" align="center" mt={preview ? 12 : 0}>
        <Link href="/blog" fontSize="2xl" fontWeight="semibold">
          <ArrowBackIcon /> Blog
        </Link>
        <Spacer />
        <ThemeSwitch />
      </Flex>
    </>
  );
};
