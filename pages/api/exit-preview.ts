import { NextApiRequest, NextApiResponse } from "next";
export default async function exit(_req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.writeHead(307, { Location: "/blog" });
  res.end();
}
