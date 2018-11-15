import { QueryResolvers } from "@models";
import { ModuleContext } from "@graphql-modules/core";
import { PostsModuleContext } from "..";
import { PostsProvider } from "../providers/posts.provider";

export default {
    Query: {
        allPosts: (_, __, { injector }) => injector.get(PostsProvider).getAllPosts()
    } as QueryResolvers.Resolvers<ModuleContext<PostsModuleContext>>
};
