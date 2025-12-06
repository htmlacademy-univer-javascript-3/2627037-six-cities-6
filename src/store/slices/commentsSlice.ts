import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setupCommentsHandler, updateCommentsHandler } from '../action.ts';
import { CommentType } from '../../types/comment-type.ts';

interface CommentsState {
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
      .addCase(setupCommentsHandler, (state: CommentsState, action: PayloadAction<CommentType[]>) => {
        state.comments = action.payload;
      })
      .addCase(updateCommentsHandler, (state: CommentsState, action: PayloadAction<CommentType>) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
