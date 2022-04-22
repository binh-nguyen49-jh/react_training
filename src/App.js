import './App.css';
import {Routes, Route} from 'react-router-dom';
import AuthenticationPage from './components/AuthenticationPage/AuthenticationPage';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route element = { <AuthenticationPage />} path='/' />
      <Route element = { <HomePage />} path='/homepage' />
    </Routes>
    
  );
}

export default App;
