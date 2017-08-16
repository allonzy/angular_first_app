import {WeaponTypeEnum} from './WeaponTypeEnum';
import {IDiceValue} from './IDiceValue';
import {IItem} from './IItem';

export interface IWeapon extends IItem{
	range	 		: IDiceValue,
	hitChance		: IDiceValue,
	type			: WeaponTypeEnum,
};