import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Main from './components/search/Main';
import TeacherProfile from './components/profile/TeacherProfile';
import ChangePassword from "./components/auth/ChangePassword";
import UserTypeSetup from './components/profile/UserTypeSetup';
import ProfileForm from './components/profile/ProfileForm';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
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
              <Route exact path="/" component={Index} />
              <Route exact path="/linkedin" component={LinkedInPopUp} />
              <Route exact path="/search" component={Main} />
              <Route exact path="/profile" component={TeacherProfile} />

              <PrivateRoute exact path="/profile-setup" component={UserTypeSetup} />
              <PrivateRoute exact path="/profile/update" component={ProfileForm} />
              
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
