import React from 'react';
import ContactInt from '../../interfaces/contact';
import Contact from '../Contact/Contact';
import styles from './Contacts.module.sass';

type ContactsProps = {
  contacts: Array<ContactInt>;
};

function Contacts({ contacts }: ContactsProps) {
  return (
    <div className={styles.contacts}>
      {contacts.map((contact: ContactInt) => (
        <Contact id={contact.id} name={contact.name} phone={contact.phone} key={contact.id} />
      ))}
    </div>
  );
}

export default Contacts;
