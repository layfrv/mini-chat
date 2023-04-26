import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/index';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
