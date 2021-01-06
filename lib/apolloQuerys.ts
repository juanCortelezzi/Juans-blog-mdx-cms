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
  excerpt: string;
}

export interface IAuthor {
  name: string;
  picture: { url: string; width: number; height: number };
}

export const getHomeData = gql`
  query {
    postCollection(order: date_DESC) {
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

export interface IGetPostSlug {
  postCollection: { items: IPostSlug[] };
}

interface IPostSlug {
  slug: string;
}

export const getPostSlug = gql`
  query {
    postCollection(order: date_DESC) {
      items {
        slug
      }
    }
  }
`;

export interface IGetPostData {
  postCollection: {
    items: {
      title: string;
      coverImage: { url: string };
      data: Date;
      author: IAuthor;
      constent: {
        json: JSON;
      };
    };
  };
}

export const getPostData = gql`
  query($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
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
        content {
          json
        }
      }
    }
  }
`;
