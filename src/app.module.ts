import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Todo } from './models/Todo.model';
import * as cors from 'cors'

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      models: [Todo],
      autoLoadModels: true,
      synchronize: true,
      logging: false
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({ origin: '*', credentials: true })).forRoutes('*')  }
}
