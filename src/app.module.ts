/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
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
import { LoggingService } from './logging/logging.service';
import { LoggingRepository } from './logging/logging.repository';
import { Logging } from './logging/entities/logging.entity';

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
    TypeOrmModule.forFeature([Logging]),

  ],
  controllers: [AppController],
  providers: [AppService,
    // HttpService
    LoggingService,
    LoggingRepository,

  ],
  exports: [LoggingRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // ให้ Middleware ทำงานกับทุก Route
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
