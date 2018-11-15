import { PostsProvider } from "../providers/posts.provider";
import { UserResolvers, UserDbObject } from "@models";
import { ModuleContext } from "@graphql-modules/core";
import { PostsModuleContext } from "..";

export default {
    User: {
        id: user => user._id.toString(),
        posts: (user, _, { injector }) => injector.get(PostsProvider).getPostsOfUser(user._id),
        pictureUrl: user => user.profile.pictureUrl,
    } as UserResolvers.Resolvers<ModuleContext<PostsModuleContext>, UserDbObject>
}