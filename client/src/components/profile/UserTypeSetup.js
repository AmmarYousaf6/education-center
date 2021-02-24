import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import Alert from './../layout/Alert';

import { setUserType } from '../../actions/profile';

const UserTypeSetup = ({ login, clearAlert, isAuthenticated, auth: {user}, setUserType }) => {

    const selectType = (type) => {
        setUserType(type);
    }

    if (!isAuthenticated) {

        return <Redirect to="/login" />;

    }

    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                    <Link to="/"><img src="assets/images/logo.png" width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container account-container-custom">
                        <div className="heading-bx left">
                            <h2 className="title-head text-center title-head-text-cust">I am a</h2>
                            
                        </div>	
                        <form className="contact-bx">
                            <div className="row placeani">
                                <div className="col-sm-12 col-md-6 col-lg-6 m-b40" onClick={() => selectType('teacher')}>
                                    <div className="pricingtable-wrapper">
                                        <div className="pricingtable-inner">
                                            <div className="pricingtable-main"> 
                                                <div className="pricingtable-price"> 
                                                    <span className="pricingtable-bx">Teacher</span>
                                                    <span className="pricingtable-type-cust">
                                                        <img src="assets/images/testimonials/pic1.jpg" width="100" alt="" className="border-radius-circle"/>
                                                    </span>
                                                </div>
                                                <div className="pricingtable-title">
                                                    
                                                    <p>I am a Teacher looking for Teaching opportunities</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 m-b40" onClick={() => selectType('parent')}>
                                    <div className="pricingtable-wrapper">
                                        <div className="pricingtable-inner">
                                            <div className="pricingtable-main"> 
                                                <div className="pricingtable-price"> 
                                                    <span className="pricingtable-bx">Parent</span>
                                                    <span className="pricingtable-type-cust">
                                                    <img src="assets/images/testimonials/pic2.jpg" width="100" alt="" className="border-radius-circle"/>
                                                    </span>
                                                </div>
                                                <div className="pricingtable-title">
                                                    
                                                    <p>I am a parent looking for Teacher for my children</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            
                            </div>
                            <Link to="/profile-setup-info" className="btn button-md assign-right"><i className="fa fa-arrow-right"></i> Next</Link>
                            
                        </form>
                        <Alert />
                    </div>
                </div>
	        </div>
        </Fragment>
    );
}

UserTypeSetup.propTypes = {
    
    clearAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { clearAlert, setUserType })(UserTypeSetup);