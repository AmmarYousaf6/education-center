import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import ForgetPassword from "./ForgetPassword";
import Alert from './../layout/Alert';
import LinkedInPage from './LinkedInPage';
import GoogleSignup from './GoogleSignup';

const Login = ({ login, clearAlert, isAuthenticated, auth: {user} }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        clearAlert();
        login(email, password);
    };

    if (isAuthenticated && user) {
        if (user.user_type == null) {
            return <Redirect to="/profile-setup" />;
        }
        return <Redirect to="/" />;

    }

    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                    <Link to="/"><img src="https://res.cloudinary.com/home-tutor/image/upload/v1617753560/edu_tutor/default-monochrome_v6idag.svg" width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container">
                        <div className="heading-bx left">
                            <h2 className="title-head">Login to your <span>Account</span></h2>
                            <p style={{textAlign:'left'}}>Don't have an account? <Link to="/register">Create one here</Link></p>
                        </div>	
                        <form className="contact-bx" onSubmit={e => onSubmit(e)}>
                            <div className="row placeani">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input 
                                                name="email" 
                                                placeholder="Enter your email address"
                                                type="email" 
                                                required="" 
                                                className="form-control" 
                                                autoComplete="one-time-code"
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group"> 
                                            <input 
                                                name="password" 
                                                placeholder="Enter your password"
                                                type="password" 
                                                className="form-control" 
                                                required="" 
                                                autoComplete="one-time-code"
                                                value={password}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group form-forget">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <label className="custom-control-label" htmlFor="customControlAutosizing">Remember me</label>
                                        </div>
                                        <Link to="/forgetpassword" className="ml-auto">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="col-lg-12 m-b30">
                                    <button name="submit" type="submit" value="Submit" className="btn button-md">Login</button>
                                </div>
                                <div className="col-lg-12">
                                    <h6>Sign Up with Social media</h6>
                                    <div className="d-flex">
                                        <LinkedInPage />
                                        
                                        <GoogleSignup />
                                    </div>
                                    
                                   
                                </div>
                            </div>
                        </form>
                        <Alert />
                    </div>
                </div>
	        </div>
        </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { login, clearAlert })(Login);