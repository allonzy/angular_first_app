import "reflect-metadata";

import {Controller, Param, Body, Get, Post, Put, Delete,Render,InternalServerError,OnNull}  from "routing-controllers";


@Controller()
export class TodoController {
    @Get("/error")
    renderError() {
    	   throw new InternalServerError("hello world error");    	
    }
    @Get("renderFromApp")
    @Render("/helloWorld/views/simple_page")
    renderFromApp() {
           return {content: "lorem ipsum sit dolor amet "};
    }
    @Get("renderFromView")
    @Render("/example/simple_page")
    renderfromView() {
           return {content: "lorem ipsum sit dolor amet "};
    }

}