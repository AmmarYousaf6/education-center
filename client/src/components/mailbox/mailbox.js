import React, { Fragment , useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './mailbox.css';
import './style.css';
import LatestMessagesComponent from './latestMessages';
import RequestModal from '../modals/requestModal';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import  Sidebar  from './sidebar';

// import introJs from 'intro.js';
import introJs from 'intro.js/intro.js';

import 'intro.js/introjs.css';


//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

//Introduction JS
const steps = [
    {
      element: '.selector1',
      intro: 'test 1',
      position: 'right',
      tooltipClass: 'myTooltipClass',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.selector2',
      intro: 'test 2',
    },
    {
      element: '.selector3',
      intro: 'test 3',
    },
  ];
  const stepsEnabled = true;
  const initialStep = 0;
  const onExitIntro = function (stepIndex){
      console.log("Introduction has exited" , stepIndex);
  }  
//End of Introduction JS
const MailBox =  ({ auth: { user, isAuthenticated, loading , notifications } }) => {
    let [active , setActive] = useState(0);
    //For modals
    const [showModal , setShowModal] = useState(false);

    useEffect(()=>{
        console.log("User info found" , user );
      },[user]);

    //Adding send message functionality
    let [message , setMessage ] = useState('');
    const sendMessage = ()=>{
            if(message.trim().length == 0 ){        
                toast.error("Please enter a message");
                return ;
            }
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
            axios.post(`${apiUrl}chat/message` , {sessionId : active.session_id , message : message } , config)
                .then(function (response) {
                        let temp = active ;
                        //So that view effect can be called
                        setActive({session_id: '__' } );
                        //Tor refresh data 
                        setActive(temp);
                        //Clearing message
                        setMessage('');
                  })
                  .catch(function (error) {
                    console.log(error , "send error");
                  })
    }

    return (
        <Fragment>  
            <Navbar />
        <main className="ttr-wrapper">
            <div className="container-fluid">
                <div className="db-breadcrumb d-flex">
                    <h4 className="breadcrumb-title">Mailbox</h4>
                    <ul className="db-breadcrumb-list">
                        <li><a href="#"><i className="fa fa-home"></i>Home</a></li>
                        <li>Mailbox</li>
                    </ul>
                    {/* <a href="mailbox-compose.html" className="btn btn-block col-2 ml-auto">Compose</a> */}
                </div>	
                <div className="row"  >
                    {/* <!-- Your Profile Views Chart --> */}
                    <div className="col-lg-12 m-b30">
                        <div className="widget-box">
                            <div className="email-wrapper">
                                {/* Start of email menu bar component */}
                                <div className="email-menu-bar">
                                    <div className="compose-mail" data-intro='To view Requests Click here!'>
                                        <a className="btn btn-block text-light" onClick={()=>setShowModal(true)}>
                                            {notifications && notifications.length > 0 && (
                                            <span className="badge badge-info" style={{margin: '5px'}}>{notifications.length}</span>
                                                )}
                                            View Requests
                                        </a>
                                    </div>
                                    <div data-intro='Click on a recipient to start conversation.!'>
                                    {/* Start of Left User Menu List */}
                                    <Sidebar active={active} setActive={setActive} data-intro='Hello step one!' />
                                    {/* End of Left User Menu List  */}
                                    </div>
                                </div>                               
                                {/* End of email menu bar componeenyt  */}                                
                                <div className="mail-list-container">
                                    <div className="mail-toolbar">                                        
                                        <div className="mail-search-bar" style={{width : '40%'}} data-intro='Use this textarea to compose message.'>
                                            <textarea type="text" value={message} className="form-control" placeholder="Type Message" rows={1} onChange={(evt)=>setMessage(evt.target.value)} />
                                        </div>
                                        <div className="dropdown all-msg-toolbar" data-intro='Click to send message.'>
                                            <span className="btn button-md ml-4" data-toggle="dropdown" style={{background : '#216044'}} onClick={()=>sendMessage()}>Send</span>                                            
                                        </div>
                                    </div>
                                    <LatestMessagesComponent active={active}/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* <!-- Your Profile Views Chart END--> */}

                    <RequestModal showModal={showModal} setShowModal={setShowModal} />

                </div>
            </div>
            <div class="wrapper" style={{background : '#216044', position :'fixed' , right : '40px' , bottom : '50px'}} onClick={()=>introJs().start()}>
            <button className="buttoni">
                Intro? 
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            </div>
        </main>
        <Toaster />

        </Fragment>
);
}
MailBox.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps)(MailBox);