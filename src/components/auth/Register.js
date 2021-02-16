import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Logout from './Logout';
import GoogleSignup from './GoogleSignup';
import LinkedInPage from './LinkedInPage';
import { register } from '../../actions/auth';
import { setAlert, clearAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import Alert from './../layout/Alert';

const Register = ({ setAlert, clearAlert, register, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        type: 'manual'
    });

    const {
        name, email, password, confirmPassword, gender
    } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        clearAlert();
        if (password !== confirmPassword) {
          setAlert('Password and Confirm Password fields does not match', 'danger');
        } else {
          register(formData);
        }
    };

    const validate = () => {
        let errors = {};
        if (password !== confirmPassword) {
          errors["password"] = "Please and confirm password didn't match";
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                <Link to="/"><img src="assets/images/logo.png"  width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container">
                        <div className="heading-bx left">
                            <h2 className="title-head">Sign Up <span>Now</span></h2>
                            <p>Login Your Account <Link to="/login">Click here</Link></p>
                        </div>	
                        <form className="contact-bx" onSubmit={e => onSubmit(e)}>
                            <div className="row placeani">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <label>Full Name</label>
                                            <input 
                                                name="name" 
                                                placeholder="Enter your full name"
                                                type="text" 
                                                required="" 
                                                className="form-control" 
                                                autoComplete="one-time-code"
                                                value={name}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <label>Email Address</label>
                                            <input 
                                                name="email" 
                                                placeholder="Enter your email address"
                                                type="email" 
                                                required="" 
                                                className="form-control mb-2" 
                                                autoComplete="one-time-code"
                                                value={email}
                                                onChange={e => onChange(e)}
                                            />
                                            <span class="help span-help">A confirmation email will be sent to the address you provide above for account activation</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group"> 
                                            <label>Password</label>
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
                                    <div className="form-group">
                                        <div className="input-group"> 
                                            <label>Confirm Password</label>
                                            <input 
                                                name="confirmPassword" 
                                                placeholder="Enter your confirm password"
                                                type="password" 
                                                className="form-control" 
                                                required="" 
                                                autoComplete="one-time-code"
                                                value={confirmPassword}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group"> 
                                        <label>Select Gender</label>
                                            <select 
                                                className="form-control" 
                                                placeholder="Select Gender"
                                                value={gender}
                                                onChange={e => onChange(e)}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <input type="checkbox" /><span className="terms-condit">I Accept Terms and Conditions</span>
                                </div>

                                <div className="col-lg-12 m-b30 mt-5">
                                    <button name="submit" type="submit" value="Submit" className="btn button-md">Sign Up</button>
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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { setAlert, clearAlert, register })(Register);
  