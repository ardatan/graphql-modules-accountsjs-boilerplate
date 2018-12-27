export type Maybe<T> = T | null;

export interface CreateUserInput {
  username?: Maybe<string>;

  email?: Maybe<string>;

  password?: Maybe<string>;
}

export interface TwoFactorSecretKeyInput {
  ascii?: Maybe<string>;

  base32?: Maybe<string>;

  hex?: Maybe<string>;

  qr_code_ascii?: Maybe<string>;

  qr_code_hex?: Maybe<string>;

  qr_code_base32?: Maybe<string>;

  google_auth_qr?: Maybe<string>;

  otpauth_url?: Maybe<string>;
}

export interface AuthenticateParamsInput {
  access_token?: Maybe<string>;

  access_token_secret?: Maybe<string>;

  provider?: Maybe<string>;

  password?: Maybe<string>;

  user?: Maybe<UserInput>;

  code?: Maybe<string>;
}

export interface UserInput {
  id?: Maybe<string>;

  email?: Maybe<string>;

  username?: Maybe<string>;
}

export interface AdditionalEntityFields {
  path?: Maybe<string>;

  type?: Maybe<string>;
}

// ====================================================
// Documents
// ====================================================

export type AddPostVariables = {
  title?: Maybe<string>;
  content?: Maybe<string>;
};

export type AddPostMutation = {
  __typename?: "Mutation";

  addPost: Maybe<AddPostAddPost>;
};

export type AddPostAddPost = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  content: Maybe<string>;
};

export type AllPostsVariables = {};

export type AllPostsQuery = {
  __typename?: "Query";

  allPosts: Maybe<AllPostsAllPosts[]>;
};

export type AllPostsAllPosts = {
  __typename?: "Post";

  id: Maybe<string>;

  title: Maybe<string>;

  content: Maybe<string>;

  author: Maybe<AllPostsAuthor>;
};

export type AllPostsAuthor = {
  __typename?: "User";

  username: Maybe<string>;
};

import { FunctionalComponent } from "@stencil/core";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const AddPostDocument = gql`
  mutation AddPost($title: String, $content: String) {
    addPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;
export interface AddPostComponentProps {
  variables?: AddPostVariables;
  onReady?: import("stencil-apollo/dist/types/components/apollo-mutation/types").OnMutationReadyFn<
    AddPostMutation,
    AddPostVariables
  >;
}
export const AddPostComponent: FunctionalComponent<AddPostComponentProps> = (
  props,
  children
) => {
  return (
    <apollo-mutation mutation={AddPostDocument} {...props}>
      {children}
    </apollo-mutation>
  );
};
export const AllPostsDocument = gql`
  query AllPosts {
    allPosts {
      id
      title
      content
      author {
        username
      }
    }
  }
`;
export interface AllPostsComponentProps {
  variables?: AllPostsVariables;
  onReady?: import("stencil-apollo/dist/types/components/apollo-query/types").OnQueryReadyFn<
    AllPostsQuery,
    AllPostsVariables
  >;
}
export const AllPostsComponent: FunctionalComponent<AllPostsComponentProps> = (
  props,
  children
) => {
  return (
    <apollo-query query={AllPostsDocument} {...props}>
      {children}
    </apollo-query>
  );
};
