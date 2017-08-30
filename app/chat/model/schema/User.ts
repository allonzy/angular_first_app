import { Document, Schema, Model, model} from "mongoose";
import { IUser } from './../interfaces/IUser';
  
//---------------description of the file
export interface IUserModel extends Document,IUser {
  //can be extended for hook, metaInfo ...
}


export var UserSchema : Schema = new Schema({
   	avatar_url	: String,
	name		: String,
	age 		: Number,
	mail		: String,
});

UserSchema.methods = {

};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
