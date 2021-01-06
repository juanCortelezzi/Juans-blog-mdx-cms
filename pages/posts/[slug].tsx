import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import {
  getPostData,
  getPostSlug,
  IGetPostData,
  IGetPostSlug,
  IPost,
} from "../../lib/apolloQuerys";
import { useRouter } from "next/router";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Stack } from "@chakra-ui/react";
import ErrorPage from "next/error";

export default function Post({ post }: { post: IPost | null }) {
  const router = useRouter();
  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Stack as="main">
      {router.isFallback ? <h1>Loading ...</h1> : documentToReactComponents(post.content.json)}
    </Stack>
  );
}

export async function getStaticPaths() {
  const client = initializeApollo();

  let { data }: { data: IGetPostSlug } = await client.query({
    query: getPostSlug,
  });

  return {
    paths:
      data?.postCollection.items.map(({ slug }: { slug: string }) => ({
        params: { slug },
      })) ?? [],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo();
  let { data }: { data: IGetPostData } = await client.query({
    query: getPostData,
    variables: { slug: params.slug },
  });

  return {
    props: {
      post: data?.postCollection?.items[0] ?? null,
    },
    revalidate: 10,
  };
};
