import React from 'react';
import './login.modules.css';
import { auth } from '../../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const Login = () => {
  return (
    <div className='container'>
      <div onClick={signInWithGoogle} id='gSignInWrapper'>
        <span class='label'>Sign in with: </span>
        <div id='customBtn' class='customGPlusSignIn'>
          <span class='icon'></span>
          <span class='buttonText'>Google</span>
        </div>
      </div>
    </div>
  );
};
