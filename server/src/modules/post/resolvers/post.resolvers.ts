import { ModuleContext, GraphQLModule } from "@graphql-modules/core";
import { PostsModuleContext } from "..";
import { PostsProvider } from "../providers/posts.provider";
import { PostResolvers, PostDbObject } from '@models';

export default {
    Post: {
        id: root => root._id.toString(),
        author: 
            (root, _, { injector }) => 
                injector.get(PostsProvider).getUserById(root.userId)
    } as PostResolvers.Resolvers<ModuleContext<PostsModuleContext>, PostDbObject>
};
