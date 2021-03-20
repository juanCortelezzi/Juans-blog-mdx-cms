export interface IGetHomeData {
  postCollection: {
    items: IPost[];
  };
}

async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export interface IPost {
  sys: { id: string };
  slug: string;
  title: string;
  coverImage: { url: string };
  date: Date;
  author: IAuthor;
  content: string;
}

export interface IAuthor {
  name: string;
  picture: { url: string; width: number; height: number };
}

export interface IGetPostSlug {
  markdownPostCollection: { items: IPostSlug[] };
}

interface IPostSlug {
  slug: string;
}

export interface IGetPostData {
  markdownPostCollection: {
    items: {
      title: string;
      coverImage: { url: string };
      data: Date;
      author: IAuthor;
      content: string;
    };
  };
}

export const getMarkdownHomeData = async () =>
  await fetchGraphQL(`
  query {
    markdownPostCollection(order: date_DESC) {
      items {
        sys {
          id
        }
        slug
        title
        coverImage {
          url(
            transform: { width: 2000, height: 1000, resizeStrategy: FILL, format: JPG_PROGRESSIVE }
          )
        }
        date
        author {
          name
          picture {
            url(
              transform: { width: 500, height: 250, resizeStrategy: FILL, format: JPG_PROGRESSIVE }
            )
          }
        }
      }
    }
  }
`);

export const getMarkdownPostSlug = async () =>
  await fetchGraphQL(`
  query {
    markdownPostCollection(order: date_DESC) {
      items {
        slug
      }
    }
  }
`);

export const getMarkdownPreviewSlug = async (slug: string) =>
  await fetchGraphQL(
    `query {
      markdownPostCollection(where:{slug:"${slug}"},preview:true,limit: 1) {
        items{ slug }
      }
    }`,
    true
  );

export const getMarkdownData = async (slug: string, preview: boolean) =>
  await fetchGraphQL(
    `
  query {
    markdownPostCollection(where: { slug: "${slug}" }) {
      items {
        title
        coverImage {
          url(
            transform: { width: 2000, height: 1000, resizeStrategy: FILL, format: JPG_PROGRESSIVE }
          )
        }
        date
        author {
          name
          picture {
            url(
              transform: { width: 500, height: 250, resizeStrategy: FILL, format: JPG_PROGRESSIVE }
            )
          }
        }
        content
      }
    }
  }
`,
    preview
  );
