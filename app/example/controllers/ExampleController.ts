import "reflect-metadata";

import {Controller, Param, Body, Get, Post, Put, Delete,Render,InternalServerError,OnNull}  from "routing-controllers";


@Controller()
export class ExampleController {
    @Get("/sayHello")
    sayHello(){
        return 'Hello World!';
    }
    @Get("/error")
    throwError() {
    	   throw new InternalServerError("hello world error");    	
    }
    @Get("/renderPageFromApp")
    @Render("example/views/simple_page")
    renderFromApp() {
           return {text: "lorem ipsum sit dolor amet"};
    }
    @Get("/renderPageFromViews")
    @Render("example/simple_page")
    renderfromView() {
           return {text: "lorem ipsum sit dolor amet"};
    }
}