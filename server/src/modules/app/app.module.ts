import { GraphQLModule } from '@graphql-modules/core';
import { AccountsModule } from '@accounts/graphql-api';
import AccountsServer from '@accounts/server';
import { Db } from 'mongodb';
import { PostsModule } from '@modules/posts/posts.module';
import { DbModule } from '@modules/db/db.module';

export interface AppModuleConfig {
    accountsServer: AccountsServer;
    db: Db;
}

export const AppModule = new GraphQLModule<AppModuleConfig>({
    name: 'app',
    imports: ({ config: { accountsServer, db } }) => [
        AccountsModule.forRoot({ accountsServer }),
        DbModule.forRoot({ db }),
        PostsModule,
    ],
    configRequired: true,
});
