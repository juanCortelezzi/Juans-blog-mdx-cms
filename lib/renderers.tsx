import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import nord from "./nordColorscheme";
import spliter from "../utils/spliter";
import createCode from "../utils/createCode";
import PostImage from "../components/postImage";
import {
  Heading,
  Box,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Code,
  Center,
  ListItem,
  OrderedList,
  List,
  UnorderedList,
  Text,
  Divider,
  ListIcon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, MinusIcon } from "@chakra-ui/icons";

const margin = 4;
const marginTopHeader = 12;

export const renderers = (textColor: string, shadow: string) => ({
  heading: ({ level, node: { children } }) => {
    let value: any;
    switch (level) {
      case 1:
        value = (
          <Heading as="h2" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 2:
        value = (
          <Heading as="h3" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 3:
        value = (
          <Heading as="h4" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 4:
        value = (
          <Heading as="h5" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 5:
        value = (
          <Heading as="h6" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      case 6:
        value = (
          <Heading as="p" size="lg" mt={marginTopHeader} mb={margin}>
            {children[0].value}
          </Heading>
        );
        break;
      default:
        value = <Text>{children[0].value}</Text>;
        break;
    }
    return value;
  },
  thematicBreak: () => <Divider my={margin} />,
  paragraph: ({ children }) => {
    return (
      <>
        {spliter(children).map((i: any) => {
          if (i.type === "P") {
            return (
              <Text fontSize="md" color={textColor} key={createCode()}>
                {i.children}
              </Text>
            );
          } else {
            return (
              <Box w="100%" key={createCode()}>
                {children}
              </Box>
            );
          }
        })}
      </>
    );
  },
  list: ({ ordered, children }) => {
    if (ordered) {
      return <OrderedList my={margin}>{children}</OrderedList>;
    } else if (children[0].props.node.checked !== null) {
      return <List my={margin}>{children}</List>;
    } else {
      return <UnorderedList my={margin}>{children}</UnorderedList>;
    }
  },
  listItem: ({ node: { checked }, children }) => {
    if (checked === null) {
      return <ListItem>{children}</ListItem>;
    } else {
      if (checked) {
        return (
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            {children}
          </ListItem>
        );
      } else {
        return (
          <ListItem>
            <ListIcon as={MinusIcon} color="green.500" />
            {children}
          </ListItem>
        );
      }
    }
  },
  code: ({ language, value }) => (
    <Center my={margin} overflow="hidden">
      <Box w="full" h="full" borderRadius="lg">
        <SyntaxHighlighter style={nord} language={language} children={value} />
      </Box>
    </Center>
  ),
  inlineCode: ({ value }) => <Code>{value}</Code>,
  strong: ({ children }) => (
    <Text as="b" fontSize="md" fontWeight="bold" color={textColor}>
      {children}
    </Text>
  ),
  emphasis: ({ children }) => <Text as="i">{children}</Text>,
  table: ({ children }) => (
    <Center my={margin}>
      <Box w={["xs", "md", "xl", "3xl"]} maxW="3xl" borderRadius="lg" overflow="hidden">
        <Table>{children}</Table>
      </Box>
    </Center>
  ),
  tableHead: ({ children }) => <Thead>{children}</Thead>,
  tableBody: ({ children }) => <Tbody>{children}</Tbody>,
  tableRow: ({ children }) => <Tr>{children}</Tr>,
  tableCell: ({ children, isHeader }) => {
    if (isHeader) return <Th>{children}</Th>;
    return <Td>{children}</Td>;
  },
  imageReference: ({ src }) => <PostImage margin={margin} src={src} shadow={shadow} />,
  image: ({ src }) => <PostImage margin={margin} src={src} shadow={shadow} />,
  link: ({ href, children }) => {
    return (
      <Link href={href} color="teal.500" isExternal>
        {children[0].props.children}
      </Link>
    );
  },
  linkReference: ({ href, children }) => {
    return (
      <Link href={href} color="teal.500" isExternal>
        {children[0].props.children}
      </Link>
    );
  },
  blockquote: ({ children }) => {
    return (
      <Center my={margin}>
        <Flex
          w="xs"
          justify="center"
          align="center"
          direction="column"
          borderWidth="1px"
          borderRadius="lg"
          p={margin}
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
