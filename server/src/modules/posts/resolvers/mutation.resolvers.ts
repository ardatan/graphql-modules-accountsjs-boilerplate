import { ModuleContext } from "@graphql-modules/core";
import { MutationResolvers } from "@models";
import { PostsProvider } from "../providers/posts.provider";
import { PostsModule, PostsModuleContext } from "../posts.module";

export default ({ injector }: typeof PostsModule) => ({
    Mutation: {
        addPost: (_, { title, content }, { userId }) => injector.get(PostsProvider).addPost(title, content, userId),
    } as MutationResolvers.Resolvers<ModuleContext<PostsModuleContext>>
});
