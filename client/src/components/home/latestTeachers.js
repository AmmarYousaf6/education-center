import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link ,  useHistory  } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { createReactClass } from 'create-react-class';

//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = 'http://localhost:4000/';

//Actual component 
const LatestTeachersComponent = ({setShowModal}) => {
    let [Teachers , setTeachers] = useState(0);
    //Will be used for redirects
    let history = useHistory();
    
        useEffect( ()=>{
            const fetchTeacherData  = async () => {
                let data = [];
                const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
                };
                if (localStorage.token) {
                setAuthToken(localStorage.token);
                }
                let resultToReturn = [];
                try {    
                    const allTeachers = await axios.get(`${apiUrl}users/latest/` , config);
                    data = allTeachers.data.users;
                    console.log("Data which is fetched" , data , allTeachers);

                    setTeachers(data);
                    // this will re render the view with new data            
                } catch (err) {
                    console.log("Error occured in index" , err);        
                }
                return resultToReturn;
            }
            fetchTeacherData() }, [] );
        
       //Method to initiate hiring request 
       const hireMeClicked = (teacher)=>{
        //handling user not logged in
        if (!localStorage.token) {
            toast.error("Please login to hire "+teacher.name);
            // history.push("/login");
            return ;
        }
        setShowModal(teacher)
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
    return (<div className="row">{Teachers &&
            Teachers.map((teacher , i) => (  
                <div className="col-md-6 col-lg-3 col-sm-6 m-b30" key={i}>
                        <div className="cours-bx">
                            <div className="testimonial-thumb">
                                <img src={mediaBaseUrl+teacher.image} alt=""/>
                            </div>
                            <div className="info-bx text-center">
                                <h5><a href="{teacher.id}">{teacher.name}</a></h5>
                                <span>{teacher.qualification}</span>
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
                                    <del>$190</del>
                                    <h5>${teacher.salary}</h5>
                                </div>
                            </div>
                            <div>
                                <table className="table tutor-table">
                                    <tr>
                                        <th width="20%">Subjects</th>
                                        <td width="80%">{teacher.subjects}</td>
                                    </tr>
                                    <tr>
                                        <th>Classes</th><td>{teacher.classes}</td>
                                    </tr>
                                    <tr>
                                        <th>Experience</th><td>{teacher.experience} years</td>
                                    </tr>
                                </table>
                                <button className="btn button-md hire-now-btn" onClick={()=>hireMeClicked(teacher)}>Hire Now</button>
                                <button className="btn button-md profile-view-btn" onClick={()=>viewProfileClicked(teacher)}>View Profile</button>
                            </div>
                        </div>
                    </div>
             
            ))}
            <Toaster/>
            </div>);
}

  
export default  LatestTeachersComponent ;
