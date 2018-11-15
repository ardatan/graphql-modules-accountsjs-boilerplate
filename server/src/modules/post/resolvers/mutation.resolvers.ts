import { PostsModuleContext } from "..";
import { ModuleContext } from "@graphql-modules/core";
import { MutationResolvers } from "@models";
import { PostsProvider } from "../providers/posts.provider";

export default {
    Mutation: {
        addPost: (_, { title, content }, { injector, userId }) => injector.get(PostsProvider).addPost(title, content, userId.toString()),
    } as MutationResolvers.Resolvers<ModuleContext<PostsModuleContext>>
};