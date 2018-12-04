import { GraphQLModule } from "@graphql-modules/core";
import { loadResolversFiles, loadSchemaFiles } from '@graphql-modules/sonar';
import { mergeResolvers } from '@graphql-modules/epoxy';
import { AccountsModule } from "@accounts/graphql-api";
import { PostsProvider } from './providers/posts.provider';
import { DbModule } from "@modules/db/db.module";

export const PostsModule = new GraphQLModule({
    name: 'posts',
    typeDefs: loadSchemaFiles(__dirname + '/schema/'),
    resolvers: mergeResolvers(loadResolversFiles(__dirname + '/resolvers/')),
    imports: [
        AccountsModule.forChild(),
        DbModule.forChild()
    ],
    providers: [
        PostsProvider
    ]
});
