import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

import './mailbox.css';
import './style.css';
import LatestMessagesComponent from './latestMessages';


const Inbox =  () => { 
    return (
        <main className="ttr-wrapper">
            <div className="container-fluid">
                <div className="db-breadcrumb d-flex">
                    <h4 className="breadcrumb-title">Mailbox</h4>
                    <ul className="db-breadcrumb-list">
                        <li><a href="#"><i className="fa fa-home"></i>Home</a></li>
                        <li>Mailbox</li>
                    </ul>
                    <a href="mailbox-compose.html" className="btn btn-block col-2 ml-auto">Compose</a>
                </div>	
                <div className="row">
                    {/* <!-- Your Profile Views Chart --> */}
                    <div className="col-lg-12 m-b30">
                        <div className="widget-box">
                            <div className="email-wrapper">
                                {/* Start of email menu bar component */}
                                <div className="email-menu-bar">
                                    <div className="compose-mail">
                                        <a href="mailbox-compose.html" className="btn btn-block">Compose</a>
                                    </div>
                                    <div className="email-menu-bar-inner">
                                        <ul>
                                            <li className="active"><a href="mailbox.html"><i className="fa fa-envelope-o"></i>Inbox <span className="badge badge-success">8</span></a></li>
                                            <li><a href="mailbox.html"><i className="fa fa-send-o"></i>Sent</a></li>
                                            <li><a href="mailbox.html"><i className="fa fa-file-text-o"></i>Drafts <span className="badge badge-warning">8</span></a></li>
                                            <li><a href="mailbox.html"><i className="fa fa-cloud-upload"></i>Outbox <span className="badge badge-danger">8</span></a></li>
                                            <li><a href="mailbox.html"><i className="fa fa-trash-o"></i>Trash</a></li>
                                        </ul>
                                    </div>
                                </div>                               
                                {/* End of email menu bar componeenyt  */}
                                <div className="mail-list-container">
                                    <div className="mail-toolbar">
                                        <div className="check-all">
                                            <div className="custom-control custom-checkbox checkbox-st1">
                                                <input type="checkbox" className="custom-control-input" id="check1"/>
                                                <label className="custom-control-label" for="check1"></label>
                                            </div>
                                        </div>
                                        <div className="mail-search-bar">
                                            <input type="text" className="form-control" placeholder="Search"/>
                                        </div>
                                        <div className="dropdown all-msg-toolbar">
                                            <span className="btn btn-info-icon" data-toggle="dropdown"><i className="fa fa-ellipsis-v"></i></span>
                                            <ul className="dropdown-menu">
                                                <li><a href="#"><i className="fa fa-trash-o"></i> Delete</a></li>
                                                <li><a href="#"><i className="fa fa-arrow-down"></i> Archive</a></li>
                                                <li><a href="#"><i className="fa fa-clock-o"></i> Snooze</a></li>
                                                <li><a href="#"><i className="fa fa-envelope-open"></i> Mark as unread</a></li>
                                            </ul>
                                        </div> 
                                        <div className="next-prev-btn">
                                            <a href="#"><i className="fa fa-angle-left"></i></a>
                                            <a href="#"><i className="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                    <LatestMessagesComponent/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    {/* <!-- Your Profile Views Chart END--> */}
                </div>
            </div>
        </main>
);
}

export default Inbox;