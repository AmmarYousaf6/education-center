import React, { Fragment, useState , useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect , useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Logout from './Logout';
import GoogleSignup from './GoogleSignup';
import LinkedInPage from './LinkedInPage';
import { register } from '../../actions/auth';
import { setAlert, clearAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import Alert from './../layout/Alert';
import TermsModal from './../modals/terms';

const Register = ({ setAlert, clearAlert, register, isAuthenticated}) => {
    const history =useHistory();
    const [ aggreement , setAggreement ] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        type: 'manual'
    });
    const [ beingSaved , setBeingSaved ] = useState(false);
    const [showModal , setShowModal ] = useState(false);

    useEffect(()=>{
        console.log("Value changed for set Alert" , setAlert);
    } , []);
    const {
        name, email, password, confirmPassword, gender
    } = formData;

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        clearAlert();
        
        if (password !== confirmPassword) {
          setAlert('Password and Confirm Password fields does not match', 'danger');
        }else if(!aggreement){
          setAlert('Please indicate that you accept the Terms and Conditions', 'danger');
        } else {
          setBeingSaved(true);
          await register(formData , history);
          setBeingSaved(false);
        }
    };

    const validate = () => {
        let errors = {};
        if (password !== confirmPassword) {
          errors["password"] = "Please and confirm password didn't match";
        }
    }
    const registerClicked = () =>{
        setShowModal(true);
    }
    if (isAuthenticated) {
        return <Redirect to="/" />;
    }

    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                <Link to="/"><img src="https://res.cloudinary.com/home-tutor/image/upload/v1617753560/edu_tutor/default-monochrome_v6idag.svg"  width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container">
                        <div className="heading-bx left">
                            <h2 className="title-head">Sign Up <span>Now</span></h2>
                            <p style={{textAlign :'left'}}>Login Your Account <Link to="/login">Click here</Link></p>
                        </div>	
                        <form className="contact-bx" onSubmit={e => onSubmit(e)}>
                            <div className="row placeani">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group">
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
                                            <span className="help span-help">A confirmation email will be sent to the address you provide above for account activation</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="input-group"> 
                                            <input 
                                                name="password" 
                                                placeholder="Password"
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
                                            <input 
                                                name="confirmPassword" 
                                                placeholder="Confirm password"
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
                                            <select 
                                                name="gender"
                                                className="form-control selectBtm" 
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

                                <div className="col-lg-12 ">
                                <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheckbox" checked={aggreement} onChange={() => setAggreement(!aggreement)} />
                                            <label className="custom-control-label" htmlFor="customCheckbox">By continuing, you agree to the <span className="text-blue cursor-pointer" onClick={()=>history.push('/conditions/')}><u>Terms of Service</u></span> </label>
                                        </div>                                    
                                </div>

                                <div className="col-lg-12 m-b30 mt-5">
                                    <button name="submit" type="submit"  value="Submit" className="btn button-md">
                                        Sign Up
                                        {
                                            beingSaved && ( <img src="assets/images/loader.gif" className="ratingLoader" />)
                                        }

                                    </button>
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
            <TermsModal showModal={showModal} setShowModal={setShowModal}></TermsModal>
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
  