import { QueryResolvers } from "@models";
import { ModuleContext } from "@graphql-modules/core";
import { PostsModule, PostsModuleContext } from "../posts.module";
import { PostsProvider } from "../providers/posts.provider";

export default ({ injector }: typeof PostsModule) => ({
    Query: {
        allPosts: () => injector.get(PostsProvider).getAllPosts()
    } as QueryResolvers.Resolvers<ModuleContext<PostsModuleContext>>
});
