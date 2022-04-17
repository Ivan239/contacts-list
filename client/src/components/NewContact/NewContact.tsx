import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { newContact } from '../../redux/contacts/actions';
import store from '../../redux/store/store';
import styles from './NewContact.module.sass';
import close from '../../assets/close.svg';
import newId from '../../functions/newId';
import serverhost from '../../serverhost';

type NewContactProps = {
  setShowNewContact: (show: boolean) => void;
};

function NewContact({ setShowNewContact }: NewContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: { [x: string]: string }): Promise<void> => {
    const { account } = store.getState(); // todo account type
    const currentToken: string = account.data.accessToken;
    const uid: number = account.data.user.id;
    const newAccount = {
      name: data.Name,
      phone: data.Phone,
      userId: uid,
      id: newId(),
    };
    axios
      .post(`${serverhost}/data/${uid}`, JSON.stringify(newAccount), {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        store.dispatch(newContact(newAccount));
        localStorage.setItem('contacts', JSON.stringify(store.getState().contacts));
      })
      .then(() => {
        toast.success('Account added');
        setShowNewContact(false);
      })
      .catch(() => {
        toast.error('Error occured. Please try again or relogin');
      });
  };
  const checkErrors = (errorList: { [x: string]: string }): void => {
    if (errorList.Name) {
      toast.error('Name is required');
    } else if (errorList.Phone) {
      toast.error('Phone is required');
    }
  };
  return (
    <div className={styles.modal} onClick={() => setShowNewContact(false)}>
      <div className={styles.newcontact} onClick={(e) => e.stopPropagation()}>
        <img
          src={close}
          alt="close"
          className={styles.close}
          onClick={() => setShowNewContact(false)}
        />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>New Contact</h2>
          <p>Name:</p>
          <input
            type="text"
            placeholder="Ivan Ivanov"
            className={styles.field}
            id="Name"
            aria-invalid={errors.Name ? 'true' : 'false'}
            {...register('Name', { required: true })}
          />
          <p>Phone:</p>
          <input
            className={styles.field}
            type="tel"
            placeholder="+79810001122"
            id="Phone"
            aria-invalid={errors.Phone ? 'true' : 'false'}
            {...register('Phone', { required: true })}
          />
          <div className={styles.enter}>
            <button className={styles.button} type="submit" onClick={() => checkErrors(errors)}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewContact;
