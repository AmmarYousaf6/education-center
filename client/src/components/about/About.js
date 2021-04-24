import React, { Fragment , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const About = () => {
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

            <div className="page-content">
        {/* <!-- Page Heading Box ==== --> */}
        <div className="page-banner ovbl-dark" style={{"backgroundImage":"url(assets/images/banner/banner2.jpg)"}}>
            <div className="container">
                <div className="page-banner-entry">
                    <h1 className="text-white">About Us </h1>
				 </div>
            </div>
        </div>
		<div className="breadcrumb-row">
			<div className="container">
				<ul className="list-inline">
					<li><a href="#">Home</a></li>
					<li>About Us </li>
				</ul>
			</div>
		</div>
		{/* <!-- Page Heading Box END ==== --> */}
		{/* <!-- Page Content Box ==== --> */}
		<div className="content-block">
            {/* <!-- About Us ==== --> */}
			
			{/* <!-- About Us END ==== --> */}
            {/* <!-- Our Story ==== --> */}
			<div className="section-area section-sp1 our-story">
				<div className="container">
					<div className="row align-items-center d-flex">
						<div className="col-lg-12 col-md-12 heading-bx">
							<h2 className="m-b10 text-center"><u>Welcome to the Zubnee Team</u></h2>
							<p>
							    {/* <h5 className="fw4"><ul><b>Zubnee a platform for parents and teachers.</b></ul></h5> */}
                                We are a team of Scandinavian academics with roots in Pakistan, who believe that there is a better way of finding a tutor for your child. We believe that the shortest path from A to B is the straight line.  Our passion is the Future of Pakistan. Our Obsession is it's children. Our goal is to educate and polish them. Our mission is to make every single child recognize it's strengths and excel in it's field. 
                                The huge amount of talent that we have seen in Pakistan simply needs to be brought to light. How? By finding a Zubni tutor with our advanced search options - without wasting time on confusing groups with loads of ads from agencies providing tutors. 
                                <br />
                                <center className="elementToFadeInAndOut"> 
                                    Zubnee is a free of cost service - created to make Pakistani children shine.
                                </center>
                            </p>
						</div>
						
					</div>
				</div>
			</div>
			{/* <!-- Our Story END ==== --> */}
			{/* <!-- Our Status ==== --> */}
			<div className="section-area content-inner section-sp1">
                
            </div>
			{/* <!-- Our Status END ==== --> */}
			{/* <!-- About Content ==== --> */}
			
			{/* <!-- About Content END ==== --> */}
        </div>
		{/* <!-- Page Content Box END ==== --> */}
        </div>
        <Footer />
        </Fragment>
    );
}

export default About;