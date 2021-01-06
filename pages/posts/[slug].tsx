import { GetStaticProps, InferGetStaticPropsType } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { getPostData, getPostSlug } from "../../lib/apolloQuerys";

export default function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(post);
  return <h1>Post</h1>;
}

export async function getStaticPaths() {
  const client = initializeApollo();

  let { data, error } = await client.query({
    query: getPostSlug,
  });

  if (error) {
    data = [];
  }

  return {
    paths: data.postCollection.items.map(({ slug }: { slug: string }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo();
  let { data, error } = await client.query({
    query: getPostData,
    variables: { slug: params.slug },
  });

  if (error) {
    data = [];
  }

  return {
    props: {
      post: data.postCollection.items,
    },
  };
};
