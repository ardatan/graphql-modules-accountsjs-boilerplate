import { PostsProvider } from "../providers/posts.provider";
import { UserDbObject, UserResolvers } from "@models";
import { ModuleContext } from "@graphql-modules/core";
import { PostsModule, PostsModuleContext } from "../posts.module";

export default ({ injector }: typeof PostsModule) => ({
    User: {
        id: user => user._id.toString(),
        posts: user => injector.get(PostsProvider).getPostsOfUser(user._id.toString()),
    } as UserResolvers.Resolvers<ModuleContext<PostsModuleContext>, UserDbObject>
});
