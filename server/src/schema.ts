import 'reflect-metadata';
import { AppModule } from '@modules/app/app.module';
import { AccountsServer } from '@accounts/server';
import { Db } from 'mongodb';
const AccountsServerMock = { getServices: () => ({ password: {} }) } as any as AccountsServer;
const DbMock = { collection: () => ({}) } as any as Db;
export default AppModule.forRoot({ accountsServer: AccountsServerMock, db: DbMock }).typeDefs;
