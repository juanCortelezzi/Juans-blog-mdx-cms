import Head from "next/head";
import { GetStaticProps } from "next";
import { getMarkdownHomeData, IPost } from "@/lib/apolloQuerys";
import { Center, SimpleGrid } from "@chakra-ui/react";
import { PostCard } from "@/components/postCard";
import { MotionFlex } from "@/components/motionComponents";
import Navbar from "@/components/navbar";
import Fuse from "fuse.js";
import { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
  FormControl,
  VisuallyHidden,
} from "@chakra-ui/react";

const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

export default function Blog({ posts }) {
  const [search, setSearch] = useState("");
  const options = { keys: ["title", "date"] };
  const fuse = new Fuse(posts, options);
  const results = fuse.search(search);
  let dataResults = results.map((r) => r.item);
  if (dataResults.length < 1) {
    dataResults = posts;
  }

  return (
    <MotionFlex
      as="main"
      maxW="4xl"
      w="full"
      mx="auto"
      p={4}
      pt={0}
      justify="center"
      align="center"
      direction="column"
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

      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormControl id="projectSearch">
          <VisuallyHidden>
            <FormLabel>Search</FormLabel>
          </VisuallyHidden>
          <InputGroup size="md">
            <Input
              type="text"
              placeholder="Search a post"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement w="4.5rem" pr={1}>
              <Button size="sm" type="submit">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
      <Center w="full" mt={8}>
        <SimpleGrid columns={[1, null, null, 2]} spacing={8}>
          {dataResults.map((p: IPost) => (
            <PostCard key={p.sys.id} p={p} />
          ))}
        </SimpleGrid>
      </Center>
    </MotionFlex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postData = await getMarkdownHomeData();
  const posts = postData?.data?.markdownPostCollection?.items ?? [];

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
