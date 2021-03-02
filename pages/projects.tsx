import Head from "next/head";
import { MotionFlex } from "@/components/motionComponents";
import Navbar from "@/components/navbar";
import ProjectCard from "@/components/projectCard";
const container = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
export default function Projects({ data }) {
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
      {data.map((d: any) => (
        <ProjectCard
          key={d.id}
          name={d.name}
          description={d.description}
          created_at={d.created_at}
          updated_at={d.updated_at}
          html_url={d.html_url}
        />
      ))}
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
