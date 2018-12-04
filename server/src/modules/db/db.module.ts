import { GraphQLModule } from "@graphql-modules/core";
import { DIRECTIVES } from 'graphql-codegen-typescript-mongodb';
import { Db } from "mongodb";

export interface DbModuleConfig {
    db: Db;
}

export const DbModule = new GraphQLModule<DbModuleConfig>({
    name: 'db',
    typeDefs: DIRECTIVES,
    providers: ({ config: { db }}) => [
        {
            provide: Db,
            useValue: db,
        }
    ],
    directiveResolvers: {
        id: (_, { _id }) => _id.toString(),
    },
    configRequired: true,
});
