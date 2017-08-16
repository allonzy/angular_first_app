import "reflect-metadata";

import {Controller, Param, QueryParam, Body, BodyParam, Get, Post, Put, Delete,Render,InternalServerError,OnNull}  from "routing-controllers";
import { Schema } from "mongoose";


import { User } from '../model/schema/User';
import { Chat } from '../model/schema/Chat';
import { Msg } from '../model/schema/Msg';
import { IMsg } from '../model/interfaces/IMsg';


@Controller()
export class MsgController {
    @Post("/ajax/chat/sendmsg")
    sendmsg(@BodyParam("msg") msgData,
    	@BodyParam("senderId") senderId :string,
    	@BodyParam("chatId") chatId: string,
    ){
    	let msg = new Msg(msgData);
    	msg.save((err)=>{
    		console.log(err);
    	});
    	console.log(chatId);
    	Chat.findById(chatId,
    		(err,chat)=>{
    			if(err || chat === null){
    				console.log("MsgController.sendmsg(): Chat("+chatId+") not found",err);
    			}else{
    				chat.messages.push(msg);
	    			return chat.save((err)=>{
	    				console.log(err);
	    			});
    			}
    		});
		return {status:'ok'};
    }
    @Get("/ajax/chat/create")
    createChat(){
    	let chat = new Chat();
    	chat.save((err)=>{
    		
    	});
    	console.log('msg');
        return chat.toObject();
    }
    @Get("/ajax/chat/newMsg")
    getNewMsg(
    	@QueryParam("chatId") chatId: string,
    	@QueryParam("lastUpdateDate") lastUpdateDate: Date,
    	){
    	return Msg.find().lean();
    	/*.findById(chatId)
    	.populate({'path':'messages'}).lean();*/
    }
}