import { UserViewType } from './user-view-type.ts';

export type CommentType = {
  id: string;
  date: Date;
  user: UserViewType;
  comment: string;
  rating: number;
};
