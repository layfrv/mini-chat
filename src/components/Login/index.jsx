import React from 'react';
import './login.modules.css';
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
    <div className='container'>
      <div onClick={signInWithGoogle} className='g-wrapper'>
        <span class='label'>Sign in with: </span>
        <div className='g-btn'>
          <Logo className='icon'></Logo>
          <span className='buttonText'>Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
