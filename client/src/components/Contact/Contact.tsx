import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { deleteContact } from '../../redux/contacts/actions';
import store from '../../redux/store/store';
import styles from './Contact.module.sass';
import close from '../../assets/close.svg';
import edit from '../../assets/edit.svg';
import serverhost from '../../serverhost';
import EditContact from '../EditContact/EditContact';
import animation from './EditContactAnimation.module.sass';

type ContactProps = {
  id: string;
  name: string;
  phone: string;
};

function Contact({ id, name, phone }: ContactProps) {
  const dispatch = useDispatch();
  const [showEditContact, setShowEditContact] = useState<boolean>(false);
  const deleteItem = (): void => {
    const { account } = store.getState();
    const currentToken: string = account.data.accessToken;
    const uid: number = account.data.user.id;
    axios
      .delete(`${serverhost}/data/${uid}/${id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
      .then(() => {
        dispatch(deleteContact(id));
      })
      .then(() => {
        localStorage.setItem('contacts', JSON.stringify(store.getState().contacts));
        toast.success('Contact deleted');
      })
      .catch(() => {
        toast.error('Error occured. Try again or relogin');
      });
  };
  return (
    <div>
      <div className={styles.contact}>
        <div className={styles.text} id={styles.name}>
          <p className={styles.left}>Name: </p>
          <p className={styles.right}>{name}</p>
        </div>
        <div className={styles.text} id={styles.phone}>
          <p className={styles.left}>Phone: </p>
          <p className={styles.right}>{phone}</p>
        </div>
        <img src={close} alt="close" className={styles.close} onClick={() => deleteItem()} />
        <img
          src={edit}
          alt="edit"
          className={styles.edit}
          onClick={() => setShowEditContact(true)}
        />
      </div>
      <CSSTransition in={showEditContact} timeout={300} classNames={animation} unmountOnExit>
        <EditContact setShowEditContact={setShowEditContact} name={name} phone={phone} cid={id} />
      </CSSTransition>
    </div>
  );
}

export default Contact;
