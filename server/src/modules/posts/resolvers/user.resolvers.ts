import { PostsProvider } from "../providers/posts.provider";
import { UserResolvers } from "@models";
import { PostsModule } from "../posts.module";

export default ({ injector }: typeof PostsModule) => ({
    User: {
        posts: ({ _id }) => injector.get(PostsProvider).getPostsOfUser(_id.toString()),
    } as UserResolvers.Resolvers
});
 