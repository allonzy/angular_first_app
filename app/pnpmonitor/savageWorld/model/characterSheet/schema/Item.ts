import { Document, Schema, Model, model} from "mongoose";
import { IItem } from '../interfaces/IItem';
  
//---------------description of the file
export interface IItemModel extends Document,IItem {

}


export var ItemSchema : Schema = new Schema({
	name 			: String,
	description		: String,
	note			: String,
},{discriminatorKey: 'itemType'});

ItemSchema.methods = {

};

export const Item: Model<IItemModel> = model<IItemModel>("Item", ItemSchema);
