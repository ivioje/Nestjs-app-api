import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/Todo.model';
import * as cors from 'cors'
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [
    TodoModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '0000',
      username: 'postgres',
      database: 'NestTodoApp',
      models: [Todo],
      //prevent leaking implementation
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
