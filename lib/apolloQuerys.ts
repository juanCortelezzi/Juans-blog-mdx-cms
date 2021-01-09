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
      content: {
        json: any;
        links: {
          assets: {
            block: IAsset[];
            hyperlink: IAsset[];
          };
        };
      };
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
          links {
            entries {
              block {
                ... on Post {
                  sys {
                    id
                  }
                  slug
                  title
                  coverImage {
                    url(
                      transform: {
                        width: 2000
                        height: 1000
                        resizeStrategy: FILL
                        format: JPG_PROGRESSIVE
                      }
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
                ... on Author {
                  name
                }
              }
              inline {
                ... on Post {
                  title
                  author {
                    name
                  }
                  sys {
                    id
                  }
                  slug
                }
                ... on Author {
                  name
                }
              }
              hyperlink {
                ... on Post {
                  title
                  author {
                    name
                  }
                  coverImage {
                    url
                  }
                  sys {
                    id
                  }
                  slug
                }
                ... on Author {
                  name
                }
              }
            }
            assets {
              block {
                url
                title
                sys {
                  id
                }
              }
              hyperlink {
                url
                title
                sys {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
