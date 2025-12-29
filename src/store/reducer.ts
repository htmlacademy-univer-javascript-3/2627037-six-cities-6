import { combineReducers } from '@reduxjs/toolkit';

import commentsReducer from './slices/commentsSlice.ts';
import locationsReducer from './slices/locationsSlice.ts';
import offersReducer from './slices/offersSlice.ts';
import usersReducer from './slices/usersSlice.ts';

export const rootReducer = combineReducers({
  comments: commentsReducer,
  locations: locationsReducer,
  offers: offersReducer,
  users: usersReducer,
});
