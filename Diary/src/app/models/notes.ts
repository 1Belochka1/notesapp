import { ITags } from './tags';

export interface INotes {
	id: string;
	name: string;
	content: string;
	createDate: Date;
	userId: string;
	user: any;
	tags: ITags[];
}
