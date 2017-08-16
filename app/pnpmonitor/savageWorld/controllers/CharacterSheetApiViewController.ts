import "reflect-metadata";

import {Controller, Param, Body, Get, Post, Put, Delete,Render,InternalServerError,OnNull, BodyParam}  from "routing-controllers";

import { CharacterSheet } from "../model/characterSheet/schema/CharacterSheet";
import { DiceEnum } from "../model/characterSheet/interfaces/DiceEnum";
import { StatEnum } from "../model/characterSheet/interfaces/StatEnum";

@Controller()
export class CharacterSheetController {
    @Post("/savageworld/api/characterSheet")
    createCharacterSheet(
        @BodyParam("caracterSheet") characterSheet :object
      ){
      let characterSheetEntity = new CharacterSheet({characterSheet});
      characterSheetEntity.save((err)=>{
        if(err){
          //TODO Handle errors
        }
      });
      return characterSheetEntity._id;
    }

    @Get("/savageworld/api/statsbox/:id")
    @Render("pnpmonitor/savageWorld/views/partials/characterSheet/statsBox")
    getStatsBox(@Param("id") id: string){
        return CharacterSheet.findById(id).lean();
    }

    @Get("/savageworld/api/dices")
    getDice(){
        return Object.keys(DiceEnum); 
    }
    
    @Get("/savageworld/api/stats")
    getStats(){
        return Object.keys(StatEnum); 
    }
    
}