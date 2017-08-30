import "reflect-metadata";

import {Controller, Param, Body, Get, Post, Put, Delete,Render,InternalServerError,OnNull, BodyParam}  from "routing-controllers";

import { CharacterSheet } from "../model/characterSheet/schema/CharacterSheet";
import { DiceEnum } from "../model/characterSheet/interfaces/DiceEnum";
import { StatEnum } from "../model/characterSheet/interfaces/StatEnum";

@Controller()
export class CharacterSheetController {
    @Get("/api/savageworld/views/statsbox/:id")
    @Render("pnpmonitor/savageWorld/views/partials/statsBox/statsBox")
    getStatsBox(@Param("id") id: string){
        CharacterSheet.findById(id)
        .lean()
        .exec(function (err, sheet){
         console.log(sheet);
        });
        return CharacterSheet.findById(id).lean();
    }

}