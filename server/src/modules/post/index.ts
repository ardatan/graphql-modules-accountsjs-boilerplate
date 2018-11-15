import { GraphQLModule } from "@graphql-modules/core";
import { loadResolversFiles, loadSchemaFiles } from '@graphql-modules/sonar';
import { mergeGraphQLSchemas, mergeResolvers } from '@graphql-modules/epoxy';
import { AccountsModule, AccountsModuleContext, authenticated } from "@accounts/graphql-api";
import { PostsProvider } from './providers/posts.provider';
import { IncomingMessage } from "http";
import { DbModule } from "@modules/db";

export interface PostsModuleContext extends AccountsModuleContext {}

export interface PostsModuleRequest {
    req: IncomingMessage;
}

export const PostsModule = new GraphQLModule<{}, PostsModuleRequest, PostsModuleContext>({
    name: 'posts',
    typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + '/schema/')),
    resolvers: mergeResolvers(loadResolversFiles(__dirname + '/resolvers/')),
    imports: [
        AccountsModule.forChild(),
        DbModule.forChild()
    ],
    providers: [
        PostsProvider
    ],
    resolversComposition: {
        'Mutation.addPost': authenticated,
    }
});
