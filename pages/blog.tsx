import Head from "next/head";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";
import { getMarkdownHomeData, IPost } from "@/lib/apolloQuerys";
import { Center, SimpleGrid } from "@chakra-ui/react";
import { PostCard } from "@/components/postCard";
import { MotionFlex } from "@/components/motionComponents";
import Navbar from "@/components/navbar";

const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

export default function Blog() {
  const { data } = useQuery(getMarkdownHomeData);
  const posts = data.markdownPostCollection.items;
  return (
    <MotionFlex
      as="main"
      justify="center"
      align="center"
      maxW="4xl"
      w="full"
      direction="column"
      mx="auto"
      p={4}
      pt={0}
      basis={0}
      variants={container}
      exit="initial"
      initial="initial"
      animate="animate"
    >
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Center w="full">
        <SimpleGrid columns={[1, null, null, 2]} spacing={8}>
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
