import { initializeApollo, createApolloClient } from "../../lib/apolloClient";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import { parseDate } from "../../lib/parseDate";
import { Link } from "../../components/link";
import { PostNavbar } from "../../components/postNavbar";
import {
  IGetPostSlug,
  getMarkdownPostSlug,
  getMarkdownPreviewData,
  getMarkdownData,
} from "../../lib/apolloQuerys";
import ThemeSwitch from "../../components/themeSwitch";
import ErrorPage from "next/error";
import Image from "next/image";
import Head from "next/head";
import {
  Heading,
  Text,
  Avatar,
  HStack,
  Flex,
  Spacer,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { renderers } from "../../lib/renderers";

export default function Post({
  slug,
  preview = false,
  previewPost = null,
}: {
  slug: string;
  preview: boolean;
  previewPost: any;
}) {
  let post: any;
  let loading: boolean;
  let error: any;

  if (preview === true) {
    loading = false;
    post = previewPost;
    if (!previewPost) error = true;
  } else {
    const { loading: Loading, error: Error, data: Data } = useQuery(getMarkdownData, {
      variables: { slug },
    });
    post = Data?.markdownPostCollection?.items[0] || null;
    loading = Loading;
    error = Error;
  }

  if (!loading && (error || !post)) {
    return <ErrorPage statusCode={404} />;
  }

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
            <PostNavbar preview={preview} />
            <Heading as="h1" size="3xl" lineHeight="tall">
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
            <ReactMarkdown renderers={renderers()}>{post.content}</ReactMarkdown>
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
    query: getMarkdownPostSlug,
  });

  return {
    paths:
      data?.markdownPostCollection.items.map(({ slug }: { slug: string }) => ({
        params: { slug },
      })) ?? [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  if (preview === true) {
    const client = createApolloClient(true);
    const { data } = await client.query({
      query: getMarkdownPreviewData,
      variables: { slug: params.slug },
    });

    return {
      props: {
        previewPost: data?.markdownPostCollection?.items[0] || null,
        slug: params.slug,
        preview,
      },
      revalidate: 60,
    };
  }
  const client = initializeApollo();
  await client.query({
    query: getMarkdownData,
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
