import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import Alert from './../layout/Alert';

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Multiselect } from 'multiselect-react-dropdown';
import TimeRangeSlider from 'react-time-range-slider';

import {saveBasicProfile} from '../../actions/profile';

const BasicProfileSetup = ({ clearAlert, isAuthenticated, auth: {user}, profile: { userType }, saveBasicProfile }) => {

    const [subject, setSubject] = useState([]);
    const [grade, setGrade] = useState([]);
    const [locationValue, setLocationValue] = useState([]);

    const [formData, setFormData] = useState({
        experience: '',
        qualification: '',
        age: '',
        salary: '',
        introduction: '',
        curriculum: ''
    });

    const { experience, qualification, age, salary, introduction, curriculum } = formData;

    const [timeMonday, setTimeMonday] = useState({day: 'Monday', start: "00:00", end: "23:59"});
    const [timeTuesday, setTimeTuesday] = useState({day: 'Tuesday', start: "02:00", end: "10:59"});
    const [timeWednesday, setTimeWednesday] = useState({day: 'Monday', start: "00:00", end: "23:59"});

    const [timeThursday, setTimeThursday] = useState({day: 'Tuesday', start: "02:00", end: "10:59"});
    const [timeFriday, setTimeFriday] = useState({day: 'Monday', start: "00:00", end: "23:59"});

    const [timeSlot, setTimeSlot] = useState([]);

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
        setFileUrl(URL.createObjectURL(event.target.files[0]));
	};

    const handleSubmission = () => {
		console.log(selectedFile);
	};

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
        { name: "Bio", id: "bio" },
    ];

    const gradeList = [
        { name: "Primary", id: "primary" },
        { name: "O Levels", id: "oLevels" },
        { name: "A Levels", id: "aLevels" },
        { name: "Secondary", id: "secondary" },
        { name: "Matric", id: "matric" },
        { name: "FSC", id: "fsc" },
        
    ];

     const styleObject = {
        chips: { // To change css chips(Selected options)
            background: "#398b67"
        },
        
    }

    const timeChangeHandler = (time, day) => {
        if(day == 'Monday'){
            setTimeMonday({start: time.start, end: time.end, day: day});
        }else if(day == 'Tuesday') {
            setTimeTuesday({start: time.start, end: time.end, day: day});
        }else if(day == 'Wednesday') {
            setTimeWednesday({start: time.start, end: time.end, day: day});
        }else if(day == 'Thursday') {
            setTimeThursday({start: time.start, end: time.end, day: day});
        }else if(day == 'Friday') {
            setTimeFriday({start: time.start, end: time.end, day: day});
        }
        console.log(day);
        //setTimeSlot([{day: 'Monday', start: time.start, end: time.end}, ...timeSlot]);
    }

    const handleValueChange = (e) => {
        let placeId = e.value.place_id;
        let location = e.label;
        console.log(placeId);
        setLocationValue([{ location, placeId }, ...locationValue]);

        console.log(locationValue);

    }

    const saveChanges = () => {
        let timeSlot = { timeMonday, timeTuesday};
        setTimeSlot(timeSlot);
        let postData = {'subjects': subject, 'grades': grade, 'target_area': locationValue, 'slots': timeSlot, 'userType': userType}
        const data = new FormData();
        data.append('subject', subject);
        data.append('grade', grade);
        data.append('locationValue', locationValue);
        data.append('profilePicture', selectedFile);
        data.append('timeSlot', timeSlot);
        data.append('userType', userType);
        
        console.log(data);
        saveBasicProfile(postData);
    }

    const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (!isAuthenticated) {

        return <Redirect to="/login" />;

    }

    return (
        <Fragment>  
            <div className="account-form">
                <div className="account-head" style={{backgroundImage:"url(assets/images/background/bg2.jpg)"}}>
                    <Link to="/"><img src="assets/images/logo.png" width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container account-container-custom">
                        <div className="heading-bx left">
                            <h2 className="title-head text-center title-head-text-cust">Almost Done ! <br /><span style={{ fontSize: "24px"}}>Please provide filter criteria to help us find the right match.</span></h2>
                            
                        </div>
                        <div className="teacher-section">	

                            <form className="contact-bx">
                                <div className="row placeani">
                                    <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Select Experience</label>
                                                    <input 
                                                        name="experience" 
                                                        placeholder="Enter your experience"
                                                        type="number" 
                                                        className="form-control" 
                                                        required="" 
                                                        autoComplete="one-time-code"
                                                        value={experience}
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Enter Your Qualification</label>
                                                    <input 
                                                        name="qualification" 
                                                        placeholder="Enter your qualification"
                                                        type="text" 
                                                        className="form-control" 
                                                        required="" 
                                                        autoComplete="one-time-code"
                                                        value={qualification}
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Enter Your Age</label>
                                                    <input 
                                                        name="age" 
                                                        placeholder="Enter your age"
                                                        type="number" 
                                                        className="form-control" 
                                                        required="" 
                                                        autoComplete="one-time-code"
                                                        value={age}
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Enter Your Salary</label>
                                                    <input 
                                                        name="salary" 
                                                        placeholder="Enter your salary"
                                                        type="number" 
                                                        className="form-control" 
                                                        required="" 
                                                        autoComplete="one-time-code"
                                                        value={salary}
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                    <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Enter Your Introduction Video Link</label>
                                                    <input 
                                                        name="introduction" 
                                                        placeholder="Enter your introduction video link"
                                                        type="text" 
                                                        className="form-control" 
                                                        required="" 
                                                        autoComplete="one-time-code"
                                                        value={introduction}
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <label>What subjects you can teach ?</label>
                                                    <Multiselect
                                                        options={subjectList} // Options to display in the dropdown
                                                        selectedValues={subject} // Preselected value to persist in dropdown
                                                        onSelect={setSubject} // Function will trigger on select event
                                                        style={styleObject}
                                                        onRemove={setSubject} // Function will trigger on remove event
                                                        displayValue="name" // Property name to display in the dropdown options
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>What grades you can teach ?</label>
                                                    <Multiselect
                                                        options={gradeList} // Options to display in the dropdown
                                                        selectedValues={grade} // Preselected value to persist in dropdown
                                                        onSelect={setGrade} // Function will trigger on select event
                                                        style={styleObject}
                                                        onRemove={setGrade} // Function will trigger on remove event
                                                        displayValue="name" // Property name to display in the dropdown options
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group"> 
                                                    <label>Select your targeted areas</label>
                                                    <GooglePlacesAutocomplete
                                                        selectProps={{
                                                            locationValue,
                                                            onChange: function(e) {
                                                                handleValueChange(e);
                                                            },
                                                        }}     
                                                    />
                                                </div>
                                                {locationValue.map(value => (
                                                    <div className="suggested-items-sty" key={value.placeId}>
                                                        {value.location}
                                                        <span className="close-place">X</span>
                                                    </div>
                                                ))}                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <div className="input-group"> 
                                                <label>Please set your availability</label>

                                                <div className="header-day-parent slider-label"><span className="header-day">Monday </span>StartTime : {timeMonday.start} - EndTime : {timeMonday.end} </div>
                                                <TimeRangeSlider
                                                    disabled={false}
                                                    format={24}
                                                    maxValue={"23:59"}
                                                    minValue={"00:00"}
                                                    name={"time_range"}
                                                    onChange={(t) => timeChangeHandler(t, 'Monday') }
                                                    step={15}
                                                    value={timeMonday}
                                                    pickerClassName="range-class"
                                                />

                                                <div className="header-day-parent slider-label mt-3"><span className="header-day">Tuesday </span>StartTime : {timeTuesday.start} - EndTime : {timeTuesday.end} </div>
                                                <TimeRangeSlider
                                                    disabled={false}
                                                    format={24}
                                                    maxValue={"23:59"}
                                                    minValue={"00:00"}
                                                    name={"time_range"}
                                                    onChange={(t) => timeChangeHandler(t, 'Tuesday') }
                                                    step={15}
                                                    value={timeTuesday}
                                                    pickerClassName="range-class"
                                                />

                                                <div className="header-day-parent slider-label mt-3"><span className="header-day">Wednesday </span>StartTime : {timeTuesday.start} - EndTime : {timeTuesday.end} </div>
                                                <TimeRangeSlider
                                                    disabled={false}
                                                    format={24}
                                                    maxValue={"23:59"}
                                                    minValue={"00:00"}
                                                    name={"time_range"}
                                                    onChange={(t) => timeChangeHandler(t, 'Wednesday') }
                                                    step={15}
                                                    value={timeWednesday}
                                                    pickerClassName="range-class"
                                                />

                                                <div className="header-day-parent slider-label mt-3"><span className="header-day">Thursday </span>StartTime : {timeTuesday.start} - EndTime : {timeTuesday.end} </div>
                                                <TimeRangeSlider
                                                    disabled={false}
                                                    format={24}
                                                    maxValue={"23:59"}
                                                    minValue={"00:00"}
                                                    name={"time_range"}
                                                    onChange={(t) => timeChangeHandler(t, 'Thursday') }
                                                    step={15}
                                                    value={timeThursday}
                                                    pickerClassName="range-class"
                                                />

                                                <div className="header-day-parent slider-label mt-3"><span className="header-day">Friday </span>StartTime : {timeTuesday.start} - EndTime : {timeTuesday.end} </div>
                                                <TimeRangeSlider
                                                    disabled={false}
                                                    format={24}
                                                    maxValue={"23:59"}
                                                    minValue={"00:00"}
                                                    name={"time_range"}
                                                    onChange={(t) => timeChangeHandler(t, 'Friday') }
                                                    step={15}
                                                    value={timeFriday}
                                                    pickerClassName="range-class"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                

                                    <div className="col-lg-12 text-right">
                                        <button type="reset" class="btn" onClick={saveChanges}>Save Changes</button>
                                    </div>
                                   
                                </div>
                                </div>
                            </form>
                            
                            <Alert />
                        </div>
                        
                    </div>
                </div>
	        </div>
        </Fragment>
    );
}

BasicProfileSetup.propTypes = {
    login: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { login, clearAlert, saveBasicProfile })(BasicProfileSetup);