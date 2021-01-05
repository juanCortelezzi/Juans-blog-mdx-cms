import { gql } from "@apollo/client";

export const getHomeData = gql`
  query getNameId {
    articleCollection(limit: 100) {
      items {
        sys {
          id
        }
        title
        author {
          sys {
            id
          }
        }
        coverImage {
          title
          url
          width
          height
        }
      }
    }
  }
`;

export const getAuthorData = gql`
  query getAuthor($id: String!) {
    author(id: $id) {
      name
    }
  }
`;

export const getArticleSlug = gql`
  query getName {
    articleCollection(limit: 100) {
      items {
        slug
      }
    }
  }
`;

export const getArticleData = gql`
  query getName {
    articleCollection(limit: 100) {
      items {
        slug
      }
    }
  }
`;
