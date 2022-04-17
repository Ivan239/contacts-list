import { NEW_ACCOUNT, DELETE_ACCOUNT } from './types';

export const newAccount = (user) => ({
  type: NEW_ACCOUNT,
  payload: user,
});

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});
