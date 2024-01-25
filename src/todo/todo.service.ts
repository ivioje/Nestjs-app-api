import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from 'src/models/Todo.model';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo)
        private todoModel: typeof Todo
    ){}

async createTodoItem(todo): Promise<Todo> {
    const todoItem = await this.todoModel.create(todo)
    return todoItem;
}

async readAllTodoItems(): Promise<Todo[]> {
    const todos = await this.todoModel.findAll()
    return todos;
}

async updateTodoItem(id, todo) {
    if (!id || !todo) return HttpStatus.NOT_FOUND;

    const todoItem = await this.todoModel.findByPk(id);

    if (!todoItem) {
        return HttpStatus.NOT_FOUND;
    }

    await todoItem.update({
        title: todo.title,
        description: todo.description,
        date: todo.date,
        creator: todo.creator,
    });

    await todoItem.save();

    return todoItem;
}


async deleteTodoItem(id: number) {
    if(!id) return 'Todo Id not found!'
  const todoItem = await this.todoModel.findByPk(id);
  
  if(!todoItem){
    throw new NotFoundException('Todo Id not found!')
  }
   await todoItem.destroy();

   return todoItem
  }
}
