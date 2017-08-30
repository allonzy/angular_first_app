import { Document, Schema, Model, model} from "mongoose";
import { IWeapon } from '../interfaces/IWeapon';
import { Item } from './Item';
import { DiceValueSchema } from './DiceValueSchema';
//---------------description of the file
export interface IWeaponModel extends Document,IWeapon {

}


export var WeaponSchema : Schema =new Schema({
	range	 		: DiceValueSchema,
	hitChance		: DiceValueSchema,
	type			: String,
});
WeaponSchema.methods = {

};

export const Weapon: Model<IWeaponModel> = Item.discriminator<IWeaponModel>("Weapon", WeaponSchema);
