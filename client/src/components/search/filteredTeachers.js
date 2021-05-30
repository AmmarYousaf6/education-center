import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link ,  useHistory  } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { createReactClass } from 'create-react-class';

//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

import { connect } from 'react-redux';


//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;
//Actual component 
const FilteredTeachers = ({results}) => {
    //Will be used for redirects
    let history = useHistory();
    
       //Method to initiate hiring request 
       const hireMeClicked = (teacher)=>{
        //handling user not logged in
        if (!localStorage.token) {
            toast.error("Please login to hire "+teacher.name);
            // history.push("/login");
            return ;
        }
       } 
      //Mwthos to initiate view profile request
      const viewProfileClicked = (teacher)=>{
        //handling user not logged in
        if (!localStorage.token) {
            toast.error("Please login to view "+teacher.name+" details");

            // history.push("/login");
            return ;
        }
        history.push("/profile/details/"+teacher.id);        
      }    
    return (<div className="row col-12">
        {results && results.length == 0 && (<h3>No results found</h3>)}
        {results &&
        results.map((teacher , i) => (  
            <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={i}>
            <div className="cours-bx">
                <div className="testimonial-thumb">
                    <img src={mediaBaseUrl+teacher.image} alt=""/>
                </div>
                <div className="info-bx text-center">
                <h5><a style={{cursor : 'pointer'}} onClick={()=>viewProfileClicked(teacher)}>{teacher.name}</a></h5>
                    <span>{teacher.qualification || "\u00A0"}</span>
                </div>
                <div className="cours-more-info">
                    <div className="review">
                        <span>{Math.ceil(teacher?.reviewscount )+' review'+(teacher?.reviewscount  == 1 ? '' : 's' )} </span>
                        <ul className="cours-star">
                            {([...Array(5).keys()].map(key=>(
                                <li key={key} className={teacher && teacher.ratings > key ? "active" : ""}><i className="fa fa-star"></i></li>
                            )))}
                        </ul>
                    </div>
                    <div className="price">
                        {/* <del>$190</del> */}
                        <h5>Rs. {teacher.salary || "\u00A0"}</h5>
                    </div>
                </div>
                <div>
                    <table className="table tutor-table">
                        <tbody>
                            <tr>
                                <th width="20%">Subjects</th>
                                <td width="80%">{teacher.subjects || "\u00A0"}</td>
                            </tr>
                            <tr>
                                <th>Classes</th><td>{teacher.classes || "\u00A0"}</td>
                            </tr>
                            <tr>
                                <th>Experience</th><td>{teacher.experience ? teacher.experience+" years":  "\u00A0"} </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <button className="btn button-md hire-now-btn" onClick={()=>hireMeClicked(teacher)}>Hire Now</button> */}
                    <button style={{width:'100%'}} className="btn button-md profile-view-btn view-filtered-profile-button" onClick={()=>viewProfileClicked(teacher)}>View Profile</button>
                </div>
            </div>
        </div>
 ))}
            <Toaster/>
            </div>);
}

  
const mapStateToProps = state => ({
    results : state.filterStore.results 
});  
export default connect(mapStateToProps, {}  )( FilteredTeachers );
