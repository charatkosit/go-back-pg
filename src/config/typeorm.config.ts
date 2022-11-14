/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mysql',
    host: '52.54.69.220',
    port: 3308,
    username: 'root',
    password: '1234',
    database: 'testhaha',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}