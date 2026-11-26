import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/user.model';

export const logout = createAction(
  '[Top Menu] Logout',
  props<{ user: UserModel }>()
);
