/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig} from './config/typeorm.config';
// import { HttpModule } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { SapModule } from './sap/sap.module';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    UsersModule,
    HttpModule,
    AuthModule,
    OrdersModule,
    SapModule,
  ],
  controllers: [AppController],
  providers: [AppService,
              // HttpService
            ],
})
export class AppModule {}
