import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { getHomeData } from "../lib/apolloQuerys";

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {posts.map((p: any) => {
          return (
            <div key={p.sys.id}>
              <h2>{p.title}</h2>
              <p>
                {p.author.name}, {p.date}
              </p>
              <p>{p.title}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  const { data: post } = await client.query({
    query: getHomeData,
  });

  return {
    props: {
      posts: post.postCollection.items,
    },
  };
};
