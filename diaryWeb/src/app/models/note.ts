import { ITag } from './tag';

export interface INote {
  id: string;
  name: string;
  content: string;
  createDate: Date;
  userId: string;
  user: any;
  tags: ITag[];
}
