import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { getHomeData, IGetHomeData, IPost } from "../lib/apolloQuerys";
import { Heading, Center, SimpleGrid, Stack } from "@chakra-ui/react";
import { PostCard } from "../components/postCard";
import { ApolloError } from "@apollo/client";

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Stack as="main">
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Heading as="h1" size="4xl" my={4}>
          Next Blog
        </Heading>
      </Center>
      <Center>
        <SimpleGrid columns={[1, 1, 1, 1, 2]} spacing={6} px={4}>
          {posts.map((p: IPost) => (
            <PostCard key={p.sys.id} p={p} />
          ))}
        </SimpleGrid>
      </Center>
    </Stack>
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
