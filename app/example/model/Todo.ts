import { Document, Schema, Model, model} from "mongoose";
import {ITodo} from './ITodo'
  
//---------------description of the file
export interface ITodoModel extends Document,ITodo {
  //can be extended for hook, metaInfo ...
}


export var UserSchema: Schema = new Schema({
  title:  {type: String, unique : true , required : true},
  text: {type : String}
});

UserSchema.methods = {
    html : function(): string {
        return ("<h1>"+this.title.trim() + "</h1>"+ + this.text.trim());
    }
};
// create a REST endpoint from mangoose

export const Todo: Model<ITodoModel> = model<ITodoModel>("Todo", UserSchema);
