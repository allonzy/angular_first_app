import {IUser} from './IUser';

export interface IMsg{
	_id			: String ;
	content		: String;
	owner		: IUser;
	date		: Date;
}