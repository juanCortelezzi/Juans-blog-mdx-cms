import { Text, Flex, Spacer } from "@chakra-ui/react";
import ThemeSwitch from "./themeSwitch";
import { Link } from "./link";
export const PostNavbar = ({ preview }: { preview: boolean }) => {
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
          fg="white"
        >
          <Text fontSize="xl">This is a preview</Text>
          &nbsp;
          <Link href="/api/exit-preview" fontSize="xl" color="teal.500">
            exit
          </Link>
        </Flex>
      ) : null}
      <Flex justify="center" align="center" mb={4} mt={preview ? 8 : 0}>
        <Link href="/" fontSize="2xl" fontWeight="semibold">
          Blog
        </Link>
        <Spacer />
        <ThemeSwitch />
      </Flex>
    </>
  );
};
