import Head from "next/head";
import { GetStaticProps } from "next";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient";
import { getMarkdownHomeData, IPost } from "../lib/apolloQuerys";
import { Heading, Center, Flex, Spacer, SimpleGrid, HStack } from "@chakra-ui/react";
import ThemeSwitch from "../components/themeSwitch";
import { PostCard } from "../components/postCard";
import { MotionFlex } from "../components/motionComponents";
import { Link } from "../components/link";

const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

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
      variants={container}
      exit="initial"
      initial="initial"
      animate="animate"
    >
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex w="full" justify="center" align="center" mb={4} grow={2}>
        <Heading as="h1" size="3xl">
          Next Blog
        </Heading>
        <Spacer />
        <HStack spacing={8}>
          <Link href="#">
            <Heading as="h2" size="md">
              About
            </Heading>
          </Link>
          <Link href="#">
            <Heading as="h2" size="md">
              Contact
            </Heading>
          </Link>
        <ThemeSwitch />
        </HStack>
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
