import "reflect-metadata";
declare var __dirname;

import {Controller, Param, Body, Get, Post, Put, Delete,Render,InternalServerError}  from "routing-controllers";
import {Todo} from '../model/Todo'

@Controller()
export class TodoController {
    @Post("/addtodo")
    addTodo(@Param("id") id: number) {
    	let todo1 = new Todo({
    		title:"howdi",
    		text:"warudo"
    	});
    	todo1.save(function(err){
    		if (err) throw new InternalServerError(err);
    	});
    	return {
    		todo1
    	};
    }
    @Get("/todoList")
    @Render("example/views/renderTodoList")
    renderTodoList(){
        return Todo.find({}).lean()
            .then(elements=>{
                return {
                    page:{title:"todo list"},
                    todos:elements,
                };
            })
            .catch(err=>{
                if(err)throw new InternalServerError(err);
            });
    }

}