
import { Document, Schema, Model, model} from "mongoose";

import { IChat } from './../interfaces/IChat';
import { User } from './User';
import { Msg } from './Msg';

//---------------description of the file
export interface IChatModel extends Document,IChat {
  //can be extended for hook, metaInfo ...
}


export var ChatSchema : Schema = new Schema({
  	participants	: { type: Schema.ObjectId, ref: 'User' },
	messages		: [{ type: Schema.ObjectId, ref: 'Msg' }]
});

ChatSchema.methods = {

};

export const Chat: Model<IChatModel> = model<IChatModel>("Chat", ChatSchema);
