import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/updateTodo.dto';
import { TodoService } from './todo.service';
import { Todo } from 'src/models/Todo.model';

@Controller('todo-api')
export class TodoController {
    constructor(private todoService: TodoService){}

    //return all todo items
    @Get('all')
    async readTodoItems(): Promise<Todo[]>{
        return this.todoService.readAllTodoItems();
    }

    //create todo item
    @Post('create')
    async createTodoItem(@Body() todo: CreateTodoDto): Promise<Todo> {
       return this.todoService.createTodoItem(todo);
    }

    //update todo item
    @Put('update/:id')
    updateTodoItem(@Param('id', ParseIntPipe) id: number, @Body() todo: UpdateTodoDto) {
        return this.todoService.updateTodoItem(id, todo)
    }

    //delete todo item
    @Delete('delete/:id')
    async deleteTodoItem(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.deleteTodoItem(id);        
    }

}