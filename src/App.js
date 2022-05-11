import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/HOC/ProtectedRoute';
import Header from './components/Header/Header';
import waves from './waves.svg';
import LoginForm from './components/Forms/AuthForm/LoginForm';
import SignUpForm from './components/Forms/AuthForm/SignUpForm';
import { ToastContainer } from 'react-toastify';
import CreateProfilePage from './pages/CreateProfilePage/CreateProfilePage';
import './styles/index.scss';

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
          exact
          path='/authentication/signup'></Route>
        <Route
          element={
            <AuthenticationPage>
              <LoginForm />
            </AuthenticationPage>
          }
          exact
          path='/authentication/login'></Route>
        <Route
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
          path='/profile/:uid'
        />
        <Route
          element={
            <ProtectedRoute>
              <CreateProfilePage />
            </ProtectedRoute>
          }
          path='/create-profile'
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
