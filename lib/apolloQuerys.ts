import { gql } from "@apollo/client";

export interface IGetHomeData {
  postCollection: {
    items: IPost[];
  };
}

export interface IPost {
  sys: { id: string };
  slug: string;
  title: string;
  coverImage: { url: string };
  date: Date;
  author: IAuthor;
  content: {
    json: any;
    links: {
      entries: {
        block: any;
        inline: any;
        hyperlink: any;
      };
      assets: {
        block: IAsset[];
        hyperlink: IAsset[];
      };
    };
  };
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
  postCollection: {
    items: {
      title: string;
      coverImage: { url: string };
      data: Date;
      author: IAuthor;
      content: string;
    };
  };
}

interface IAsset {
  sys: {
    id: string;
  };
  title: string;
  url: string;
}

export const getMarkdownHomeData = gql`
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
            url
          }
        }
      }
    }
  }
`;

export const getMarkdownPostSlug = gql`
  query {
    markdownPostCollection(order: date_DESC) {
      items {
        slug
      }
    }
  }
`;

export const getMarkdownData = gql`
  query($slug: String!) {
    markdownPostCollection(where: { slug: $slug }) {
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
            url
          }
        }
        content
      }
    }
  }
`;

export const getMarkdownPreviewData = gql`
  query($slug: String!) {
    markdownPostCollection(where: { slug: $slug }, preview: true) {
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
            url
          }
        }
        content
      }
    }
  }
`;
