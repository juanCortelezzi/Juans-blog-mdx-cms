import { Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import ThemeSwitch from "@/components/themeSwitch";
import { Link } from "@/components/link";
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter();
  return (
    <Flex w="full" justify="center" align="center" my={10} grow={2}>
      <Link href="/">
        <Heading as="h1" fontWeight="medium">
          J.B.C
        </Heading>
      </Link>
      <Spacer />
      <HStack spacing={8}>
        <Link href="/blog">
          <Heading
            as="h2"
            size="md"
            color={router.pathname === "/blog" ? "" : "gray.400"}
            fontWeight="regular"
          >
            Blog
          </Heading>
        </Link>
        <Link href="/projects">
          <Heading
            as="h2"
            size="md"
            color={router.pathname === "/projects" ? "" : "gray.400"}
            fontWeight="regular"
          >
            Projects
          </Heading>
        </Link>
        <ThemeSwitch />
      </HStack>
    </Flex>
  );
}
