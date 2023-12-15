import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/index';
import AppRouter from './components/AppRouter';
import React, { FC } from 'react';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
