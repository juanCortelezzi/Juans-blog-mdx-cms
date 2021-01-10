import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { getHomeData, IGetHomeData, IPost } from "../lib/apolloQuerys";
import { Heading, Center, SimpleGrid, Flex, Box, Spacer } from "@chakra-ui/react";
import { PostCard } from "../components/postCard";
import { ApolloError } from "@apollo/client";
import ThemeSwitch from "../components/themeSwitch";

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      basis={0}
    >
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="full" justify="center" align="center" grow={2}>
        <Heading as="h1" size="4xl" my={4} lineHeight="tall">
          Next Blog
        </Heading>
        <Spacer />
        <Box>
          <ThemeSwitch />
        </Box>
      </Flex>
      <Center w="full">
        <SimpleGrid columns={[1, null, null, null, 2]} spacing={8}>
          {posts.map((p: IPost) => (
            <PostCard key={p.sys.id} p={p} />
          ))}
        </SimpleGrid>
      </Center>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  const { data: post, error }: { data: IGetHomeData; error?: ApolloError } = await client.query({
    query: getHomeData,
  });

  if (error) {
    console.log(error);
  }
  return {
    props: {
      posts: post.postCollection.items,
    },
    revalidate: 10,
  };
};
