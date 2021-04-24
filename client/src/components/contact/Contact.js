import React, { Fragment , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import Alert from './../layout/Alert';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_APP_SERVER_URL;
const Contact = () => {
    const [beingSent, setBeingSent] = useState(false);
    const [storeInfo , setStoreInfo] =  useState({});
    const initialState = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };
    const [formData, setFormData] = useState(initialState);

    const {
        name, email, phone, subject, message
    } = formData;
    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateForm = () => {
        try {
            if (!formData.name ) {
                throw "Invalid name provided.";
            }
            if(!formData.email ){
                throw "Invalid email provided.";
            }
            if(!formData.phone ){
                throw "Invalid phone provided.";
            } 
            if(!formData.subject){
                throw "Invalid subject provided.";
            } 
            if(!formData.message){
                throw "Invalid message provided.";
            }
            return false;
        } catch (err) {
            toast.error(err);
            setBeingSent(false);
            return true;
        }
    }
    useEffect(()=>{
        // we define our url and parameters to be sent along
        let url = apiUrl+'settings/';
            
        // we use the fetch API to call HERE Maps with our parameters
        return fetch(url )
            // when a response is returned we extract the json data
            .then(response => response.json())
            // and this data we dispatch for processing in locations of teachers
            .then(data =>{
                console.log("We have settings details " , data.data);
                let objSerialized = [];
                data.data.forEach(d=>{
                    objSerialized[d.key]= d.value
                })
                setStoreInfo(objSerialized);
            })
            .catch(error => console.error(error))

    }, []);
    const sendMessage = async ()=>{
        setBeingSent(true);
        //Validate fields 
        if (validateForm()) {
            return;
        }

        //Send message
        console.log("Sending message" , formData);
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        
        const body = JSON.stringify(formData);
        try {
            const res = await axios.post(apiUrl+'contactus', body, config);
            toast.success("Message sent");

            console.log("Response of conteact us" , res);
            //Clear the form
            setFormData(initialState);
        } catch (err) {
            toast.error("Something went wrong while sending message");
            const error = err.response.data;
        }
        
        setBeingSent(false);        
    }   

    return (
        <Fragment> 
            <Navbar />

            <div className="page-content bg-white">
        
                <div className="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white text-uppercase">Contact Us</h1>
                            <div className="addr-header">Email@ {storeInfo && (storeInfo.email)}</div>
                        </div>
                    </div>
                </div>
                
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
                
                <div className="page-banner contact-page section-sp2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-5 m-b30">
                                <div className="bg-primary text-white contact-info-bx">
                                    <h2 className="m-b10 title-head text-center">Contact <span>Information</span></h2>
                                    <div className="widget widget_getintuch">	
                                        <ul>
                                            <li><i className="ti-location-pin"></i>{storeInfo && (storeInfo.address)}</li>
                                            <li><i className="ti-mobile"></i>{storeInfo && (storeInfo.phone)}</li>
                                            <li><i className="ti-mobile"></i>{storeInfo && (storeInfo.landline)}</li>
                                            <li><i className="ti-email"></i>{storeInfo && (storeInfo.email)}</li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7">
                                <form className="contact-bx ajax-form">
                                <div className="ajax-message"></div>
                                    <div className="heading-bx left">
                                        <h2 className="title-head text-center title-head-cust">Get In <span>Touch</span></h2>
                                        <p>{storeInfo  && (storeInfo.contact_sub_heading)}</p>
                                    </div>
                                    <div className="row placeani">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="name" type="text" required className="form-control valid-character" placeholder="Name" onChange={e => onChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <input name="email" type="email" className="form-control" placeholder="Email" required onChange={e => onChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="phone" type="text" required className="form-control int-value" placeholder="Phone" onChange={e => onChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="subject" type="text" required className="form-control" placeholder="Subject" onChange={e => onChange(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <textarea name="message" rows="4" className="form-control" placeholder="message" required onChange={e => onChange(e)} ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12 text-center">
                                            <button name="submit" type="button" className="btn button-md" onClick={()=>sendMessage()}> 
                                                {!beingSent && ('Send Message')}
                                                {beingSent && (
                                                    <img src="assets/images/loader.gif" className="ratingLoader" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <Alert />
                            <Toaster />

                        </div>
                    </div>
                    
                </div>
                
            </div>
            <Footer />
        </Fragment>
    );
}

export default Contact;