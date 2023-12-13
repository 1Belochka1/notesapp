import { INote } from './note';

export interface ITag {
  id: string;
  name: string;
  notes?: INote[];
}
