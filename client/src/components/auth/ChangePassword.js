import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert, setAlert } from '../../actions/alert';
import { resetPassword } from '../../actions/auth';
import Alert from './../layout/Alert';

const ChangePassword = ({ login, clearAlert, isAuthenticated, match, setAlert, resetPassword }) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        userId: match.params.token,
    });

    const { password, confirmPassword, token } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        clearAlert();
        if (password !== confirmPassword) {
            setAlert('Password and Confirm Password fields does not match', 'danger');
        } else {
            resetPassword(formData);
        }
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
                                            <label>New Password</label>
                                            <input 
                                                name="password" 
                                                type="password" 
                                                required="" 
                                                className="form-control" 
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
                                                type="password" 
                                                required="" 
                                                className="form-control" 
                                                autoComplete="one-time-code"
                                                value={confirmPassword}
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
};

ChangePassword.propTypes = {
    clearAlert: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { resetPassword, clearAlert, setAlert })(ChangePassword);