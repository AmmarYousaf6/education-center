import React , { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';


//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;



//Actual component 
const LatestMessagesComponent = ({active}) => {
    let [Messages , setMessages] = useState(0);
    
        useEffect( ()=>{
            console.log("On active change this mehod is called by Latest messages componenty" , active)
            const fetchAllMessages  = async () => {
                let data = [];
                //Making an object for data filtering 
                let filters = {
                    skip : 0 ,
                    limit : 10 ,
                    search : '' ,
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
                    if(active.session_id != '__')
                    {
                        const allMessages = await axios.get(`${apiUrl}chat/${active ? active.session_id : ""}` , filters , config);
                        data = allMessages.data.data;
                        setMessages(data);
                    }
                    // this will re render the view with new data            
                } catch (err) {
                    console.log("Error occured in index" , err);        
                }
                return resultToReturn;
            }
            fetchAllMessages() }, [active] );
        //When user clicks on check box then mark the message is read 
    const triggerReadMessage = (msg , evt) => {
        console.log("Event value 0 " , evt.target.checked)
        //Just in case user has already red the message and now trying to unread it
        const readMessage = async () => {
            let data = [];
            
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
                const msgRed = await axios.get(`${apiUrl}chat/read/${msg.id}`  , config);
                console.log("Data on return of seen message " , msgRed);

            } catch (err) {
                console.log("Error occured seen messge" , err);        
            }
            return resultToReturn;
        }
        readMessage();
    }
    return (<div className="mail-box-list">
    {(Messages==undefined || Messages.length == 0)  && [...Array(1).keys()].map((key)=>
        <div className="mail-list-info" key={key}>
            <div className="mail-list-title text-center">
                <h6>No messages yet</h6>
            </div>
        </div>
   )}   
    {Messages &&
            Messages.map((msg , i) => (  
                <div className="mail-list-info" key={i}>
                    <div className="checkbox-list">
                        <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id={"chck_"+msg.id} 
                                defaultChecked={msg.is_read} onChange={(evt)=>{ triggerReadMessage(msg , evt)} } />
                            <label className="custom-control-label" for={"chck_"+msg.id}></label>
                        </div>
                    </div>
                    <div className="mail-list-title">
                        <h6>{msg.name}</h6>
                    </div>
                    <div className="mail-list-title-info">
                        <p>{msg.message}</p>
                    </div>
                    <div className="mail-list-time">
                        <span>{msg.created_at}</span>
                    </div>
                    {/* <ul className="mailbox-toolbar">
                        <li data-toggle="tooltip" title="Delete"><i className="fa fa-trash-o"></i></li>
                        <li data-toggle="tooltip" title="Archive"><i className="fa fa-arrow-down"></i></li>
                        <li data-toggle="tooltip" title="Snooze"><i className="fa fa-clock-o"></i></li>
                        <li data-toggle="tooltip" title="Mark as unread"><i className="fa fa-envelope-open"></i></li>
                    </ul> */}
                </div>
                                        
             
            ))}</div>);
}

  
export default  LatestMessagesComponent ;
