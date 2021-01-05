import { GetStaticProps } from "next";
import { initializeApollo } from "../lib/apolloClient";
import { getArticleSlug } from "../lib/apolloQuerys";

export async function getStaticPaths() {
  const client = initializeApollo();
  const { data, error } = await client.query({
    query: getArticleSlug,
  });
  if (error) console.log(error);
  return {
    paths: data.articleCollection.items.map((a: { title: string }) => {
      return { params: { slug: a.title } };
    }),
  };
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
