import { nominalTypeHack } from 'prop-types';
import React, { Fragment , useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const TermsAndConditions = () => {
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
        {/* <!-- inner page banner --> */}
        <div className="page-banner ovbl-dark" >
            <div className="container">
                <div className="page-banner-entry">
                    <h1 className="text-white">Terms & Conditions</h1>
				</div>
            </div>
        </div>
		{/* <!-- Breadcrumb row --> */}
		<div className="breadcrumb-row">
			<div className="container">
				<ul className="list-inline">
					<li><a href="#">Home</a></li>
					<li>Terms & Conditions</li>
				</ul>
			</div>
		</div>
		{/* <!-- Breadcrumb row END --> */}
        <div className="content-block">
			<div className="section-area section-sp1">
				<div className="container">
					<div className="row">
						{/* <!-- Left part start --> */}
						<div className="col-lg-12 col-xl-12">
							{/* <!-- blog start --> */}
							<div className="recent-news blog-lg">
								<div className="info-bx">
									<h5 className="post-title">
										<a href="#">
											Zubnee only provides the platform. Zubnee is not responsible for any services or content that is delivered by the users of the platform.		
										</a>
									</h5>
									<p className="text-left">
										As a condition to use, you promise not to use the services for any purpose that is unlawful or prohibited by these terms, or any other purpose not reasonably intended by Zubnee. By way of example, and not as a limitation, you agree not to use the Services:
									</p>
									<ul style={{listStyle:'none'}}>
										<li><b>1.</b>  &nbsp;&nbsp;To abuse, harass, threaten, impersonate or intimidate any person.</li>
										<li><b>2.</b>  &nbsp;&nbsp;To post or transmit, or cause to be posted or transmitted, any content that is libelous, defamatory, obscene, abusive, offensive, profane, or that infringes any copyright or other right of any person.</li>
										<li><b>3.</b>  &nbsp;&nbsp;To communicate with Zubnee representative or other users in an abusive or offensive manner.</li>
										<li><b>4.</b>  &nbsp;&nbsp;For any purpose (including posting or viewing content) that is not permitted under the laws of Islamic Republic of Pakistan.</li>
										<li><b>5.</b>  &nbsp;&nbsp;To post or transmit, or cause to be posted or transmitted, any communication designed or intended to obtain password, account, or private information from any Zubnee user.</li>
										<li><b>6.</b>  &nbsp;&nbsp;To create multiple accounts for the purpose of deceiving users.</li>
										<li><b>7.</b>  &nbsp;&nbsp;To post copyrighted content that does not belong to you without permission from Zubnee representatives.</li>
									</ul>
									<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>

								</div>
							</div>
							{/* <!-- blog END --> */}
						</div>
					</div>
				</div>
			</div>
        </div>
    </div>
        <Footer />
        </Fragment>
    );
}

export default TermsAndConditions;