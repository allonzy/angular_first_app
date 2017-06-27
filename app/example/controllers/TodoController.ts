import "reflect-metadata";
declare var __dirname;

import {Controller, Param, Body, Get, Post, Put, Delete,Render,InternalServerError}  from "routing-controllers";
import {Todo} from '../model/Todo'

@Controller()
export class TodoController {
    @Post("/add-todo")
    @Render("renderTodoList")
    renderView(@Param("id") id: number) {
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

}