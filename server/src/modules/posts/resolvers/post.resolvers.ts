import { ModuleContext } from "@graphql-modules/core";
import { PostsModuleContext, PostsModule } from "../posts.module";
import { PostResolvers, PostDbObject } from '@models';
import AccountsServer from "@accounts/server";

export default ({ injector }: typeof PostsModule) => ({
    Post: {
        id: post => post._id.toString(),
        author: post => injector.get(AccountsServer).findUserById(post.userId)
    } as PostResolvers.Resolvers<ModuleContext<PostsModuleContext>, PostDbObject>
});
