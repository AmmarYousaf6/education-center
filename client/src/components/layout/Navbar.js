import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { user, isAuthenticated, loading , notifications }, logout }) => {
    const history = useHistory(); 
    const logoutUser = () => {
        logout();
      }
      useEffect(()=>{
        if(user && user.user_type == null){
            history.push('/profile-setup');
        }
      },[user]);
      const openMailClient = () => {
        window.location.href = "mailto:admin@zubnee.com?subject=Subject&body=message%20goes%20here";
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
                                    <li><a href="#!" onClick={()=>openMailClient()}><i className="fa fa-envelope-o"></i>admin@zubnee.com</a></li>
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
                                <Link to="/"><img src="https://res.cloudinary.com/home-tutor/image/upload/v1617753560/edu_tutor/default-monochrome_v6idag.svg" alt="" /></Link>
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
                                    <a href="index.html"><img src="https://res.cloudinary.com/home-tutor/image/upload/v1617753560/edu_tutor/default-monochrome_v6idag.svg" alt="" /></a>
                                </div>
                                <ul className="nav navbar-nav">	
                                    <li className="active"><Link to="/">Home</Link></li>
                                    <li ><Link to="/about">About</Link></li>
                                    <li className="add-mega-menu">
                                        {/* <a href="javascript:;"> */}
                                        <Link to="/how-it-works">
                                            How it Works
                                            <i className="fa fa-chevron-down"></i>
                                        </Link>
                                        {/* </a> */}
                                        <ul className="sub-menu add-menu">
                                            <li className="add-menu-left">
                                                <ul>
                                                    <li><a href="#">T&C For Tutors</a></li>
                                                    <li><a href="#">T&C For Parents</a></li>
                                                </ul>
                                            </li>
                                            <li className="add-menu-right">
                                                <img src="assets/images/adv/pic1.jpg" alt="" />
                                            </li>
                                        </ul>
                                    </li>
                                    {/* <li ><Link to="/">Online Tutors</Link></li> */}
                                    <li ><Link to="/contact">Contact Us</Link></li>
                                    {isAuthenticated && (
                                        <li><a href="#!">
                                            {user && (user.name)} 
                                                {notifications && notifications.length > 0 && (
                                                    <span class="badge badge-info" style={{margin: '5px'}}>{notifications.length}</span>
                                                )}
                                                <i className="fa fa-chevron-down"></i>
                                            </a>
                                        <ul className="sub-menu">
                                            <li><Link to="/profile/update/basic">Profile</Link></li>
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