import { User } from '../model/schema/User';
import { Chat } from '../model/schema/Chat';
import { Msg } from '../model/schema/Msg';
import { IMsg } from '../model/interfaces/IMsg';

import * as restify from 'express-restify-mongoose';

import {router} from '../../../server'

export var ChatRest = restify.serve(router,Chat,
	{
    	version:'/v1' //Default value : /v1
	});
