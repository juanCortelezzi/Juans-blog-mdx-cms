import { gql } from "@apollo/client";

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
          url
        }
        date
        author {
          name
          picture {
            url
          }
        }
        excerpt
      }
    }
  }
`;

export const getPostSlug = gql`
  query {
    postCollection(order: date_DESC) {
      items {
        slug
      }
    }
  }
`;

export const getPostData = gql`
  query($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        coverImage {
          url
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
