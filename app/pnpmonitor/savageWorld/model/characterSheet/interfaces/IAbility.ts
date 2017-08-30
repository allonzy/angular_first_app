import {IEffect} from './IEffect';
import {AbilityTypeEnum} from './AbilityTypeEnum';

/**
* describe an ability of a character, 
* WARNING /!\ all effect may not be automaticly applicable 
*/
export interface IAbility {
	name 			: String,
	effect	 		: IEffect,
	description		: String,
	type 			: AbilityTypeEnum
};