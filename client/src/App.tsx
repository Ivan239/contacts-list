import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Header from './layout/Header/Header';
import Main from './layout/Main/Main';
import Footer from './layout/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';
import styles from './App.module.sass';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store/store';
import { newAccount } from './redux/account/actions';
import { loadContacts } from './redux/contacts/actions';

function App() {
  useEffect(() => {
    if (localStorage.getItem('account')) {
      store.dispatch(newAccount(JSON.parse(localStorage.getItem('account'))));
    }
    if (localStorage.getItem('contacts')) {
      store.dispatch(loadContacts(JSON.parse(localStorage.getItem('contacts'))));
    }
  });

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Provider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2600}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
