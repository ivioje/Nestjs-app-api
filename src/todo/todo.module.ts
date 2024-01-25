import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from 'src/models/Todo.model';

@Module({
    imports: [SequelizeModule.forFeature([Todo])], //defines the models registered in the current scope of this module
    providers: [TodoService],
    controllers: [TodoController]
})
export class TodoModule {}
