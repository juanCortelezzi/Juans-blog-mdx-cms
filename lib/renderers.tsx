import Image from "next/image";
import { Link } from "../components/link";
import {
  Heading,
  Box,
  Code,
  Center,
  ListItem,
  OrderedList,
  UnorderedList,
  Text,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
export const renderers = () => ({
  heading: ({ level, node: { children } }) => {
    let value: any;
    switch (level) {
      case 1:
        value = (
          <Heading as="h2" size="lg" mt={12} mb={4}>
            {children[0].value}
          </Heading>
        );
        break;
      case 2:
        value = (
          <Heading as="h3" size="lg" mt={12} mb={4}>
            {children[0].value}
          </Heading>
        );
        break;
      case 3:
        value = (
          <Heading as="h4" size="lg" mt={12} mb={4}>
            {children[0].value}
          </Heading>
        );
        break;
      case 4:
        value = (
          <Heading as="h5" size="lg" mt={12} mb={4}>
            {children[0].value}
          </Heading>
        );
        break;
      case 5:
        value = (
          <Heading as="h6" size="lg" mt={12} mb={4}>
            {children[0].value}
          </Heading>
        );
        break;
      case 6:
        value = (
          <Text fontSize="3xl" fontWeight="semibold" mt={12} mb={4}>
            {children[0].value}
          </Text>
        );
        break;
      default:
        value = <Text>{children[0].value}</Text>;
        break;
    }
    return value;
  },
  thematicBreak: () => <Divider my={4} />,
  paragraph: ({ children }) => <Text fontSize="md">{children}</Text>,
  list: ({ ordered, children }) => {
    if (ordered) {
      return (
        <Center w="xs" py={4}>
          <OrderedList>{children}</OrderedList>
        </Center>
      );
    } else {
      return (
        <Center w="xs" py={4}>
          <UnorderedList>{children}</UnorderedList>
        </Center>
      );
    }
  },
  listItem: ({ children }) => <ListItem>{children}</ListItem>,
  code: ({ value }) => <Code>{value}</Code>,
  inlineCode: ({ value }) => <Code>{value}</Code>,
  strong: ({ children }) => (
    <Text as="b" fontSize="md" fontWeight="bold">
      {children}
    </Text>
  ),
  emphasis: ({ children }) => <Text as="i">{children}</Text>,
  imageReference: ({ src }) => {
    return (
      <Center my={4}>
        <Box as="span" w={["xs", "md", "xl", "2xl"]} maxW="2xl" borderRadius="lg" overflow="hidden">
          <Image
            src={`https:${src}`}
            width={2000}
            height={1000}
            layout="responsive"
            objectFit="cover"
          />
        </Box>
      </Center>
    );
  },
  linkReference: ({ href, children }) => {
    return (
      <Link href={href} color="teal.500">
        {children[0].props.children}
      </Link>
    );
  },
  blockquote: ({ children }) => {
    return (
      <Center my={4}>
        <Flex
          w="xs"
          justify="center"
          align="center"
          direction="column"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
        >
          <Flex w="full">
            <Text as="i" fontSize="3xl" fontWeight="bold" align="center">
              "
            </Text>
            <Spacer />
          </Flex>
          <Spacer />
          <Text as="i" fontSize="md" align="center" w={3 / 4}>
            {children}
          </Text>
          <Flex w="full">
            <Spacer />
            <Text as="i" fontSize="3xl" fontWeight="bold" align="center">
              "
            </Text>
          </Flex>
        </Flex>
      </Center>
    );
  },
});
