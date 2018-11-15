import { GraphQLModule } from '@graphql-modules/core';
import { AccountsModule } from '@accounts/graphql-api';
import AccountsServer from '@accounts/server';
import { Db } from 'mongodb';
import { IncomingMessage } from 'http';
import { PostsModule } from './post';
import { DbModule } from './db';

export interface AppModuleConfig {
    accountsServer: AccountsServer;
    db: Db;
}

export interface AppModuleRequest {
    req: IncomingMessage;
}

export const AppModule = new GraphQLModule<AppModuleConfig>({
    name: 'app',
    imports: ({ config }) => [
        AccountsModule.forRoot({
            accountsServer: config.accountsServer
        }),
        DbModule.forRoot({
            db: config.db
        }),
        PostsModule,
    ],
});
