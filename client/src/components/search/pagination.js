import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link ,  useHistory  } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { createReactClass } from 'create-react-class';

//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

import { connect } from 'react-redux';

import { pageChanged } from '../../actions/search';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;
//Actual component 
const PaginationComponent = ({pagesCount , active  , pageChanged }) => {
    //   const [active , setActive] = useState(null);
    //   const [subjects , setSubjects ] = useState(0);

      //Mwthos to initiate view profile request
      const changePageClicked = (pageNo)=>{
          console.log("Gonna set page number" , pageNo , "Currently active is " , active)
        //In case page no is negative
        if(pageNo < 0){
            pageNo = 0;
            return ;
        }
        //In case the last page is shown
        if(pageNo > pagesCount-1){
            pageNo = pagesCount-1;
            return ;
        }
        //In case the previous page is not the same as current selected
        if(active != pageNo){
            // setActive(pageNo);    
            pageChanged(pageNo);
            console.log("Gonna set page number" , pageNo , "After setting active is " , active, "pages count", pagesCount)
        
        }
      }    
    return (<div className="row">
        <div className="col-lg-12 m-b20">
            <div className="pagination-bx rounded-sm gray clearfix">
                <ul className="pagination">
                    { active && active != 0 ? ( <li className="previous"><a onClick={()=>changePageClicked(active-1)}><i className="ti-arrow-left"></i> Prev</a></li> )
                        : '' }   
                    {
                            pagesCount &&
                            (Array(pagesCount).fill(0)).map((page , i) => ( 
                                <li key={i} className={i===active ? "active" : ""}><a onClick={()=>changePageClicked(i)}>{i+1}</a></li>
                            ))
                        }
                     { (active < pagesCount-1) ? (    
                    <li className="next"><a onClick={()=>changePageClicked(active+1)}>Next <i className="ti-arrow-right"></i></a></li> ) : '' }
                </ul>
            </div>
        </div>
        
            <Toaster/>
            </div>);
}

//helper method which gives page count
const pageCount = (obj)=>{
    if(obj.results && obj.results.length  ){
        return Math.ceil ( obj.results[0].rowsfiltered / obj.num_rows );
    }
    return 1;
}  
const mapStateToProps = state => ({
    pagesCount : pageCount ( state.filterStore) ,
    active : state.filterStore.skip  
});
const mapDispatchToProps = {
    pageChanged
}  
export default connect(mapStateToProps, mapDispatchToProps  )( PaginationComponent );
