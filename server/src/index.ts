import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { MongoClient } from 'mongodb';
import { AccountsServer } from '@accounts/server';
import { AccountsPassword } from '@accounts/password';
import AccountsMongoDB from '@accounts/mongo';
import { AppModule } from '@modules/app/app.module';

const PORT = process.env['MONGO_URI'] || 4000;
const MONGO_URI = process.env['MONGO_URI'] || 'mongodb://localhost:27017/myDb';
const TOKEN_SECRET = process.env['TOKEN_SECRET'] || 'myTokenSecret';

async function main() {
    const mongoClient = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        native_parser: true
    });
    const db = mongoClient.db();
    // Create accounts server that holds a lower level of all accounts operations
    const accountsServer = new AccountsServer(
        {
            db: new AccountsMongoDB(db),
            tokenSecret: TOKEN_SECRET
        },
        {
            password: new AccountsPassword(),
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