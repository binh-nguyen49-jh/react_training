import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import Header from './components/Header/Header';
import waves from './waves.svg';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
          path='/'
          exact
        />
        <Route
          element={
            <AuthenticationPage>
              <SignUpForm />
            </AuthenticationPage>
          }
          path='/authentication/signup'></Route>
        <Route
          element={
            <AuthenticationPage>
              <LoginForm />
            </AuthenticationPage>
          }
          path='/authentication/login'></Route>

        <Route
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
          path='/profile'
        />
      </Routes>
      <div className='background'>
        <img src={waves} alt='waves background' />
        <div className='backgroundWater'></div>
      </div>
      <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />
    </>
  );
}

export default App;
