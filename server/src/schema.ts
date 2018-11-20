import 'reflect-metadata';
import { AppModule } from '@modules/app/app.module';
export default AppModule.forRoot({ accountsServer: { getServices() { return {password: {}} } } } as any).typeDefs;
