import { GetStaticProps } from "next";
import { parseDate } from "@/utils/parseDate";
import { renderers } from "@/lib/renderers";
import { PostNavbar } from "@/components/postNavbar";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { IGetPostSlug, getMarkdownPostSlug, getMarkdownData } from "@/lib/apolloQuerys";
import { MotionFlex } from "@/components/motionComponents";
import ErrorPage from "next/error";
import Image from "next/image";
import Head from "next/head";
import { Heading, Text, Container, Avatar, HStack, Box, useColorModeValue } from "@chakra-ui/react";

interface IProps {
  preview: boolean;
  post: any;
}

export default function Post({ preview, post }: IProps) {
  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  const textColor = useColorModeValue("gray.800", "gray.300");
  const shadow = useColorModeValue("xl", "none");

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
      exit={{ opacity: 0 }}
    >
      <Container maxW="4xl">
        <Head>
          <title>{post.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PostNavbar preview={preview} />
        <Heading as="h1" size="2xl" my={8}>
          {post.title}
        </Heading>
        <Box mb={4} borderRadius="lg" overflow="hidden" boxShadow={shadow}>
          <Image src={post.coverImage.url} width={2000} height={1000} layout="responsive" />
        </Box>
        <HStack spacing={4} mt={4} mb={8}>
          <Avatar size="sm" name={post.author.name} src={post.author.picture.url} />
          <Text fontSize="xl">
            {post.author.name} &bull; {parseDate(post.date)}
          </Text>
        </HStack>
        <ReactMarkdown
          renderers={renderers(textColor, shadow)}
          plugins={[[gfm, { singleTilde: false }]]}
        >
          {post.content}
        </ReactMarkdown>
      </Container>
    </MotionFlex>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const { data } = await getMarkdownData(params.slug as string, preview);
  return {
    props: {
      post: data.markdownPostCollection.items[0] || null,
      preview,
    },
  };
};

export async function getStaticPaths() {
  let { data }: { data: IGetPostSlug } = await getMarkdownPostSlug();
  return {
    paths:
      data.markdownPostCollection.items.map(({ slug }: { slug: string }) => ({
        params: { slug },
      })) ?? [],
    fallback: true,
  };
}
