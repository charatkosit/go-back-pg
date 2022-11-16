/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { environment } from '../environments/environment'
export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: environment.dbUrl,
    port: 3308,
    username: environment.dbUsername,
    password: environment.dbPassword,
    database: environment.dbName,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}