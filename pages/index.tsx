import Head from "next/head";
import { Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { MotionBox } from "../components/motionComponents";
import Navbar from "../components/navbar";
const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
export default function Home() {
  const textColor = useColorModeValue("gray.800", "gray.300");
  return (
    <MotionBox
      as="main"
      maxW="4xl"
      w="full"
      mx="auto"
      p={4}
      pt={0}
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
      <Heading as="h2" size="2xl">
        Hey, i'm Juan Cortelezzi
      </Heading>
      <Text fontSize="large" my={2} color={textColor}>
        I'm a self taught web developer, currently studying software engeneering at Austal
        University. You've found my personal slice of the internet, feel free to look around
      </Text>
    </MotionBox>
  );
}
