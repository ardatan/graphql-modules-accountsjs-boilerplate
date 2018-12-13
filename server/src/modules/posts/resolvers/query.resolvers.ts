import { IResolvers } from "@models";
import { PostsModule } from "../posts.module";
import { PostsProvider } from "../providers/posts.provider";

export default ({ injector }: typeof PostsModule): IResolvers => ({
    Query: {
        allPosts: () => injector.get(PostsProvider).getAllPosts()
    }
});
