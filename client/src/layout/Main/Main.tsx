import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import Contacts from '../../components/Contacts/Contacts';
import NewContact from '../../components/NewContact/NewContact';
import ContactInt from '../../interfaces/contact';
import store from '../../redux/store/store';
import styles from './Main.module.sass';
import animation from './NewContactAnimation.module.sass';
import Search from '../../components/Search/Search';

function Main() {
  const [showNewContact, setShowNewContact] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const isAuth: boolean = Object.keys(store.getState().account).length !== 0;
  const contacts: Array<ContactInt> = useSelector((state: { contacts: Array<ContactInt> }) =>
    state.contacts.filter((contact) => contact.name.search(new RegExp(searchValue, 'i')) !== -1),
  );

  return (
    <div className={styles.main}>
      {isAuth ? (
        <div className={styles.contacts}>
          <Search setSearchValue={setSearchValue} />
          {contacts.length > 0 ? (
            <Contacts contacts={contacts} />
          ) : (
            <h1 className={styles.noconts}>You have no contacts</h1>
          )}
          <button
            type="button"
            className={styles.add}
            onClick={() => setShowNewContact(!showNewContact)}
          >
            Add contact
          </button>
          <CSSTransition in={showNewContact} timeout={300} classNames={animation} unmountOnExit>
            <NewContact setShowNewContact={setShowNewContact} />
          </CSSTransition>
        </div>
      ) : (
        <h1 className={styles.nonauth}>Authorize to view contacts</h1>
      )}
    </div>
  );
}

export default Main;
