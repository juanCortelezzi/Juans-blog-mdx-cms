import Head from "next/head";
import { MotionFlex } from "@/components/motionComponents";
import Navbar from "@/components/navbar";
import ProjectCard from "@/components/projectCard";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
  FormControl,
  VisuallyHidden,
  Box,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useState } from "react";

const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

export default function Projects({ data }) {
  const [search, setSearch] = useState("");

  const options = { keys: ["name", "description"] };

  const fuse = new Fuse(data, options);
  const results = fuse.search(search);
  let dataResults = results.map((r) => r.item);
  if (dataResults.length < 1) {
    dataResults = data;
  }

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
              placeholder="search a project"
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
      <Box w="full">
        {dataResults.map((d: any) => (
          <ProjectCard
            key={d.id}
            name={d.name}
            description={d.description}
            created_at={d.created_at}
            updated_at={d.updated_at}
            html_url={d.html_url}
          />
        ))}
      </Box>
    </MotionFlex>
  );
}

export async function getStaticProps() {
  const data = await fetch("https://api.github.com/users/juancortelezzi/repos").then((r) =>
    r.json()
  );

  return {
    props: {
      data: await data,
    },
    revalidate: 120,
  };
}
