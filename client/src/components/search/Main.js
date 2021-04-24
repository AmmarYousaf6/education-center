import React, { Fragment , useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import {
    sortByFee ,
    sortByFeeDes ,
    classSelected ,
    subjectSelected ,
    experienceSelected ,
    genderSelected ,
    feeRangeSelected ,
    queryData ,
    loadData ,
    applyFilters ,
    changeNumTeachers
  } from '../../actions/search';
import FilteredTeachers from './filteredTeachers';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import PaginationComponent from './pagination';

// import { load } from 'dotenv/types';
//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;


const SearchTeachers = ({   
    sort_fee , classes ,subject ,gender ,fee_range_min ,fee_range_max, searchText ,
    sortByFee , sortByFeeDes , classSelected , subjectSelected , 
    experienceSelected , genderSelected , feeRangeSelected , applyFilters , changeNumTeachers , 
    queryData , loadData , status , results }) => {
        const [grades , setGrades ] = useState(0);
        const [subjects , setSubjects ] = useState(0);

        useEffect( ()=>{
            const fetchDropdownData  = async () => {
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
                    const uniqueClasses = await axios.get(`${apiUrl}users/uniqueClasses` , config);
                    const uniqueSubjects = await axios.get(`${apiUrl}users/uniqueSubjects` , config);

                    // console.log("Data which is fetched in user effect of search main js use effect" , uniqueClasses.data , uniqueSubjects.data );

                    setGrades(uniqueClasses.data.classes );
                    setSubjects(uniqueSubjects.data.subjects);
                    // this will re render the view with new data            
                } catch (err) {
                    console.log("Error occured in index" , err);        
                }
                return resultToReturn;
            }
            fetchDropdownData(); 
            applyFilters();
        }, [] );

        //Just in case user has typed some search value
        const searchChanged = (searchStr)=>{
            queryData(searchStr)
        }
        //Handlick click event
        const searchClicked = ()=>{
            applyFilters();
        }
    return (
        <Fragment>  
            <Navbar />

            <div className="page-content bg-white">
                <div className="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)" }}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h3 className="text-white">Better than a thousand days of diligent study is one day with a great teacher</h3>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Tutors</li>
                        </ul>
                    </div>
                </div>

                {/*  */}

                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12 m-b30"></div>
                            <div className="col-lg-9 col-md-8 col-sm-12">
                                <div className="row search-term-text">
                                        <div className="clearfix row">
                                            { searchText && searchText.length > 0 && (
                                                `Search Results for: "${searchText}"` )}
                                        </div>                                    
                                </div>
                                <div className="row">
                                    <div className="col-md-4 "></div>
                                    <div className="col-md-4 ">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="dzName" required className="form-control selectBtm" onChange={(evt)=>sortByFee(evt.target.value)}>
                                                        <option value="1">Sort By Fee</option>
                                                        <option value="1">High - Low</option>
                                                        <option value="0">Low - High</option>                                                
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="col-md-4 ">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <select name="dzName" required className="form-control selectBtm" onChange={(evt)=>changeNumTeachers(evt.target.value)}>
                                                    <option value="10">10 teachers</option>
                                                    <option value="20">20 teachers</option>
                                                    <option value="50">50 teachers</option>                                                
                                                    <option value="100">100 teachers</option>                                                
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                    <div className="widget courses-search-bx placeani">
                                        <div className="form-group">
                                            <div className="input-group">
                                                {/* <label>Search Tutor</label> */}
                                                <input name="dzName" type="text" required className="form-control" placeholder="Search" onChange={(evt)=>searchChanged(evt.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget_archive">
                                        <h5 className="widget-title style-1">Advanced Search</h5>
                                        
                                        <div className="widget courses-search-bx placeani">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="dzName" required className="form-control selectBtm" onChange={(evt)=>classSelected(evt.target.value)}>
                                                        <option value=""> Class</option>
                                                        {grades && grades.map((grade , i )=>(
                                                            <option value={grade.name} key={i}>{grade.name}</option>
                                                        ) )}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="dzName" required className="form-control selectBtm" onChange={(evt)=>subjectSelected(evt.target.value)}>
                                                        <option value=""> Subject</option>
                                                        {subjects && subjects.map( (subject  , i)=>(
                                                            <option value={subject.name} key={i}>{subject.name}</option>
                                                        ) )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="dzName" required className="form-control selectBtm" onChange={(evt)=>experienceSelected(evt.target.value)}>
                                                        <option value="">Experience</option>
                                                        <option value="1-5">1 - 5 Years</option>
                                                        <option value="5-10">5 - 10 Years</option>
                                                        <option value="10-15">10 - 15 Years</option>
                                                        <option value="15-20">15 - 20 Years</option>
                                                        <option value="20-50">20 + Years</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="dzName" required className="form-control selectBtm"  onChange={(evt)=>genderSelected(evt.target.value)}>
                                                        <option value="">Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select name="dzName" required className="form-control selectBtm"  onChange={(evt)=>feeRangeSelected(evt.target.value)}>
                                                        <option value="">Fee Range</option>
                                                        <option value="0-15000">upto 15K </option>
                                                        <option value="15000-30000">15K to 30K</option>
                                                        <option value="30000-45000">30K to 45K</option>
                                                        <option value="45000-60000">45K to 60K</option>
                                                        <option value="60000-75000">60K to 75K</option>
                                                        <option value="75000-90000">75K to 90K</option>
                                                        <option value="90000-105000">90K to 105K</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="btn button-md hirenow-btn text-light" onClick={()=>searchClicked()}>Search</a>
                                    
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12">
                                    
                                    <div className="row">
                                        {/* Start of filtered teachers */}
                                            {status=='succeeded' ? <FilteredTeachers /> : false}
                                        {/* End of filtered teachers */}

                                        {/* Start of Pagination */}
                                            { status == 'succeeded' ? <PaginationComponent /> : false}
                                        {/* End of Pagination */}

                                        {/* Preloader in case data is being fetched */}
                                            {status && status=='loading' && (<div className="Preloader">
                                                <img src="assets/images/loading_.gif" className="preloader_img"></img>
                                            </div>)}
                                        {/* End of pre loader in case data fetched */}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

//   Map.propTypes = {
//     sort_fee : PropTypes.number ,
//     class : PropTypes.number ,
//     // locationsLst : PropTypes.arrayOf(PropTypes.object) ,
//     searchMap : PropTypes.func
//   };
  const mapStateToProps = state => ({
    sort_fee :   state.filterStore.sort_fee , //Ascending
    classes :   state.filterStore.classes ,
    subjects :   state.filterStore.subjects ,
    gender :  state.filterStore.gender, //For all genders
    fee_range_min :   state.filterStore.fee_range_min , //Means not provided otherwise we would have min max
    fee_range_max :  state.filterStore.fee_range_max, //Means not provided
    status : state.filterStore.status ,
    searchText : state.filterStore.search , 
    results : state.filterStore.results 
  });
  const mapDispatchToProps = {
    sortByFee ,
    sortByFeeDes ,
    classSelected ,
    subjectSelected ,
    experienceSelected ,
    genderSelected ,
    feeRangeSelected ,
    queryData ,
    loadData ,
    applyFilters ,
    changeNumTeachers
  };
  
export default connect(mapStateToProps, mapDispatchToProps  )( SearchTeachers );