import "reflect-metadata";

import {Controller, QueryParam, Body, Get, Post, Put, Delete,Render,InternalServerError,OnNull}  from "routing-controllers";
import {config} from '../../../server';
import * as request from 'request';


@Controller()
export class jsRessourceLoader {
    @Get("/api/utils/ressources/js")
    renderUglyJs(@QueryParam("jsRessource") jsRessource: Array<String>){
        for (let ressourceName of jsRessource){
          let uri = '/'+config['static_route']+'/'+ressourceName.replace('.','/');
        }
    }
}