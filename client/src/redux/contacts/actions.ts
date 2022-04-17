import { NEW_CONTACT, DELETE_CONTACT, LOAD_CONTACTS, DELETE_CONTACTS, EDIT_CONTACT } from './types';

export const newContact = (contact) => ({
  type: NEW_CONTACT,
  payload: contact,
});

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
});

export const loadContacts = (contacts) => ({
  type: LOAD_CONTACTS,
  payload: contacts,
});

export const deleteContacts = () => ({
  type: DELETE_CONTACTS,
});

export const editContact = (editedContact) => ({
  type: EDIT_CONTACT,
  payload: editedContact,
});
