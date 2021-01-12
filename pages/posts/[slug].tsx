import { initializeApollo } from "../../lib/apolloClient";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import ErrorPage from "next/error";
import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import { PostCard } from "../../components/postCard";
import { parseDate } from "../../lib/parseDate";
import ThemeSwitch from "../../components/themeSwitch";
import { Link } from "../../components/link";
import { getPostData, getPostSlug, IGetPostSlug } from "../../lib/apolloQuerys";
import {
  Heading,
  Text,
  Avatar,
  HStack,
  Code,
  ListItem,
  UnorderedList,
  OrderedList,
  Center,
  Divider,
  Flex,
  Spacer,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

export default function Post({ slug }: { slug: string }) {
  const { loading, error, data } = useQuery(getPostData, { variables: { slug } });
  const post = data?.postCollection?.items[0] || null;

  if (!loading && (error || !post)) {
    return <ErrorPage statusCode={404} />;
  }

  const config = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <Text fontSize="lg">{children}</Text>,
      [BLOCKS.HEADING_1]: (node: any) => (
        <Heading as="h2" size="3xl" lineHeight="tall">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_2]: (node: any) => (
        <Heading as="h3" size="2xl" lineHeight="tall">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_3]: (node: any) => (
        <Heading as="h4" size="xl" lineHeight="tall">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_4]: (node: any) => (
        <Heading as="h5" size="xl" lineHeight="tall">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_5]: (node: any) => (
        <Heading as="h6" size="xl" lineHeight="tall">
          {node.content[0].value}
        </Heading>
      ),
      [BLOCKS.HEADING_6]: (node: any) => (
        <Text fontSize="3xl" fontWeight="semibold" lineHeight="tall">
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
          <Text fontSize="lg">{node.content[0].content[0].value}</Text>
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
              <Text as="i" fontSize="4xl" fontWeight="bold" align="center">
                "
              </Text>
              <Spacer />
            </Flex>
            <Spacer />
            <Text as="i" fontSize="lg" align="center" w={3 / 4}>
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
        <Text as="b" fontSize="lg" fontWeight="bold">
          {text}
        </Text>
      ),
      [MARKS.CODE]: (text: any) => (
        <Flex as="span" display="block" my={4} justify="center" align="center" direction="column">
          <Code fontSize="lg" display="block">
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
      maxW="6xl"
      w="full"
      direction="column"
      mx="auto"
      p={4}
    >
      {!loading && !error && post ? (
        <>
          <Head>
            <title>{post.title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Box w="full" lineHeight="tall">
            <Flex justify="center" align="center" mb={4}>
              <Link href="/" fontSize="2xl" fontWeight="semibold">
                Blog
              </Link>
              <Spacer />
              <ThemeSwitch />
            </Flex>
            <Heading as="h1" size="4xl" lineHeight="tall">
              {post.title}
            </Heading>
            <Box mb={4} borderRadius="lg" overflow="hidden" boxShadow="xl">
              <Image src={post.coverImage.url} width={2000} height={1000} layout="responsive" />
            </Box>
            <HStack spacing={4} mt={4} mb={8}>
              <Avatar size="sm" name={post.author.name} src={post.author.picture.url} />
              <Text fontSize="xl">
                {post.author.name} &bull; {parseDate(post.date)}
              </Text>
            </HStack>
            {documentToReactComponents(post.content.json, config)}
          </Box>
        </>
      ) : (
        <Box w="full" lineHeight="tall">
          <Head>
            <title>Next Blog</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Flex justify="center" align="center" mb={4}>
            <Link href="/" fontSize="2xl" fontWeight="semibold">
              Blog
            </Link>
            <Spacer />
            <ThemeSwitch />
          </Flex>
          <Skeleton height="40px" w={["md", null, "lg", "xl"]} mb={4} />
          <Skeleton height="xl" w="full" />
          <Box padding="6">
            <HStack spacing={4} mt={4} mb={8}>
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={1} spacing="4" />
            </HStack>
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </Box>
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
  await client.query({
    query: getPostData,
    variables: { slug: params.slug },
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
      slug: params.slug,
    },
    revalidate: 60,
  };
};
