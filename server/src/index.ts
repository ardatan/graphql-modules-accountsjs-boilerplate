import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { MongoClient, ObjectId } from 'mongodb';
import { AccountsServer } from '@accounts/server';
import { AccountsPassword } from '@accounts/password';
import { DatabaseManager } from '@accounts/database-manager';
import MongoDBInterface from '@accounts/mongo';
import { AppModule } from '@modules/app';

const PORT = process.env['MONGO_URI'] || 4000;
const MONGO_URI = process.env['MONGO_URI'] || 'mongodb://localhost:27017/myDb';
const TOKEN_SECRET = process.env['TOKEN_SECRET'] || 'myTokenSecret'; 

async function main() {
    const mongoClient = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        native_parser: true
    });
    const db = mongoClient.db();
    const userStorage = new MongoDBInterface(db, {
        convertUserIdToMongoObjectId: false
    });
    // Create database manager (create user, find users, sessions etc) for accounts-js
    const accountsDb = new DatabaseManager({
        sessionStorage: userStorage,
        userStorage,
    });
        // Create accounts server that holds a lower level of all accounts operations
    const accountsServer = new AccountsServer(
            { db: accountsDb, tokenSecret: TOKEN_SECRET },
            {
            password: new AccountsPassword({
                passwordHashAlgorithm: 'sha256'
            }),
            }
        );
    const { schema, context } = AppModule.forRoot({
        accountsServer,
        db
    });
    const apolloServer = new ApolloServer({
        schema,
        context,
        introspection: true
    });
    const { url } = await apolloServer.listen(PORT);
    console.log(`Server listening: ${url}`);
}

main();