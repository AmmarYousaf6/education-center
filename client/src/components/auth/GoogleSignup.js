import { render } from '@testing-library/react';
import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { socialLogin } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from './../layout/Alert';
// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken';

const clientId = '466175062837-shljfphqt7dg4k8rjl0ui8jkqfshijh3.apps.googleusercontent.com';

const GoogleSignup = ({ socialLogin }) => {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    if(res.profileObj) {
      socialLogin(res.profileObj.email, res.profileObj.name, 'male', res.profileObj.imageUrl);
    }
    
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
            <a onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn flex-fill m-l5 google-plus" href="#"><i className="fa fa-google"></i>Google</a>
        )}
        buttonText="Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={false}
      />
    </div>
  );
}

GoogleSignup.propTypes = {
  socialLogin: PropTypes.func.isRequired,
};

export default connect(null, {socialLogin })(GoogleSignup);
  