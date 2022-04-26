import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';
import AuthenticationPage from './components/AuthenticationPage/AuthenticationPage';
import HomePage from './components/HomePage/HomePage';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Header from './components/Header/Header';
import waves from "./waves.svg";

function App() {
  return (
    <>
    <Header />
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
    <div className="background">
      <img src={waves} alt="waves background" />
      <div className="background__water"></div>
    </div>
    </>
  );
}

export default App;
