import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

const ProfileForm = ({ auth: { user, isAuthenticated, loading } } ) => {
    return (
        <Fragment>  
            <Navbar />

            <div class="page-content bg-white">

                <div class="content-block">
            
			        <div class="section-area section-sp1">
                        <div class="container">
					        <div class="row">

                                <div class="col-lg-12 col-md-8 col-sm-12">

                                    <div class="tab-pane" id="edit-profile">
                                        <div class="profile-head">
                                            <h3 className=" text-center">Update Profile</h3>
                                        </div>
                                        <form class="edit-profile">
                                            <div class="">
                                                <div class="form-group row">
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                        <h3>1. Personal Details</h3>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Full Name</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="Mark Andre" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Occupation</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="CTO" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Company Name</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="EduChamp" />
                                                        <span class="help">If you want your invoices addressed to a company. Leave blank to use your full name.</span>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Phone No.</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="+120 012345 6789" />
                                                    </div>
                                                </div>
                                                
                                                <div class="seperator"></div>
                                                
                                                <div class="form-group row">
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                        <h3>2. Address</h3>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Address</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="5-S2-20 Dummy City, UK" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">City</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="US" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">State</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="California" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Postcode</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="000702" />
                                                    </div>
                                                </div>

                                                <div class="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>

                                                <div class="form-group row">
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                        <h3 class="m-form__section">3. Social Links</h3>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Linkedin</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="www.linkedin.com" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Facebook</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="www.facebook.com" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Twitter</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="www.twitter.com" />
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">Instagram</label>
                                                    <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                        <input class="form-control" type="text" value="www.instagram.com" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="">
                                                <div class="">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-3 col-md-3 col-lg-2">
                                                        </div>
                                                        <div class="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            <button type="reset" class="btn">Save changes</button>
                                                            <button type="reset" class="btn-secondry">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

ProfileForm.propTypes = {
    auth: PropTypes.object.isRequired,

  };

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps, null)(ProfileForm);
