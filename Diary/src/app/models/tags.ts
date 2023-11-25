import { INotes } from './notes';

export interface ITags {
	id: string;
	name: string;
	notes?: INotes[];
}
