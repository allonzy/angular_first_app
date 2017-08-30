import { Document, Schema, Model, model} from "mongoose";

import { IMsg } from './../interfaces/IMsg';
import { User } from './User';

//---------------description of the file
export interface IMsgModel extends Document,IMsg {
  //can be extended for hook, metaInfo ...
}


export var MsgSchema : Schema = new Schema({
  	content		: String,
	date		: Date,
	owner		: { type: Schema.Types.ObjectId, ref: 'Story' }
});

MsgSchema.methods = {

};

export const Msg: Model<IMsgModel> = model<IMsgModel>("Msg", MsgSchema);
