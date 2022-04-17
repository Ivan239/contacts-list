import { combineReducers } from 'redux';
import account from './account/reducer';
import contacts from './contacts/reducer';

export default combineReducers({
  account,
  contacts,
});
