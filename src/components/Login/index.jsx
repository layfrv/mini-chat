import React from 'react';
import styles from './login.module.scss';
import { auth } from '../../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { ReactComponent as Logo } from '../../assets/google_logo.svg';

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      GoogleAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

const Login = () => {
  return (
    <div className={styles.container}>
      <div onClick={signInWithGoogle} className={styles.wrapper}>
        <span className={styles.label}>Sign in with: </span>
        <div className={styles.btn}>
          <Logo className={styles.icon}></Logo>
          <span className={styles.buttonText}>Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
