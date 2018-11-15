import 'reflect-metadata';
import { AppModule } from '@modules/app';
export default AppModule.forRoot({ accountsServer: { getServices() { return {password: {}} } } } as any).typeDefs;
