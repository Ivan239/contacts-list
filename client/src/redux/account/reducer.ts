import { NEW_ACCOUNT, DELETE_ACCOUNT } from './types';

export default function reducer(state, action) {
  switch (action.type) {
    case NEW_ACCOUNT:
      return action.payload;
    case DELETE_ACCOUNT:
      return {};
    default:
      return state || {};
  }
}
