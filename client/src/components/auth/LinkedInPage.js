import React, { Component } from 'react';

import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
const clientId = process.env.REACT_APP_LINKED_IN_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_LINKED_IN_REDIRECT_URL;
const oAuth = process.env.REACT_APP_LINKED_IN_O_AUTH_URL;
const scope = process.env.REACT_APP_LINKED_IN_SCOPE;
const state = process.env.REACT_APP_LINKED_IN_STATE;

class LinkedInPage extends Component {
  state = {
    code: '',
    errorMessage: '',
  };


  handleSuccess = (data) => {
    this.setState({
      code: data.code,
      errorMessage: '',
    });
  }

  handleFailure = (error) => {
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }
  
  render() {
    const { code, errorMessage } = this.state;
    return (
      <div>
        {/* <LinkedIn
          clientId= {clientId}
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
          redirectUri={redirectUrl}
          oauthUrl={oAuth}
          scope={scope}
          state={state}
        > */}
        <a href="https://hometutorpk.herokuapp.com/auth/linkedin">
          <img src={linkedin} alt="Log in with Linked In" style={{ maxWidth: '180px' ,height : '39px' }} />
        </a>
        {/* </LinkedIn> */}
        
      </div>
    );
  }
}

export default LinkedInPage;