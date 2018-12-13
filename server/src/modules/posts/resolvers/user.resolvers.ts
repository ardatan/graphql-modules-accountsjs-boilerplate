import { PostsProvider } from "../providers/posts.provider";
import { IResolvers } from "@models";
import { PostsModule } from "../posts.module";

export default ({ injector }: typeof PostsModule): IResolvers => ({
    User: {
        posts: ({ _id }: any) => injector.get(PostsProvider).getPostsOfUser(_id.toString()),
    }
});
