import {AbilityTypeEnum} from '../model/characterSheet/interfaces/AbilityTypeEnum';
import {DiceEnum} from '../model/characterSheet/interfaces/DiceEnum';
import {WeaponTypeEnum} from '../model/characterSheet/interfaces/WeaponTypeEnum';
import {StatEnum} from '../model/characterSheet/interfaces/StatEnum';

import {Ability} from '../model/characterSheet/schema/Ability';
import {CharacterSheet} from '../model/characterSheet/schema/CharacterSheet';
import {Item} from '../model/characterSheet/schema/Item';
import {Skill} from '../model/characterSheet/schema/Skill';
import {Weapon} from '../model/characterSheet/schema/Weapon';


import * as restify from 'express-restify-mongoose';
import {router, app} from '../../../../server'
export namespace savageWorldRestApi {
	let baseRoute = '/savageWorld';
	let ability = restify.serve(router,Ability,
		{
	    	version: baseRoute 
		});
	let characterSheet = restify.serve(router,CharacterSheet,
		{
	    	version: baseRoute 
		});
	let item = restify.serve(router,Item,
		{
	    	version: baseRoute 
		});
	let skill = restify.serve(router,Skill,
		{
	    	version: baseRoute 
		});
	let weapon = restify.serve(router,Weapon,
		{
	    	version: baseRoute 
		});

	let abilityType = app.get('/api'+baseRoute+'/AbilityType', function (req, res) {
	  	res.send(
	  		Object.keys(AbilityTypeEnum)
	  	);
	});

	let dice = app.get('/api'+baseRoute+'/Dice', function (req, res) {
	  	res.send(
	  		Object.keys(DiceEnum)
	  	);
	});

	let weaponType = app.get('/api'+baseRoute+'/WeaponType', function (req, res) {
	  	res.send(
	  		Object.keys(WeaponTypeEnum)
	  	);
	});

	let stat = app.get('/api'+baseRoute+'/Stat', function (req, res) {
	  	res.send(
	  		Object.keys(StatEnum)
  		);
	})
}