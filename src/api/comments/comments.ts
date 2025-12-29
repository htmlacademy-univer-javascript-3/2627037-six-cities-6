import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Api } from '../../const.ts';
import { AppDispatch, RootState } from '../../store';
import { CommentType } from '../../types/comment-type.ts';
import { PostCommentType } from '../../types/post-comment-type.ts';

export const getCommentsAction = createAsyncThunk<
  CommentType[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('comments/getComments', async (offerId, { extra: api }) => {
  try {
    const { data } = await api.get<CommentType[]>(
      Api.Comments.replace(':offerId', offerId),
    );
    return data;
  } catch {
    return [];
  }
});

export const postCommentAction = createAsyncThunk<
  CommentType | undefined,
  PostCommentType,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'comments/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    try {
      const { data } = await api.post<CommentType>(
        Api.Comments.replace(':offerId', offerId),
        { comment, rating },
      );
      return data;
    } catch {
      return undefined;
    }
  },
);
