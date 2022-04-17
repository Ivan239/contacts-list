import { useForm } from 'react-hook-form';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styles from './Register.module.sass';
import store from '../../redux/store/store';
import { newAccount } from '../../redux/account/actions';
import getContacts from '../../functions/getContacts';
import { loadContacts } from '../../redux/contacts/actions';
import serverhost from '../../serverhost';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: { [x: string]: string }): Promise<void> => {
    const postData: { email: string; password: string } = {
      email: data.Email,
      password: data.Password,
    };
    axios
      .post(`${serverhost}/users`, JSON.stringify(postData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        toast.success('Successfull registration!');
        store.dispatch(newAccount(response));
        localStorage.setItem('account', JSON.stringify(response));
        return getContacts();
      })
      .then((result) => {
        dispatch(loadContacts(result.data.data.slice(1)));
        localStorage.setItem('contacts', JSON.stringify(result.data.data.slice(1)));
      })
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        toast.error('Error occured. Server may be down');
      });
  };
  const checkErrors = (errorList: { [x: string]: string }): void => {
    if (errorList.Email) {
      toast.error('Email is required');
    } else if (errorList.Password) {
      toast.error('Password is required');
    }
  };
  const passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$';
  return (
    <div className={styles.reg}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        <p>E-mail:</p>
        <input
          type="email"
          placeholder="example@website.com"
          className={styles.field}
          id="Email"
          aria-invalid={errors.Email ? 'true' : 'false'}
          {...register('Email', { required: true })}
        />
        <p>Password:</p>
        <p className={styles.error}>
          Should contain at least 8 characters, 1 number, 1 lower and 1 uppercase letter
        </p>
        <input
          className={styles.field}
          type="password"
          placeholder="********"
          id="Password"
          aria-invalid={errors.Password ? 'true' : 'false'}
          pattern={passwordPattern}
          {...register('Password', { required: true })}
        />
        <div className={styles.enter}>
          <button className={styles.button} type="submit" onClick={() => checkErrors(errors)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
