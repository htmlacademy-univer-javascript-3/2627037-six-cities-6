import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { createAPI } from '../api/api.ts';
import { RootState } from '../store';

export type AppThunkDispatch = ThunkDispatch<
  RootState,
  ReturnType<typeof createAPI>,
  Action
>;
