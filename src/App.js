import './App.css';
import {Routes, Route} from 'react-router-dom';
import AuthenticationPage from './components/AuthenticationPage/AuthenticationPage';
import HomePage from './components/HomePage/HomePage';
import ProtectedRoute from './components/HOC/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element = { <AuthenticationPage />} path='/authentication' />
      <Route element = { 
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } path='/' />
      
    </Routes>
    
  );
}

export default App;
