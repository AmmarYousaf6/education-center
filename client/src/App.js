import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router , Route, Switch   } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Index from './components/home/Index';
import ForgetPassword from './components/auth/ForgetPassword';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

import PrivateRoute from './routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Works from './components/howitworks/Works';
import Main from './components/search/Main';
import TeacherProfile from './components/profile/TeacherProfile';
import ChangePassword from "./components/auth/ChangePassword";
import UserTypeSetup from './components/profile/UserTypeSetup';
import ProfileForm from './components/parent_profile/ProfileForm';
import BasicParentProfileSetup from './components/parent_profile/BasicProfileSetupForParent';
import ActivateAccount from './components/activate/activate';

import BasicTeacherProfileSetup from './components/profile/BasicProfileSetupForTeacher';
import MailBox from './components/mailbox/mailbox';
import SocialLogin from './components/sociallogin/handleLogin';

import TermsAndConditions from './components/termsAndCondtions/conditions';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Router >
        <Fragment>
          {/*<Navbar />
          <Route exact path="/" component={Landing} />*/} 

          <section className="">
          
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/reset-password/:token" component={ChangePassword} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgetpassword" component={ForgetPassword} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/about" component={About} />
              <Route exact path="/how-it-works" component={Works} />
              <Route exact path="/" component={Index}  />
              <Route exact path="/linkedin" component={LinkedInPopUp} />
              <Route exact path="/search" component={Main} />
              <Route exact path="/profile/details/*" component={TeacherProfile} />
              <Route exact path="/profile/inbox" component={TeacherProfile} />
              <Route exact path="/activate/*" component={ActivateAccount} />
              <Route exact path="/success-page/*" component={SocialLogin} />
              <Route exact path="/conditions/*" component={TermsAndConditions} />
              
              <PrivateRoute exact path="/profile-setup-info-teacher" component={BasicTeacherProfileSetup} />
              <PrivateRoute exact path="/profile-setup-info-parent" component={BasicParentProfileSetup} />
              <PrivateRoute exact path="/profile-setup" component={UserTypeSetup} />
              <PrivateRoute exact path="/profile/update/*" component={ProfileForm} />  
              <PrivateRoute exact path="/mailbox" component={MailBox} />
  
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
