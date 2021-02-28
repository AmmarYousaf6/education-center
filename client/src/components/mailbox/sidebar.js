import React, { Fragment ,  useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import './mailbox.css';
import './style.css';
import LatestMessagesComponent from './latestMessages';

//For ajax calls
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;


const Sidebar =  ({active , setActive}) => { 
    let [otherUsers , setOtherUsers ] = useState(0);

    useEffect( ()=>{
        const fetchOtherUsers  = async () => {
            let data = [];
            //Making an object for data filtering 
            let filters = {
                skip : 0 ,
                limit : 10 ,
                search : ''
            };
            //Making an object of header authorization
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
                const OtherUsers = await axios.get(`${apiUrl}users/my-invites` , filters , config);
                data = OtherUsers.data.data;
                
                setOtherUsers(data);
                //Also setting currently active to first index
                if(data.length)
                   {
                    setActive(data[0])
                    console.log("Gonna set active " ,  data[0])
                   }     
                // this will re render the view with new data            
            } catch (err) {
                console.log("Error occured in index" , err);        
            }
            return resultToReturn;
        }
        fetchOtherUsers() }, [] );

    return (
        <Fragment>  
            <div class="email-menu-bar-inner">
            <ul>
            {otherUsers && otherUsers.map((user , i) => (  
                     <li class="active_link">
                        < a className={active.session_id == user.session_id ? "active_user"  : ""} onClick={()=>setActive(user)}>
                            <i class="fa fa-envelope-o"></i>{user.name} 
                            <span class="badge badge-success">8</span>
                        </a>
                    </li> 
            ))}
            </ul>
            </div>

        </Fragment>
    );
}

export default Sidebar;                                    