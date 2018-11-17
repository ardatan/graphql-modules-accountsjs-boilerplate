export interface CreateUserInput {
  username?: string | null;

  email?: string | null;

  password?: string | null;
}

export interface TwoFactorSecretKeyInput {
  ascii?: string | null;

  base32?: string | null;

  hex?: string | null;

  qr_code_ascii?: string | null;

  qr_code_hex?: string | null;

  qr_code_base32?: string | null;

  google_auth_qr?: string | null;

  otpauth_url?: string | null;
}

export interface AuthenticateParamsInput {
  access_token?: string | null;

  access_token_secret?: string | null;

  provider?: string | null;

  password?: string | null;

  user?: UserInput | null;

  code?: string | null;
}

export interface UserInput {
  id?: string | null;

  email?: string | null;

  username?: string | null;
}

export interface AdditionalEntityFields {
  path?: string | null;

  type?: string | null;
}

// ====================================================
// Documents
// ====================================================

export namespace AddPost {
  export type Variables = {
    title?: string | null;
    content?: string | null;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addPost: AddPost | null;
  };

  export type AddPost = {
    __typename?: "Post";

    id: string | null;

    title: string | null;

    content: string | null;

    author: Author | null;
  };

  export type Author = {
    __typename?: "User";

    username: string | null;
  };
}

export namespace AllPosts {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    allPosts: (AllPosts | null)[] | null;
  };

  export type AllPosts = {
    __typename?: "Post";

    id: string | null;

    title: string | null;

    content: string | null;

    author: Author | null;
  };

  export type Author = {
    __typename?: "User";

    username: string | null;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class AddPostGQL extends Apollo.Mutation<
  AddPost.Mutation,
  AddPost.Variables
> {
  document: any = gql`
    mutation AddPost($title: String, $content: String) {
      addPost(title: $title, content: $content) {
        id
        title
        content
        author {
          username
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class AllPostsGQL extends Apollo.Query<
  AllPosts.Query,
  AllPosts.Variables
> {
  document: any = gql`
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
}

// ====================================================
// END: Apollo Angular template
// ====================================================
