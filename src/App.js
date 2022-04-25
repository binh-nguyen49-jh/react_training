import './App.css';
import {Routes, Route} from 'react-router-dom';
import AuthenticationPage from './components/AuthenticationPage/AuthenticationPage';
import HomePage from './components/HomePage/HomePage';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
  return (
    <Routes>
      <Route element = { 
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } path='/' exact/>
      <Route element = { <AuthenticationPage />} path='/authentication' />
      
      <Route element = { 
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } path='/profile' />
      
    </Routes>
    
  );
}

export default App;
