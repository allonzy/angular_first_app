import { Document, Schema, Model, model} from "mongoose";
import { IAbility } from '../interfaces/IAbility';
import { EffectSchema } from './EffectSchema';

//---------------description of the file
export interface IAbilityModel extends Document,IAbility {

}


export var AbilitySchema : Schema = new Schema({
	name 			: String,
	effect	 		: EffectSchema,
	description		: String,
	type 			: String,
});

AbilitySchema.methods = {

};

export const Ability: Model<IAbilityModel> = model<IAbilityModel>("Ability", AbilitySchema);
