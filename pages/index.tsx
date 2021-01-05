import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { initializeApollo } from "../lib/apolloClient";
import { getAuthorData, getHomeData } from "../lib/apolloQuerys";

export default function Home({
  articles,
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(articles);
  console.log(authors);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Hello World</h1>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  const { data: article } = await client.query({
    query: getHomeData,
  });

  const articleArray = article.articleCollection.items;

  const authors = await articleArray.reduce(async (acc: any[], a: any) => {
    const newAcc = [...acc];
    const { data } = await client.query({
      query: getAuthorData,
      variables: { id: a.author.sys.id },
    });
    newAcc.push(data);
    return newAcc;
  }, []);

  //const parsedArticles = await article.articleCollection.items.map(async (a: any) => {
  //const { data: author } = await client.query({
  //query: getAuthorData,
  //variables: { id: a.author.sys.id },
  //});
  //a.author = { ...author.author };
  //console.log();
  //console.log(a);
  //console.log();
  //return await a;
  //});

  //console.log();
  //console.log(await parsedArticles);
  //console.log();

  return {
    props: {
      articles: articleArray,
      authors,
    },
  };
};
