import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import withFirebaseAuth from '../../components/HOC/withFirebaseAuth';
import './AuthenticationPage.scss';
import PropTypes from 'prop-types';
import { LOGO_URI } from '../../config/constants';
import withLocation from '../../components/HOC/withLocation';

class AuthenticationPage extends PureComponent {
  static propTypes = {
    user: PropTypes.any,
  };

  render() {
    const { user, children, redirectUrl } = this.props;
    return user ? (
      <Navigate to={redirectUrl ? redirectUrl : ''}></Navigate>
    ) : (
      <main>
        <div className='container'>
          <div className='logo'>
            <img src={LOGO_URI} alt="journey horizon's logo " />
            <h1>journey horizon</h1>
          </div>
          <div className='formContainer'>{children}</div>
        </div>
      </main>
    );
  }
}

export default withLocation(withFirebaseAuth(AuthenticationPage));
