import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../store';
import {Api} from '../const.ts';
import {CommentType} from '../types/comment-type.ts';
import {setupCommentsAction, updateCommentsAction} from '../store/action.ts';
import {PostCommentType} from '../types/post-comment-type.ts';

export const getCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<CommentType[]>(Api.Comments.replace(':offerId', offerId));
    dispatch(setupCommentsAction(data));
  },
);

export const postCommentAction = createAsyncThunk<void, PostCommentType, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<CommentType>(Api.Comments.replace(':offerId', offerId), { comment, rating });
    dispatch(updateCommentsAction(data));
  },
);
