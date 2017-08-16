import { DiceValueSchema } from './DiceValueSchema'

export const EffectSchema = {
	description	: String,
	condition	: String,
	bonus 		: DiceValueSchema,
};