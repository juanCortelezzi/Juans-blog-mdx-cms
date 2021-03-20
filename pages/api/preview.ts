import { getMarkdownPreviewSlug } from "@/lib/apolloQuerys";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret, slug } = req.query;
  if (secret !== process.env.CONTENTFUL_PREVIEW_TOKEN || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const data = await getMarkdownPreviewSlug(slug as string);

  const post = data.data?.markdownPostCollection?.items[0];

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
