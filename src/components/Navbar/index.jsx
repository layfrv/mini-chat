import * as React from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <nav>
        <h1>Chat</h1>
        {user ? (
          <button onClick={() => auth.signOut()} className='logout'>
            logout
          </button>
        ) : (
          <NavLink to={LOGIN_ROUTE}>
            <button className='login'>login</button>
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Navbar;