import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/Forms/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm';
import withFirebaseAuth from '../../components/HOC/withFirebaseAuth';
import './AuthenticationPage.scss';
import PropTypes from 'prop-types';

class AuthenticationPage extends Component {
  static propTypes = {
    user: PropTypes.any,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: false,
    };
  }

  toggleState = () => {
    this.setState((prevState) => ({
      isSigningUp: !prevState.isSigningUp,
    }));
  };

  render() {
    return this.props.user ? (
      <Navigate to='/'></Navigate>
    ) : (
      <main>
        <div className='container'>
          <div className='logo'>
            <img src='journeyh.png' alt='' />
            <h1>journey horizon</h1>
          </div>
          <div className='formContainer'>
            {this.state.isSigningUp ? (
              <SignUpForm toggleState={this.toggleState} />
            ) : (
              <LoginForm toggleState={this.toggleState} />
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default withFirebaseAuth(React.memo(AuthenticationPage));
