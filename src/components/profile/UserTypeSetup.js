import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import Alert from './../layout/Alert';

const UserTypeSetup = ({ login, clearAlert, isAuthenticated, auth: {user} }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const selectType = (type) => {
        console.log(type);
    }

    const onSubmit = e => {
        e.preventDefault();
        clearAlert();
        login(email, password);
    };

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
                            <h2 className="title-head text-center title-head-text-cust">Tell Us Something <span>About Your Self</span></h2>
                            
                        </div>	
                        <form className="contact-bx" onSubmit={e => onSubmit(e)}>
                            <div className="row placeani">
                                <div class="col-sm-12 col-md-6 col-lg-6 m-b40" onClick={() => selectType('teacher')}>
                                    <div class="pricingtable-wrapper">
                                        <div class="pricingtable-inner">
                                            <div class="pricingtable-main"> 
                                                <div class="pricingtable-price"> 
                                                    <span class="pricingtable-bx">Teacher</span>
                                                    <span class="pricingtable-type-cust">
                                                        <img src="assets/images/testimonials/pic1.jpg" width="100" alt="" className="border-radius-circle"/>
                                                    </span>
                                                </div>
                                                <div class="pricingtable-title">
                                                    
                                                    <p>I am a Teacher looking for Teaching opportunities</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 col-lg-6 m-b40" onClick={() => selectType('parent')}>
                                    <div class="pricingtable-wrapper">
                                        <div class="pricingtable-inner">
                                            <div class="pricingtable-main"> 
                                                <div class="pricingtable-price"> 
                                                    <span class="pricingtable-bx">Parent</span>
                                                    <span class="pricingtable-type-cust">
                                                    <img src="assets/images/testimonials/pic2.jpg" width="100" alt="" className="border-radius-circle"/>
                                                    </span>
                                                </div>
                                                <div class="pricingtable-title">
                                                    
                                                    <p>I am a parent looking for Teacher for my children</p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            
                            </div>
                            <a href="#" class="btn button-md assign-right"><i class="fa fa-arrow-right"></i> Submit</a>
                            
                        </form>
                        <Alert />
                    </div>
                </div>
	        </div>
        </Fragment>
    );
}

UserTypeSetup.propTypes = {
    login: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { login, clearAlert })(UserTypeSetup);