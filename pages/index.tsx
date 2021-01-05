import * as contentful from "contentful";
import Head from "next/head";

const client = contentful.createClient({
  space: process.env.SPACEID,
  accessToken: process.env.ACCESSTOKEN,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: "article",
  });
  return {
    props: {
      articles: data.items,
    },
  };
}

export default function Home({ articles }) {
  console.log(articles);

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
