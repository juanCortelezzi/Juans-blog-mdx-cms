import { GetStaticProps } from "next";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { getMarkdownHomeData, IPost } from "../lib/apolloQuerys";
import { Heading, Center, SimpleGrid, Flex, Box, Spacer } from "@chakra-ui/react";
import { MotionFlex } from "../components/motionComponents";
import { PostCard } from "../components/postCard";
import ThemeSwitch from "../components/themeSwitch";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { data } = useQuery(getMarkdownHomeData);
  const posts = data.markdownPostCollection.items;
  return (
    <MotionFlex
      as="main"
      justify="center"
      align="center"
      maxW="6xl"
      w="full"
      direction="column"
      mx="auto"
      p={4}
      basis={0}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="full" justify="center" align="center" mb={4} grow={2}>
        <Heading as="h1" size="3xl" lineHeight="tall">
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
    </MotionFlex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: getMarkdownHomeData,
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
    revalidate: 60,
  };
};
