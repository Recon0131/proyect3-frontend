import { gql } from "@apollo/client";

export const HELLO = gql`
  {
    hello
  }
`;

export const VERIFY = gql`
  query ($token: String) {
    verify(token: $token) {
      username,
      id
    }
  }
`;

export const GET_POSTS = gql`
query{
  posts{
    id
    body
    createdAt
    authorId{
      id
      username
    }
    comments{
      comment
      createdAt
      id
      user{
        username
        id
      }
      post{
        id
        
      }
    }
    authorId{
      username
      id
    }
  }
}

`