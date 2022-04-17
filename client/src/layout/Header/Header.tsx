import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAccount } from '../../redux/account/actions';
import { deleteContacts } from '../../redux/contacts/actions';
import store from '../../redux/store/store';
import styles from './Header.module.sass';

function Header() {
  const navigate = useNavigate();
  const handleLogout = (): void => {
    store.dispatch(deleteAccount());
    localStorage.clear();
    toast.success('Logout successfull!');
    store.dispatch(deleteContacts());
    navigate('/login');
  };
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    setIsAuth(!!localStorage.getItem('account'));
  });

  return (
    <div className={styles.header}>
      <NavLink to="/" className={styles.title}>
        <h2>Contacts</h2>
      </NavLink>
      {!isAuth ? (
        <div className={styles.buttons}>
          <NavLink to="/login" className={styles.button} id={styles.login}>
            Login
          </NavLink>
          <NavLink to="/register" className={styles.button} id={styles.register}>
            Register
          </NavLink>
        </div>
      ) : (
        <div className={styles.buttons}>
          <div onClick={handleLogout} className={styles.button}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
