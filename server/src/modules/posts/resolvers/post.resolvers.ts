import { PostsModule } from "../posts.module";
import { IResolvers } from '@models';
import { AccountsServer } from "@accounts/server";

export default ({ injector }: typeof PostsModule): IResolvers => ({
    Post: {
        author: ({ userId }) => injector.get(AccountsServer).findUserById(userId)
    }
});
