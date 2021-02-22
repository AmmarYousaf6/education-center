import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import {forgetPassword} from "../../actions/auth";
import Alert from './../layout/Alert';

const ForgetPassword = ({ setAlert, clearAlert, forgetPassword }) => {
    
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        clearAlert();
        console.log(formData);
        forgetPassword(formData);

    };

    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                    <Link to="/"><img src="assets/images/logo.png" alt=""  width="300" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container">
                        <div className="heading-bx left">
                            <h2 className="title-head">Forget <span>Password</span></h2>
                            <p>Login Your Account <Link to="/login">Click here</Link></p>
                        </div>	
                        <form className="contact-bx" onSubmit={e => onSubmit(e)}>
                            <div className="row placeani">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
                                            <label>Your Email Address</label>
                                            <input 
                                                name="email" 
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
                                <div className="col-lg-12 m-b30">
                                    <button name="submit" type="submit" value="Submit" className="btn button-md">Submit</button>
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


ForgetPassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, clearAlert, forgetPassword })(ForgetPassword);