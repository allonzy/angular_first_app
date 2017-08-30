import {IMsg} from './IMsg';
import {IUser} from './IUser';

export interface IChat{
	_id					: String ;
	participants		: {
		[index: number] :	   IUser;
	};
	messages			: {
		[index: number] :	   IMsg;
	};
}