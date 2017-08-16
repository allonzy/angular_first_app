import { Document, Schema, Model, model} from "mongoose";
import { ISkill } from '../interfaces/ISkill';
import { DiceValueSchema } from './DiceValueSchema';
//---------------description of the file
export interface ISkillModel extends Document,ISkill {

}


export var SkillSchema : Schema = new Schema({
	name		: String,
	description	: String,
	value 		: DiceValueSchema,
});

SkillSchema.methods = {

};

export const Skill: Model<ISkillModel> = model<ISkillModel>("Skill", SkillSchema);
