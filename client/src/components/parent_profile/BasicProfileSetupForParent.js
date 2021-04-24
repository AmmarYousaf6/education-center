import React, { Fragment, useState  } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert } from '../../actions/alert';
import { Link ,  useHistory  } from 'react-router-dom';
import { login } from '../../actions/auth';
import './profile.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import {saveBasicProfile} from '../../actions/profile';
//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;


const BasicParentProfileSetup = ({ clearAlert, isAuthenticated, auth: {user}, profile: { userType }, saveBasicProfile }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [beingSaved , setBeingSaved] = useState(false);
    const [profileDesc , setProfileDesc] = useState(''); 
    const [error_message  , setErrorMessage ] = useState(null);
    //Will be used for redirects
    let history = useHistory();
    
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
        setFileUrl(URL.createObjectURL(event.target.files[0]));
	};

    const handleSubmission = () => {
		// console.log(selectedFile);
	};

    const saveChanges = async () => {
        console.log("What will be saved " , fileUrl , " Description" , profileDesc)
        setBeingSaved(true);
        let data = [];
        
        let resultToReturn = [];
        try {
            if (!fileUrl) {
                throw {msg : "Please attach an image" , validationFailed : true };
            }
            //validating
            if(!profileDesc || profileDesc.length < 6){
                throw {msg : "Please provide a minimum description of atleast 6 characters." , validationFailed : true };
            }

            //ratedTo, rating, feedback
            let dataBody = {
                file : selectedFile ,
                summary : profileDesc ,
                userType  : 'parent'
            };
            let fd = new FormData();
            fd.append("file" , selectedFile );
            fd.append("summary" , profileDesc);
            fd.append("userType" , 'parent');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
    

            const updateProfile = await axios.post(`${apiUrl}users/update-teacher-profile` , fd , config);
            if (!updateProfile.data) {
                throw "Something went wrong. Please try again";
            }            
            toast.success(updateProfile.data.message)
            history.push("/");        

        } catch (err) {
            console.log("Error occured "   , err);
            if(err.config && err.config.url){
                setErrorMessage("Connection error occured.");
                setTimeout(()=>setErrorMessage(false) , 5000)
            }else if(err.validationFailed){
                setErrorMessage(err.msg);
                setTimeout(()=>setErrorMessage(false) , 5000)
            }else{
                toast.error(err);
            }

        } finally {
            setBeingSaved(false);
        }

    }
    
    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                    <Link to="/"><img src="https://res.cloudinary.com/home-tutor/image/upload/v1617753560/edu_tutor/default-monochrome_v6idag.svg" width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container account-container-custom">
                        <div className="heading-bx left">
                            <h2 className="title-head text-center title-head-text-cust">Almost Done ! <br /><span style={{ fontSize: "24px"}}>Please provide filter criteria to help us find the right match.</span></h2>
                            
                        </div>
                        <div className="teacher-section">	

                            <form className="contact-bx">
                                <div className="row placeani">
                                    <div className="col-lg-12">
                                    <div className="row">
                                        {/* Start of File setup form */}
                                            <div className="container">
                                                <div className="row it">
                                                    <div className="col-sm-offset-1 col-sm-10" id="one">
                                                        <div className="row">
                                                            <div className="col-sm-offset-12 col-sm-12 form-group">
                                                                <h3 className="text-center">Basic profile setup</h3>
                                                            </div>
                                                        </div>
                                                        <div id="uploader">
                                                            <div className="row uploadDoc">
                                                                <div className="col-sm-3">
                                                                    <div className="docErr">Please upload valid file</div>
                                                                    {isSelected && (
                                                                            <img className="image-upload-ph" src={fileUrl}/>
                                                                        )}
                                                                    <div className="fileUpload btn btn-orange" onClick={()=>{document.getElementById("file-upload").click()}}>
                                                                        <img src="https://image.flaticon.com/icons/svg/136/136549.svg" className="icon" />
                                                                        <span className="upl" id="upload"><br/>Upload Image</span>
                                                                        <input id="file-upload" type="file" name="file" onChange={changeHandler}/>                                            
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <textarea className="form-control" name="" placeholder="About yourself..." rows="8" 
                                                                    onChange={(evt)=>{setProfileDesc(evt.target.value)} }/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            { error_message && 
                                                                (<div className="validation-errors">{error_message}</div>)
                                                            }
                                                            <a className="btn btn-next" onClick={saveChanges}>
                                                                <i className="fa fa-paper-plane"></i> Save
                                                                {
                                                                  beingSaved && (
                                                                    <img src="assets/images/loader.gif" className="ratingLoader" />
                                                                    )
                                                                }
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        {/* End of File Setup form */}                                        
                                    </div>
                                </div>
                                </div>
                            </form>
                            
                            <Toaster />
                        </div>
                        
                    </div>
                </div>
	        </div>
        </Fragment>
    );
}

BasicParentProfileSetup.propTypes = {
    login: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { login, clearAlert, saveBasicProfile })(BasicParentProfileSetup);

  /*
  function newMenuItem() {
		var newElem = $('tr.list-item').first().clone();
		newElem.find('input').val('');
		newElem.appendTo('table#item-add');
	}
	if ($("table#item-add").is('*')) {
		$('.add-item').on('click', function (e) {
			e.preventDefault();
			newMenuItem();
		});
		$(document).on("click", "#item-add .delete", function (e) {
			e.preventDefault();
			$(this).parent().parent().parent().parent().remove();
		});
	}


    
							<form className="edit-profile">
								<div className="row">
									<div className="col-12 m-t20">
										<div className="ml-auto">
											<h3 className="m-form__section">4. Add Item</h3>
										</div>
									</div>
									<div className="col-12">
										<table id="item-add" style={{width:"100%"}}>
											<tr className="list-item">
												<td>
													<div className="row">
														<div className="col-md-4">
															<label className="col-form-label">Course Name</label>
															<div>
																<input className="form-control" type="text" value="" />
															</div>
														</div>
														<div className="col-md-3">
															<label className="col-form-label">Course Category</label>
															<div>
																<input className="form-control" type="text" value="" />
															</div>
														</div>
														<div className="col-md-3">
															<label className="col-form-label">Course Category</label>
															<div>
																<input className="form-control" type="text" value="" />
															</div>
														</div>
														<div className="col-md-2">
															<label className="col-form-label">Close</label>
															<div className="form-group">
																<a className="delete" href="#"><i className="fa fa-close"></i></a>
															</div>
														</div>
													</div>
												</td>
											</tr>
										</table>
									</div>
									<div className="col-12">
										<button type="button" className="btn-secondry add-item m-r5"><i className="fa fa-fw fa-plus-circle"></i>Add Item</button>
										<button type="reset" className="btn">Save changes</button>
									</div>
								</div>
							</form */