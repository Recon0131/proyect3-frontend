import { gql } from "@apollo/client";

export const LOGIN_REQUEST = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;
export const REGISTER_REQUEST = gql`
  mutation ($username: String, $email: String, $password: String) {
    register(username: $username, email: $email, password: $password)
  }
`;

export const ADD_POST = gql`
  mutation ($body: String!, $authorId: String!) {
    createPost(body: $body, authorId: $authorId) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation ($id: String!, $body: String!, $token: String!) {
    updatePost(id: $id, body: $body, token: $token) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation ($comment: String!, $postId: String!, $token: String!) {
    addComment(comment: $comment, postId: $postId, token: $token) {
      id
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation ($id: String, $token: String) {
    deletePost(id: $id, token: $token)
  }
`;
