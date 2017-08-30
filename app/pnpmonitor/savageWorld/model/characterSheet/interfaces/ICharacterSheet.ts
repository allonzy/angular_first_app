import {IDiceValue} from './IDiceValue';
import {ISkill} from './ISkill';
import {IAbility} from './IAbility';
import {IItem} from './IItem';
import {StatEnum} from './StatEnum';

export interface ICharacterSheet{
	name 			: String,
	stats	 		: {
						[StatEnum: string]:IDiceValue,
					},
	skills			: [ISkill],
	abilities		: [IAbility],
	items			: [IItem],
};