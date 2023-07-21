/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { HttpModule } from '@nestjs/axios';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { LoggingModule } from './logging/logging.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    UsersModule,
    HttpModule,
    AuthModule,
    OrdersModule,
    SapModule,
    LoggingModule,
     
  ],
  controllers: [AppController],
  providers: [AppService,
              // HttpService
            ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
