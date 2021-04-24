import React, { useEffect , useState } from 'react';
import { Link  } from 'react-router-dom';
import { motion , AnimatePresence } from 'framer-motion';

import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';


//For toast notifications
import toast  , { Toaster } from 'react-hot-toast';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;



const backdrop ={
    visible : { opacity : 1 },
    hidden : { opacity : 0 }
}
const modalTransitions = {
    hidden : {
        y : "-100vh",
        opacity : 0
    } ,
    visible : {
        y : "100px",
        opacity : 1 , 
        transition : { delay : 0.5}
    }
}
const ChildModal = ({showModal , setShowModal}) =>{
    const [name , setName ]=useState(null);
    const [age  , setAge ]=useState(null);
    const [qualification , setQualification ]=useState('');
    const [summary , setSummary]=useState(null);
    
    const [beingSaved , setBeingSaved] = useState(null);
    
    const [fileUrl, setFileUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const [error_message  , setErrorMessage ] = useState(null);
    const [subject, setSubject] = useState([]);
    const [grade, setGrade] = useState([]);

    useEffect( () => {
        //Fetch if user has already requested data showModal
        console.log("Show modal details" , showModal ,process.env , "Environment")
        if(showModal)
        {
            if(showModal.qualification){
                let gradeSelected = gradeList.filter(grade=>(grade.name.toLowerCase() == showModal.qualification.toLowerCase()) );
                let id = '';
                if(gradeList)
                  id = gradeList[0].id;
                if(gradeSelected && gradeSelected.length){
                    console.log("Grade filtered" , gradeSelected);
                    id = gradeSelected[0].id;
                }
                setQualification (id);
            }else{
                if(gradeList){
                    let id = gradeList[0].id;
                    setQualification (id);
                }
            }
        }
    } , [showModal] );
    const resetForm =() => {
        setAge(null);
        setName(null);
        setQualification(null);
        setSummary(null);
        setFileUrl('');
        setSelectedFile(null);
        setIsSelected(null);
    }
    //Making a funtion to initiate send data request
    const update  = async () => {
        setBeingSaved(true);

        //check if setModal has actually teacher data
        if(!showModal)
        {   
            console.log("Set child modal has no data" , showModal);
            return ;
        }
        let data = [];
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
            if(typeof showModal == 'object'){
                if(!fileUrl){
                    setFileUrl(showModal.image);
                }
                if(!name){
                    setName(showModal.name);
                }
                if(!summary){
                    setSummary(showModal.summary);
                }
                if(!qualification){
                    setQualification(showModal.qualification);
                }
                if(!age){
                    setAge(showModal.age);
                }
            }
            if(!fileUrl){
                throw {msg : "Please select a file" , validation : true};
            }
            if(!name){
                throw {msg : "Please provide name" , validation : true};
            }
            if(!age){
                throw {msg : "Please provide age" , validation : true};
            }
            if(!qualification){
                throw {msg : "Please provide qualification" , validation : true};
            }
            if(!summary){
                throw {msg : "Please provide summary" , validation : true};
            }
            let childInfo = { 
                name : name , summary : summary  , 
                qualification : qualification , image : fileUrl  , 
                age : age , subjects : subject };
            console.log("Gonna post value for children" , childInfo );
            let childAjax;
            if(typeof showModal == 'object'){
                //User is here to edit
                childInfo.childId = showModal.id; 
                childAjax = await axios.put(`${apiUrl}users/children`, JSON.stringify(childInfo) , config);
            }else{
                //User is here to add
                childAjax = await axios.post(`${apiUrl}users/children`, JSON.stringify(childInfo) , config);
            }
            if(!childAjax.data)
            {
                throw "Something went wrong. Please try again";
            }
            if(childAjax.data.message.includes("Exist")){
                throw childAjax.data.message;
            }

            toast.success(childAjax.data.message)
            setShowModal(false);
            resetForm();            
        } catch (err) {
            console.log("Exception" , err)
            if(err.config && err.config.url){
                setErrorMessage("Connection error occured.");
                setTimeout(()=>setErrorMessage(false) , 5000)

            }else if(err.validation){
                setErrorMessage(err.msg);
                setTimeout(()=>setErrorMessage(false) , 5000)
            }else{
                toast.error("Something went wrong.");
            }

        } finally{
            setBeingSaved(false);        
        }
        return resultToReturn;
    }
    const subjectList = [        
        { name: "English", id: "english" },
    { name: "Urdu", id: "urdu" },
    { name: "Islamiat", id: "islamiat" },
    { name: "Maths", id: "maths" },
    { name: "Science", id: "science" },
    { name: "Social Studies", id: "socialStudies" },
    { name: "Computer Science", id: "computerScience" },
    { name: "Physics", id: "physics" },
    { name: "Chemistry", id: "chemistry" },
    {name : "Biology" , id : "biology" },
    {name : "Business" , id : "business" },
    {name : "Economics" , id : "economics" },
    {name : "Accounting" , id : "accounting" },
    {name : "Sociology" , id : "sociology" },
    {name : "Psychology" , id : "psychology" },
    {name : "Art" , id : "art" },
    {name : "FSc/FA" , id  : "fsc/fa" }
    ];

    const gradeList = [
        { name: "Primary", id: "primary" },
        { name: "O Levels", id: "oLevels" },
        { name: "A Levels", id: "aLevels" },
        { name: "Secondary", id: "secondary" },
        { name: "Matric", id: "matric" },
        { name: "FSC", id: "fsc" },

    ];

    const changeHandler = (event) => {
        const uploadFile = async (event) => {
            setSelectedFile(event.target.files[0]);
            setIsSelected(true);
            // setFileUrl(URL.createObjectURL(event.target.files[0]));
            //Since a file is selected upload to server 
            let data = [];
            console.log(event.target.files, "<<<Files array >>>>");
            let resultToReturn = [];
            try {
                //ratedTo, rating, feedback
                let dataBody = {
                    file: event.target.files[0],
                };
                let fd = new FormData();
                fd.append("file", event.target.files[0] );
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };


                const uploadImage = await axios.post(`${apiUrl}users/upload-image`, fd, config);
                console.log(uploadImage, "Image uploaded");
                if (!uploadImage.data) {
                    throw "Something went wrong. Please try again";
                }
                setFileUrl(uploadImage.data.url);
            } catch (err) {
                console.log("Error occured ", err);
                toast.error("Something went wrong while uploading image");
            } finally {

            }
        };
        uploadFile(event);
    }
    
    const styleObject = {
        chips: { // To change css chips(Selected options)
            background: "#398b67"
        },

    }
    return (
        <AnimatePresence exitBeforeEnter>
            {
                showModal && (
                    <motion.div className="backdrop"
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        key={'childModal'}
                    >
                        <motion.div className="modal-body childModal"
                            variants={modalTransitions}
                        >
                            <div className="container d-flex justify-content-center">
                                <div className="card p-3 py-4">
                                    <div className="text-center"> 
                                        <div className="containerImg">
                                            {!isSelected && (
                                                <img src={ (typeof showModal == 'object') ? (mediaBaseUrl+showModal.image) : (mediaBaseUrl+'default.png')} alt="Avatar" className="image rounded-circle"  style={{maxWidth :"unset" , height: "100px",  width:"100px"}}  />
                                            )}
                                            {isSelected && (
                                                <img className="image-upload-ph image" src={mediaBaseUrl+fileUrl} style={{maxWidth :"unset" , height: "100px",  width:"100px"}} />
                                            )}
                                            <div className="middle">
                                                <div className="text" onClick={() => document.getElementById("profile_img").click()}>Change Image</div>
                                                <input type="file" id="profile_img" name="profile_image" onChange={changeHandler} style={{maxWidth :"unset" , height: "100px",  width:"100px"}} />
                                            </div>
                                        </div>                                        
                                        <h3 className="mt-2">{typeof showModal == 'object' ? ('Edit '+showModal.name) : ('Add child')}</h3> 
                                        {/* <start of body */}
                                        <div className="row placeani">
                                        <div className="col-lg-6 ">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="name" type="text" required="" className="form-control valid-character" placeholder="Name" onChange={(event)=>setName(event.target.value)} defaultValue={showModal && showModal.name}/>
                                                </div>
                                            </div>
                                        </div>                                
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="age" type="text" required="" className="form-control int-value" onChange={(event)=>setAge(event.target.value)} placeholder="age" defaultValue={showModal && showModal.age} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <select
                                                            className="form-control"
                                                            value={showModal && (qualification || '')} // Preselected value to persist in dropdown
                                                            onChange={(event)=>setQualification(event.target.value)}
                                                        >      
                                                          {gradeList && (gradeList.map(grade=>(<option value={grade.id} key={grade.id}>{grade.name}</option>)) )}
                                                        </select>
                                                    </div>
                                                </div>
                                        </div>


                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <textarea name="summary" rows="1" style={{height:'58px'}} className="form-control" required="" onChange={(event)=>setSummary(event.target.value)} placeholder="summary" defaultValue={showModal && showModal.summary}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <Multiselect
                                                            className="form-control"
                                                            styleObject={styleObject}
                                                            selectedValues={showModal && (showModal.subjects)}
                                                            options={subjectList} // Options to display in the dropdown
                                                            onSelect={setSubject} // Function will trigger on select event
                                                            onRemove={setSubject} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        />
                                                    </div>
                                                </div>
                                            </div>
							</div>                                        
                            {/* End of body */}
                                        <div>
                                            <button className="btn mr-4  " onClick={()=>update()}>
                                                Save
                                                {
                                                    beingSaved && ( <img src="assets/images/loader.gif" className="ratingLoader" />)
                                                }
                                            </button>
                                            <button className="btn btn-danger" onClick={()=>{setShowModal(false);resetForm();}}>
                                                Cancel 
                                            </button>
                                        </div>
                                        { error_message && 
                                                (<div className="validation-errors">{error_message}</div>)
                                            }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
            <Toaster/>
        </AnimatePresence>

    )
}

export default ChildModal;

