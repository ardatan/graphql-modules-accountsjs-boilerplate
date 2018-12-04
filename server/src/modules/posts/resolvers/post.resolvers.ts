import { PostsModule } from "../posts.module";
import { PostResolvers } from '@models';
import AccountsServer from "@accounts/server";

export default ({ injector }: typeof PostsModule) => ({
    Post: {
        author: ({ userId }) => injector.get(AccountsServer).findUserById(userId)
    } as PostResolvers.Resolvers
});
