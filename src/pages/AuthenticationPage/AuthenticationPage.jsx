import React, { PureComponent } from 'react';
import { Navigate } from 'react-router-dom';
import withFirebaseAuth from '../../components/HOC/withFirebaseAuth';
import './AuthenticationPage.scss';
import PropTypes from 'prop-types';

class AuthenticationPage extends PureComponent {
  static propTypes = {
    user: PropTypes.any,
  };

  render() {
    return this.props.user ? (
      <Navigate to='/'></Navigate>
    ) : (
      <main>
        <div className='container'>
          <div className='logo'>
            <img src='/journeyh.png' alt='' />
            <h1>journey horizon</h1>
          </div>
          <div className='formContainer'>{this.props.children}</div>
        </div>
      </main>
    );
  }
}

export default withFirebaseAuth(AuthenticationPage);
