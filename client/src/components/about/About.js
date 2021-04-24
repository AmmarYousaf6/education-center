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
							<h2 className="m-b10">Our Story</h2>
							<p>
							<h5 className="fw4"><ul><b>Zubnee a platform for parents and teachers.</b></ul></h5>
							
								Zubnee is an online platform which provides a platform for tutors and parents to collaborate with ease. The system provides a connecting mechanism with ease in mind.</p>
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