import { Document, Schema, Model, model} from "mongoose";
import { ICharacterSheet } from '../interfaces/ICharacterSheet';
import { DiceValueSchema } from './DiceValueSchema';
import { Skill } from './Skill';
import { Ability } from './Ability';
import { Item } from './Item';


import { EffectSchema } from './EffectSchema'

//---------------description of the file
export interface ICharacterSheetModel extends Document,ICharacterSheet {

}


export var CharacterSheetSchema : Schema = new Schema({
	name 			: String,
	stats	 		: {
						agi:DiceValueSchema,
						spi:DiceValueSchema,
						int:DiceValueSchema,
						str:DiceValueSchema,
						vig:DiceValueSchema,
					},
	skills			: [{ type: Schema.ObjectId, ref: 'Skill' }],
	abilities		: [{ type: Schema.ObjectId, ref: 'Ability' }],
	items			: [{ type: Schema.ObjectId, ref: 'Item' }],
});

CharacterSheetSchema.methods = {

};

export const CharacterSheet: Model<ICharacterSheetModel> = model<ICharacterSheetModel>("CharacterSheet", CharacterSheetSchema);
