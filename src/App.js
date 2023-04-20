import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar/index';
import { AppRouter } from './components/AppRouter';
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader } from './components/Loader';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
