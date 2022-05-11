import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_URI } from '../../config/constants';
import { useAuth } from '../../hooks/authentication';
import Avatar from '../Avatar/Avatar';
import HomeIcon from '../SVGs/HomeIcon.svg';
import UserIcon from '../SVGs/UserIcon.svg';
import LogoutIcon from '../SVGs/LogoutIcon.svg';
import './Header.scss';

function Header(props) {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logOut();
    navigate('/authentication/login');
  }, [navigate, logOut]);

  return (
    <header>
      <div className='container'>
        <h1 className='logo'>
          <Link to={'/'}>
            <img src={LOGO_URI} alt='journey horizon logo' />
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link className='navItem' to={'/'}>
                <img src={HomeIcon} alt='homepage icon' />
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link className='navItem' to={`/profile/${user.uid}`}>
                    <Avatar />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    className='navItem'
                    to={'/authentication/login'}>
                    <img src={LogoutIcon} alt='logout icon' />
                    <span className='topbarElement'>Logout</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <p className='navItem '>
                  <img src={UserIcon} alt='authenticate user icon' />
                  <Link className='topbarElement' to={'/authentication/signup'}>
                    Signup
                  </Link>
                  <span className='topbarElement'>{' / '}</span>
                  <Link className='topbarElement' to={'/authentication/login'}>
                    Login
                  </Link>
                </p>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default React.memo(Header);
