import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './Loader';

const AppRouter = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route path={path} key={path} element={Component} exact={true} />
      ))}
      <Route path='*' element={<Navigate to={CHAT_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} key={path} element={Component} exact={true} />
      ))}
      <Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;
