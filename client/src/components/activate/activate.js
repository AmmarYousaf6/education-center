import React, { Fragment , useEffect , useState } from 'react';
import { BrowserRouter as Router ,  Link , NavLink , Switch , Route , useRouteMatch, useLocation } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import { dispatch } from 'react-hot-toast';
import {LOGIN_SUCCESS
  } from '../../actions/types';
import {loadUserAfterWait} from '../../actions/auth';  
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

const ActivateAccount = ({loggedin}) => {
    const [activeMessage , setActiveMessage]= useState('Activating');
    const [beingActivated , setBeingActivated] = useState(true);
    let match = useRouteMatch("/activate/:token");

    useEffect(()=>{
        const validateToken = async () =>{
            console.log("Token info after matching" , match);
            try{
                // we define our url and parameters to be sent along
                let url = apiUrl+'auth/token/'+match.params.token;
                    
                // we use the fetch API to call HERE Maps with our parameters
                let result = await axios.get(url );
                // when a response is returned we extract the json data
                console.log(" we have response" , result.data );
                setBeingActivated(false);
                setActiveMessage('Profile is now active');
                loggedin(result.data);
            }catch(e){
                console.log("Error occured" , e)
            }
        };
        validateToken();
    }, [])
    return (
        <Fragment> 
            <Navbar />
            <div className="page-content">
                {/* <!-- Page Content Box ==== --> */}
                <div className="content-block">
                    {/* <!-- Our Status ==== --> */}
                    <div className="section-area content-inner section-sp1 text-center">
                        <h3>{activeMessage} 
                           {beingActivated && (
                                                <img src="assets/images/loader.gif" className="ratingLoader" />
                                            )
                            }

                        </h3>
                    </div>
                    {/* <!-- Our Status END ==== --> */}
                </div>
                {/* <!-- Page Content Box END ==== --> */}
            </div>
        <Footer />
        </Fragment>
    );
}

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated
});
const mapDispatchToProps = (dispatch) => ({
    loggedin : payload => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: payload
        });
        console.log("Gonna load user" , localStorage.token);
        window.location.href ="/login";
        // loadUserAfterWait() ;  
    }  
  });
export default connect(mapStateToProps, mapDispatchToProps )(ActivateAccount);