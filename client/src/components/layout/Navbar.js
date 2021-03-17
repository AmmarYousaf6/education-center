import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {

    const logoutUser = () => {
        logout();
      }

    return (
        <Fragment>  
            <header className="header rs-nav">
                <div className="top-bar">
                    <div className="container">
                        <div className="row d-flex justify-content-between">
                            <div className="topbar-left">
                                <ul>
                                    <li><a href="#!"><i className="fa fa-question-circle"></i>Ask a Question</a></li>
                                    <li><a href="#!"><i className="fa fa-envelope-o"></i>support@hometutor.pk</a></li>
                                </ul>
                            </div>
                            <div className="topbar-right">
                                <ul>
                                    {!isAuthenticated && (
                                        <Fragment>
                                            <li><Link to="/login">Login</Link></li>
                                            <li><Link to="/register">Register</Link></li>
                                        </Fragment>
                                    )}
                                    {isAuthenticated && (
                                        <Fragment>
                                            <li><span className="cursor-pointer" onClick={() => logoutUser()}>Logout</span></li>
                                        </Fragment>
                                    )}
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky-header navbar-expand-lg">
                    <div className="menu-bar clearfix">
                        <div className="container clearfix">
                            
                            <div className="menu-logo">
                                <Link to="/"><img src="assets/images/logo.png" alt="" /></Link>
                            </div>
                            
                            <button className="navbar-toggler collapsed menuicon justify-content-end" 
                                type="button" data-toggle="collapse" data-target="#menuDropdown" 
                                aria-controls="menuDropdown" aria-expanded="false" 
                                aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            
                            <div className="secondary-menu">
                                <div className="secondary-inner">
                                    <ul>
                                        <li><a href="#!" className="btn-link"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#!" className="btn-link"><i className="fa fa-google-plus"></i></a></li>
                                        <li><a href="#!" className="btn-link"><i className="fa fa-linkedin"></i></a></li>
                                        
                                        <li className="search-btn">
                                            <button id="quik-search-btn" type="button" className="btn-link">
                                                <i className=""></i>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="nav-search-bar">
                                <form action="#">
                                    <input name="search" defaultValue="" type="text" className="form-control" placeholder="Type to search" />
                                    <span><i className="ti-search"></i></span>
                                </form>
                                <span id="search-remove"><i className="ti-close"></i></span>
                            </div>
                            
                            <div className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
                                <div className="menu-logo">
                                    <a href="index.html"><img src="assets/images/logo.png" alt="" /></a>
                                </div>
                                <ul className="nav navbar-nav">	
                                    <li className="active"><Link to="/">Home</Link></li>
                                    <li ><a href="#!">About</a></li>
                                    
                                    <li className="add-mega-menu"><a href="#!">How it Works <i className="fa fa-chevron-down"></i></a>
                                        <ul className="sub-menu add-menu">
                                            <li className="add-menu-left">
                                                <h5 className="menu-adv-title">T&C For Tutors</h5>
                                                <ul>
                                                    <li><a href="#">Rules & Regulations </a></li>
                                                    <li><a href="#">Other</a></li>
                                                    
                                                </ul>
                                            </li>
                                            <li className="add-menu-left">
                                                <h5 className="menu-adv-title">T&C For Parents</h5>
                                                <ul>
                                                    <li><a href="#">Rules & Regulations </a></li>
                                                    <li><a href="#">Other</a></li>
                                                    
                                                </ul>
                                            </li>
                                            <li className="add-menu-right">
                                                <img src="assets/images/adv/pic1.jpg" alt=""/>
                                            </li>
                                        </ul>
                                    </li>
                                    <li ><Link to="/">Online Tutors</Link></li>
                                    <li ><Link to="/contact">Contact Us</Link></li>
                                    {isAuthenticated && (
                                        <li><a href="#!">{user.name} <i className="fa fa-chevron-down"></i></a>
                                        <ul className="sub-menu">
                                            <li><Link to="/profile/update/basic">Profile</Link></li>
                                            <li><a href="#">Option</a></li>
                                            <li><Link to="/mailbox" >Mailbox</Link></li>
                                        </ul>
                                    </li>
                                    )}
                                </ul>
                                <div className="nav-social-link">
                                    <a href="#!"><i className="fa fa-facebook"></i></a>
                                    <a href="#!"><i className="fa fa-google-plus"></i></a>
                                    <a href="#!"><i className="fa fa-linkedin"></i></a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
      );
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { logout })(Navbar);