import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const.ts';
import { updateAuthorizationHandler, updateUserHandler } from '../action.ts';
import { UserType } from '../../types/user-type.ts';

interface UsersState {
  authorizationStatus: string;
  user?: UserType;
}

const initialState: UsersState = {
  authorizationStatus: AuthorizationStatus.NonAuthorized,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAuthorizationHandler, (state: UsersState, action: PayloadAction<string>) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(updateUserHandler, (state: UsersState, action: PayloadAction<UserType | undefined>) => {
        state.user = action.payload;
      });
  },
});

export default usersSlice.reducer;
