import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  signIn, 
  signInWithGoogle, 
  signInWithFacebook, 
  setAuthStatus, 
  isAuthenticating as authenticating
} from '../../actions/authActions';
import CircularProgress from '../../components/ui/CircularProgress';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorField, setErrorField] = useState({});
  const [buttonClicked, setClicked] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setAuthStatus(null));
      dispatch(authenticating(false));
    }
  }, []);

  const { authStatus, isAuthenticating } = useSelector(state => ({
    authStatus: state.app.authStatus,
    isAuthenticating: state.app.isAuthenticating
  }));

  const onEmailInput = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    if (val === '') {
      setErrorField({ ...errorField, email: 'Email is required' });
    } else if (!regex.test(val)) {
      setErrorField({ ...errorField, email: 'Email is invalid' });
    } else {
      setEmail(val);
      setErrorField({ ...errorField, email: '' });
    }
  };

  const onPasswordInput = (e) => {
    const val = e.target.value.trim();

    if (val === '') {
      setErrorField({ ...errorField, password: 'Password is required' });
    } else {
      setPassword(val);
      setErrorField({ ...errorField, password: '' });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const noError = (!!email && !!password) && !errorField.email && !errorField.password;

    if (noError) {
      dispatch(signIn(email, password));
      setClicked('signin');
    }
  };

  const onSignUp = () => {
    props.history.push('/signup');
  };
  
  const onSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
    setClicked('google');
  };

  const onSignInWithFacebook = () => {
    dispatch(signInWithFacebook());
    setClicked('facebook');
  };

  const errorClassName = (field) => {
    return errorField[field] ? 'input-error' : '';
  };

  return (
    <div className="signin-content">
      {authStatus && (
        <h5 className={`text-center ${authStatus.success ? 'toast-success' : 'toast-error'}`}>
          {authStatus.message}
        </h5>
      )}
      <div className={`signin ${authStatus && (!authStatus.success && 'input-error')}`}>
        <div className="signin-main">
          <h3>Sign in to Salinaka</h3>
          <br/>
          <div className="signin-wrapper">
            {errorField.auth && <span className="input-message">{errorField.auth}</span>}
            <form onSubmit={onSubmitForm}>
              <div className="signin-field">
                {errorField.email ? <span className="input-message">{errorField.email}</span> : (
                  <span className="d-block padding-s">Email</span>
                )}
                <input 
                    className={`input-form d-block ${errorClassName('email')}`}
                    onChange={onEmailInput}
                    placeholder="test@example.com"
                    readOnly={isAuthenticating}
                    type="email"
                />
              </div>
              <div className="signin-field">
                {errorField.password ? <span className="input-message">{errorField.password}</span> : (
                  <span className="d-block padding-s">Password</span>
                )}
                <input 
                    className={`input-form d-block ${errorClassName('password')}`}
                    onChange={onPasswordInput}
                    placeholder="Your Password"
                    readOnly={isAuthenticating}
                    type="password"
                />
              </div>
              <br/>
              <div className="signin-field signin-action">
                <Link style={{textDecoration: 'underline'}} to="/forgot_password">
                  <span>Forgot password?</span>
                </Link>
                <button
                    className="button signin-button"
                    disabled={isAuthenticating}
                    type="submit"
                >
                  <CircularProgress 
                      theme="light" 
                      visible={isAuthenticating && buttonClicked === 'signin'} 
                  />
                  {isAuthenticating && buttonClicked === 'signin' ? 'Signing In' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="signin-divider">
          <h6>OR</h6>
        </div>
        <div className="signin-provider">
          <button
              className="button signin-provider-button provider-facebook"
              disabled={isAuthenticating}
              onClick={onSignInWithFacebook}
          >
            <CircularProgress 
                theme="light" 
                visible={isAuthenticating && buttonClicked === 'facebook'} 
            />
            Sign in with Facebook
          </button>
          <button
              className="button signin-provider-button provider-google"
              disabled={isAuthenticating}
              onClick={onSignInWithGoogle}
          >
            <CircularProgress 
                theme="dark" 
                visible={isAuthenticating && buttonClicked === 'google'} 
            />
            Sign in with Google
          </button>
        </div>
      </div>
      <div className="signin-message">
        <span className="signin-info">
          <strong>Don't have an account?</strong>
        </span>
        <button 
            className="button button-small button-border button-border-gray"
            disabled={isAuthenticating}
            onClick={onSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
