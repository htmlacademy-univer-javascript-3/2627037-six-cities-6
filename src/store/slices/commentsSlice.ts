import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getCommentsAction,
  postCommentAction,
} from '../../api/comments/comments.ts';
import { CommentType } from '../../types/comment-type.ts';

export interface CommentsState {
  comments: CommentType[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCommentsAction.fulfilled,
        (state: CommentsState, action: PayloadAction<CommentType[]>) => {
          state.comments = action.payload;
        },
      )
      .addCase(
        postCommentAction.fulfilled,
        (
          state: CommentsState,
          action: PayloadAction<CommentType | undefined>,
        ) => {
          if (action.payload) {
            state.comments.push(action.payload);
          }
        },
      );
  },
});

export default commentsSlice.reducer;
