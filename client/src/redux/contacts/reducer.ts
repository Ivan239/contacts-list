import { NEW_CONTACT, DELETE_CONTACT, LOAD_CONTACTS, DELETE_CONTACTS, EDIT_CONTACT } from './types';

const editing = (state, payload) => {
  const newState = [...state];
  const contactIndex = newState.findIndex((obj) => obj.id === payload.id);
  newState[contactIndex] = payload;
  return newState;
};

export default function reducer(state, action) {
  switch (action.type) {
    case LOAD_CONTACTS:
      return action.payload;
    case DELETE_CONTACTS:
      return [];
    case NEW_CONTACT:
      if (!state) {
        return [action.payload];
      }
      return [...state, action.payload];
    case DELETE_CONTACT:
      if (!state) {
        return state;
      }
      return state.filter((contact) => contact.id !== action.payload);
    case EDIT_CONTACT:
      return editing(state, action.payload);
    default:
      return state || [];
  }
}
