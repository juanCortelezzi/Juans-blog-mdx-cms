import Head from "next/head";
import { MotionFlex } from "../components/motionComponents";
import Navbar from "../components/navbar";
const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
export default function Home() {
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
      <Navbar />
      <h2>juanba</h2>
    </MotionFlex>
  );
}
