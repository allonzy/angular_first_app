import { Todo } from "../model/Todo";
import * as restify from 'express-restify-mongoose';

import {router} from '../../../server'

export var todoRest = restify.serve(router,Todo,
	{
    	version:'/v1' //Default value : /v1
	});
