import { Link } from "../components/link";
import Image from "next/image";
import { PostCard } from "../components/postCard";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import {
  Heading,
  Text,
  Code,
  ListItem,
  UnorderedList,
  OrderedList,
  Center,
  Divider,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";

export const getConfig = (post: any) => ({
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <Text fontSize="md">{children}</Text>,
    [BLOCKS.HEADING_1]: (node: any) => (
      <Heading as="h2" size="lg" mt={12} mb={4}>
        {node.content[0].value}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (node: any) => (
      <Heading as="h3" size="lg" mt={12} mb={4}>
        {node.content[0].value}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (node: any) => (
      <Heading as="h4" size="lg" mt={12} mb={4}>
        {node.content[0].value}
      </Heading>
    ),
    [BLOCKS.HEADING_4]: (node: any) => (
      <Heading as="h5" size="lg" mt={12} mb={4}>
        {node.content[0].value}
      </Heading>
    ),
    [BLOCKS.HEADING_5]: (node: any) => (
      <Heading as="h6" size="lg" mt={12} mb={4}>
        {node.content[0].value}
      </Heading>
    ),
    [BLOCKS.HEADING_6]: (node: any) => (
      <Text fontSize="3xl" fontWeight="semibold" mt={12} mb={4}>
        {node.content[0].value}
      </Text>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: any) => (
      <Center w="xs" py={4}>
        <UnorderedList>{children}</UnorderedList>
      </Center>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: any) => (
      <Center w="xs" py={4}>
        <OrderedList>{children}</OrderedList>
      </Center>
    ),
    [BLOCKS.LIST_ITEM]: (node: any) => (
      <ListItem>
        <Text fontSize="md">{node.content[0].content[0].value}</Text>
      </ListItem>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: any) => (
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
    ),
    [BLOCKS.HR]: () => <Divider my={4} />,
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const [image] = post.content.links.assets.block.filter(
        (n: any) => n.sys.id === node.data.target.sys.id
      );
      return (
        <Center my={4}>
          <Box w={["xs", "md", "xl", "2xl"]} maxW="2xl" borderRadius="lg" overflow="hidden">
            <Image
              src={image.url}
              width={2000}
              height={1000}
              layout="responsive"
              objectFit="cover"
            />
          </Box>
        </Center>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      const [entry] = post.content.links.entries.block.filter(
        (n: any) => n.sys.id === node.data.target.sys.id
      );
      if (entry.__typename === "Post") {
        return (
          <Center py={4}>
            <PostCard p={entry} />
          </Center>
        );
      } else {
        return <Text>NOT DONE YET</Text>;
      }
    },
    [INLINES.HYPERLINK]: (node: any) => (
      <Link href={node.data.uri} color="teal.500">
        {node.content[0].value}
      </Link>
    ),
    [INLINES.EMBEDDED_ENTRY]: (node: any) => {
      const [entry] = post.content.links.entries.inline.filter(
        (n: any) => n.sys.id === node.data.target.sys.id
      );
      return (
        <Link href={`/posts/${entry.slug}`} color="teal.500">
          '{entry.title}' by {entry.author.name}
        </Link>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <Text as="b" fontSize="md" fontWeight="bold">
        {text}
      </Text>
    ),
    [MARKS.CODE]: (text: any) => (
      <Flex as="span" display="block" my={4} justify="center" align="center" direction="column">
        <Code fontSize="md" display="block">
          {text}
        </Code>
      </Flex>
    ),
  },
  renderText: (text: any) => {
    return text.split("\n").reduce((children: any[], textSegment: any, index: number) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
});
