import React, { Fragment , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const Works = () => {
    const [sendingMessage, setSendingMessage] = useState(false);
    const [storeInfo , setStoreInfo] =  useState({});
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

    }, [])
    return (
        <Fragment> 
            <Navbar />

            <div className="page-content bg-white">
        
                <div className="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white text-uppercase">How ZubNee works?</h1>
                        </div>
                    </div>
                </div>
                
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li><a href="#">Home</a></li>
                            <li>How it works!</li>
                        </ul>
                    </div>
                </div>
                
                <div className="page-banner contact-page section-sp2 text-left">
                    <div className="container">
                    <h3 className="post-title">
										<a href="#">
                                            How ZubNEE works.
                                        </a>
                    </h3>
                    <h5 style={{textAlign:'left'}, {fontWeight:"bold"}, {textDecoration:"underline"}}>
                        First of all ZubNEE is a free platform. 
                    Our only mission is to improve Pakistan as a nation. So - get connected with your  tutor today. 
                    You are only 3 clicks away from your desired ZubNEE home tutor.
                    </h5>

                    <h5 style={{textAlign:'left'}, {fontWeight:"bold"}, {textDecoration:"underline"} , {display:"inline"}}>
                        Search:
                    </h5> 
                    <p style={{textAlign:'left'}}>                 
                        Start by searching for a ZubNee tutor by applying the subject, fee or location filters. You will now be able to see the available tutors in your neighborhood.  You can also search them by rating.
                    </p>
                    <h5 style={{textAlign:'left'}, {fontWeight:"bold"}, {textDecoration:"underline"}, {display:"inline"}}>
                    Connect:
                    </h5>
                    <p style={{textAlign:'left'}}>
                    Once you have found the matching profiles, look through them to see if the profile is suitable. See what other parents have said about the tutor. Now, write to your ZubNee tutor for questions and details. You may agree on a trial period where both of you get to know each other. From here you are just one click away from your child’s educational journey with a ZubNEE tutor.
                    </p>
                    <h5 style={{textAlign:'left'}, {fontWeight:"bold"}, {textDecoration:"underline"} , {display:"inline"}}>
                    Hire: 
                    </h5>
                    <p style={{textAlign:'left'}}>
                    You are now ready to hire your selected ZubNee tutor. Welcome to a world of learning in the zone of proximal development, enhancing your child’s educational and personal skills and abilities while you are now free to do what you are best at.
                    </p>
					</div>                        
                </div>
                
            </div>
            <Footer />
        </Fragment>
    );
}

export default Works;