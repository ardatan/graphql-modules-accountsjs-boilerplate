import { IResolvers } from "@models";
import { PostsProvider } from "../providers/posts.provider";
import { PostsModule } from "../posts.module";

export default ({ injector }: typeof PostsModule): IResolvers => ({
    Mutation: {
        addPost: (_, { title, content }, { userId }) => injector.get(PostsProvider).addPost(title, content, userId),
    }
});
