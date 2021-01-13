import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, slug } = req.query;
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const data = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACEID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_SECRET}`,
      },
      body: JSON.stringify({
        query: `query{postCollection(where:{slug:"${slug}"},preview:true,limit: 1){items{ slug }}}`,
      }),
    }
  ).then((response) => response.json());

  const post = data.data?.postCollection?.items[0];

  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({});
  const url = `/posts/${post.slug}`;
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
  );
  res.end();
};
