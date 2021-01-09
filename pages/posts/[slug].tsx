import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { useRouter } from "next/router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import ErrorPage from "next/error";
import Image from "next/image";
import NextLink from "next/link";
import {
  getPostData,
  getPostSlug,
  IGetPostData,
  IGetPostSlug,
  IPost,
} from "../../lib/apolloQuerys";
import {
  Heading,
  Text,
  Code,
  ListItem,
  UnorderedList,
  OrderedList,
  Center,
  Divider,
  Link,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { PostCard } from "../../components/postCard";

export default function Post({ post }: { post: IPost | null }) {
  const router = useRouter();
  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  const config = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <Text fontSize="xl">{children}</Text>,
      [BLOCKS.HEADING_1]: (node: any) => (
        <Heading as="h2" size="3xl">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_2]: (node: any) => (
        <Heading as="h3" size="2xl">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_3]: (node: any) => (
        <Heading as="h4" size="xl">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_4]: (node: any) => (
        <Heading as="h5" size="xl">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_5]: (node: any) => (
        <Heading as="h6" size="xl">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_6]: (node: any) => (
        <Text fontSize="3xl" fontWeight="semibold">
          {node.content[0].value}
        </Text>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: any) => (
        <Center w="xs">
          <UnorderedList>{children}</UnorderedList>
        </Center>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: any) => (
        <Center w="xs">
          <OrderedList>{children}</OrderedList>
        </Center>
      ),
      [BLOCKS.LIST_ITEM]: (node: any) => <ListItem>{node.content[0].content[0].value}</ListItem>,
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
              <Text as="i" fontSize="4xl" fontWeight="bold" align="center">
                "
              </Text>
              <Spacer />
            </Flex>
            <Spacer />
            <Text as="i" fontSize="xl" align="center" w={3 / 4}>
              {children}
            </Text>
            <Flex w="full">
              <Spacer />
              <Text as="i" fontSize="4xl" fontWeight="bold" align="center">
                "
              </Text>
            </Flex>
          </Flex>
        </Center>
      ),
      [BLOCKS.HR]: () => <Divider my={4} />,
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const [image] = post.content.links.assets.block.filter(
          (n) => n.sys.id === node.data.target.sys.id
        );
        return (
          <Center my={4}>
            <Box w={["xs", "md", "xl"]} maxW="xl" borderRadius="lg" overflow="hidden">
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
        <NextLink href={node.data.uri} passHref>
          <Link color="teal.500">{node.content[0].value}</Link>
        </NextLink>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const [entry] = post.content.links.entries.inline.filter(
          (n: any) => n.sys.id === node.data.target.sys.id
        );
        return (
          <NextLink href={`/posts/${entry.slug}`} passHref>
            <Link color="teal.500">
              '{entry.title}' by {entry.author.name}
            </Link>
          </NextLink>
        );
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <Text as="b" fontSize="xl" fontWeight="bold">
          {text}
        </Text>
      ),
      [MARKS.CODE]: (text: any) => (
        <Flex as="span" display="block" my={4} justify="center" align="center" direction="column">
          <Code fontSize="xl" display="block">
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
  };

  return (
    <Flex
      as="main"
      justify="center"
      align="center"
      maxW="4xl"
      w="full"
      direction="column"
      mx="auto"
      p={4}
    >
      {router.isFallback ? (
        <h1>Loading ...</h1>
      ) : (
        <Box w="full">{documentToReactComponents(post.content.json, config)}</Box>
      )}
    </Flex>
  );
}

export async function getStaticPaths() {
  const client = initializeApollo();

  let { data }: { data: IGetPostSlug } = await client.query({
    query: getPostSlug,
  });

  return {
    paths:
      data?.postCollection.items.map(({ slug }: { slug: string }) => ({
        params: { slug },
      })) ?? [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo();
  let { data }: { data: IGetPostData } = await client.query({
    query: getPostData,
    variables: { slug: params.slug },
  });

  return {
    props: {
      post: data?.postCollection?.items[0] ?? null,
    },
    revalidate: 10,
  };
};
