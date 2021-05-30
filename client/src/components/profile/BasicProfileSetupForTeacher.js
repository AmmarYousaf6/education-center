import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearAlert } from '../../actions/alert';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import Alert from './../layout/Alert';
//For toast notifications
import toast, { Toaster } from 'react-hot-toast';


import GooglePlacesAutocomplete , { geocodeByAddress, getLatLng }  from "react-google-places-autocomplete";
import { Multiselect } from 'multiselect-react-dropdown';
import TimeRangeSlider from 'react-time-range-slider';

import { saveBasicProfile } from '../../actions/profile';
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = process.env.REACT_APP_SERVER_URL;

const BasicTeacherProfileSetup = ({ clearAlert, isAuthenticated, auth: { user }, profile: { userType }, saveBasicProfile }) => {
    const history = useHistory();
    const [subject, setSubject] = useState([]);
    const [grade, setGrade] = useState([]);
    const [locationValue, setLocationValue] = useState([]);
    const [beingSaved, setBeingSaved] = useState(false);
    const [formData, setFormData] = useState({
        experience: '',
        summary : '' ,
        qualification: '',
        age: '',
        salary: '',
        introduction: '',
        curriculum: ''
    });
    const { experience, qualification, age, salary, introduction, curriculum , summary } = formData;

    const [timeMonday, setTimeMonday] = useState({ day: 'Monday', start: "00:00", end: "23:59" });
    const [timeTuesday, setTimeTuesday] = useState({ day: 'Tuesday', start: "02:00", end: "10:59" });
    const [timeWednesday, setTimeWednesday] = useState({ day: 'Wednesday', start: "00:00", end: "23:59" });

    const [timeThursday, setTimeThursday] = useState({ day: 'Thursday', start: "02:00", end: "10:59" });
    const [timeFriday, setTimeFriday] = useState({ day: 'Friday', start: "00:00", end: "23:59" });
    const [timeSaturday, setTimeSaturday] = useState({ day: 'Saturday', start: "02:00", end: "10:59" });
    const [timeSunday, setTimeSunday] = useState({ day: 'Sunday', start: "00:00", end: "23:59" });

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
        {name : "Biology" , id : "biology" },
        {name : "Business" , id : "business" },
        {name : "Economics" , id : "economics" },
        {name : "Accounting" , id : "accounting" },
        {name : "Sociology" , id : "sociology" },
        {name : "Psychology" , id : "psychology" },
        {name : "Art" , id : "art" },
        {name : "FSc/FA" , id  : "fsc/fa" },
        {name : "Holy Quran" , id  : "holyQuran" }
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
        if (day == 'Monday') {
            setTimeMonday({ start: time.start, end: time.end, day: day });
        } else if (day == 'Tuesday') {
            setTimeTuesday({ start: time.start, end: time.end, day: day });
        } else if (day == 'Wednesday') {
            setTimeWednesday({ start: time.start, end: time.end, day: day });
        } else if (day == 'Thursday') {
            setTimeThursday({ start: time.start, end: time.end, day: day });
        } else if (day == 'Friday') {
            setTimeFriday({ start: time.start, end: time.end, day: day });
        }else if (day == 'Saturday') {
            setTimeSaturday({ start: time.start, end: time.end, day: day });
        }else if (day == 'Sunday') {
            setTimeSunday({ start: time.start, end: time.end, day: day });
        }
        //setTimeSlot([{day: 'Monday', start: time.start, end: time.end}, ...timeSlot]);
    }

    const handleValueChange = (e) => {
        let placeId = e.value.place_id;
        let location = e.label;
        geocodeByAddress(e.label )
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>{
            setLocationValue([{ location, lat ,lng }, ...locationValue]);
        });
        // setLocationValue([{ location, placeId }, ...locationValue]);

    }
    const validateForm = () => {
        try {
            if (!formData.age || isNaN(formData.age)) {
                throw "Invalid age provided.";
            }
            if(!formData.experience   || isNaN(formData.experience) ){
                throw "Invalid experience provided.";

            }
            if(!formData.qualification ){
                throw "Invalid qualification provided.";

            } 
            if(!formData.salary || isNaN(formData.salary) ){
                throw "Invalid salary provided.";
            }
            if(!selectedFile)
            {
                throw "Please select a picture";
            }
            return false;
        } catch (err) {
            setBeingSaved(false);
            toast.error(err);
            return true;
        }
    }
    const saveChanges = () => {
        setBeingSaved(true);
        if (validateForm()) {
            return;
        }
        let timeSlot = { timeMonday, timeTuesday, timeWednesday , timeThursday , timeFriday , timeSaturday , timeSunday  };
        setTimeSlot(timeSlot);
        let postData = { 'subjects': subject, 'grades': grade, 'target_area': locationValue, 'slots': timeSlot, 'userType': userType }
        const data = new FormData();
        data.append('subject', JSON.stringify(subject) );
        data.append('grade', JSON.stringify(grade) );
        data.append('locationValue', JSON.stringify(locationValue) );
        data.append('profilePicture', selectedFile);
        data.append('timeSlot', JSON.stringify(timeSlot) );
        data.append('userType', userType);
        data.append('file', selectedFile);
        Object.keys(formData).forEach(k => data.append(k, formData[k]));
        console.log(data, "Gonna update in save changes method ", formData);
        saveBasicProfile(data, history);
    }

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    if (!isAuthenticated) {

        return <Redirect to="/login" />;

    }

    return (
        <Fragment>
            <div className="account-form">
                <div className="account-head" style={{ backgroundImage: "url(assets/images/background/bg2.jpg)" }}>
                    <Link to="/"><img src="https://res.cloudinary.com/home-tutor/image/upload/v1617753560/edu_tutor/default-monochrome_v6idag.svg" width="300" alt="" /></Link>
                </div>
                <div className="account-form-inner">
                    <div className="account-container account-container-custom">
                        <div className="heading-bx left">
                            <h2 className="title-head text-center title-head-text-cust">Almost Done ! <br /><span style={{ fontSize: "24px" }}>Please provide filter criteria to help us find the right match.</span></h2>

                        </div>
                        <div className="teacher-section">

                            <form className="contact-bx">
                                <div className="row placeani">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            
                                            <div className="col-lg-4 mt-5">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input id="file-upload" type="file" name="file" onChange={changeHandler} />

                                                        {isSelected && (
                                                            <img className="image-upload-ph" src={fileUrl} />
                                                        )}
                                                        <label htmlFor="file-upload" className="custom-file-upload" style={{ position: 'unset' }}>
                                                            <i className="fa fa-cloud-upload"></i> Upload Your Picture
                                                    </label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="form-group">
                                                    <label className="col-form-label">Summary </label>
                                                    <div className="input-group">
                                                        <input
                                                            name="summary"
                                                            placeholder="Summary"
                                                            className="form-control"
                                                            required=""
                                                            value={summary}
                                                            onChange={e => onChange(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Experience (Years)</label>
                                                    <div className="input-group">
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
                                                    <label className="col-form-label">Qualification</label>
                                                    <div className="input-group">
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
                                                <label className="col-form-label">Age (Years)</label>
                                                    <div className="input-group">
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
                                                    <label className="col-form-label">Salary (Monthly)</label>
                                                    <div className="input-group">
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

                                        {/* <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="col-form-label">Video link</label>
                                                    <div className="input-group">
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
                                        </div> */}
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="col-form-label">Subjects</label>
                                                    <div className="input-group">
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
                                                    <label className="col-form-label">Grades</label>
                                                    <div className="input-group">
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
                                                    <label className="col-form-label">Areas</label>
                                                    <div className="input-group">
                                                        <GooglePlacesAutocomplete
                                                            placeholder="Select areas"
                                                            selectProps={{
                                                                locationValue,
                                                                onChange: function (e) {
                                                                    handleValueChange(e);
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                    {locationValue.map(value => (
                                                        <div className="suggested-items-sty" key={value.placeId}>
                                                            {value.location}
                                                            <span className="close-place" onClick={()=>locationValue.filter(l=>l.placeId != value.placeId)}> X</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="header-day-parent slider-label"><span className="header-day">Monday </span>StartTime : {timeMonday.start} - EndTime : {timeMonday.end} </div>
                                                    <TimeRangeSlider
                                                        disabled={false}
                                                        format={24}
                                                        maxValue={"23:59"}
                                                        minValue={"00:00"}
                                                        name={"time_range"}
                                                        onChange={(t) => timeChangeHandler(t, 'Monday')}
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
                                                        onChange={(t) => timeChangeHandler(t, 'Tuesday')}
                                                        step={15}
                                                        value={timeTuesday}
                                                        pickerClassName="range-class"
                                                    />

                                                    <div className="header-day-parent slider-label mt-3"><span className="header-day">Wednesday </span>StartTime : {timeWednesday.start} - EndTime : {timeWednesday.end} </div>
                                                    <TimeRangeSlider
                                                        disabled={false}
                                                        format={24}
                                                        maxValue={"23:59"}
                                                        minValue={"00:00"}
                                                        name={"time_range"}
                                                        onChange={(t) => timeChangeHandler(t, 'Wednesday')}
                                                        step={15}
                                                        value={timeWednesday}
                                                        pickerClassName="range-class"
                                                    />

                                                    <div className="header-day-parent slider-label mt-3"><span className="header-day">Thursday </span>StartTime : {timeThursday.start} - EndTime : {timeThursday.end} </div>
                                                    <TimeRangeSlider
                                                        disabled={false}
                                                        format={24}
                                                        maxValue={"23:59"}
                                                        minValue={"00:00"}
                                                        name={"time_range"}
                                                        onChange={(t) => timeChangeHandler(t, 'Thursday')}
                                                        step={15}
                                                        value={timeThursday}
                                                        pickerClassName="range-class"
                                                    />

                                                    <div className="header-day-parent slider-label mt-3"><span className="header-day">Friday </span>StartTime : {timeFriday.start} - EndTime : {timeFriday.end} </div>
                                                    <TimeRangeSlider
                                                        disabled={false}
                                                        format={24}
                                                        maxValue={"23:59"}
                                                        minValue={"00:00"}
                                                        name={"time_range"}
                                                        onChange={(t) => timeChangeHandler(t, 'Friday')}
                                                        step={15}
                                                        value={timeFriday}
                                                        pickerClassName="range-class"
                                                    />

                                                    <div className="header-day-parent slider-label mt-3"><span className="header-day">Saturday </span>StartTime : {timeSaturday.start} - EndTime : {timeSaturday.end} </div>
                                                    <TimeRangeSlider
                                                        disabled={false}
                                                        format={24}
                                                        maxValue={"23:59"}
                                                        minValue={"00:00"}
                                                        name={"time_range"}
                                                        onChange={(t) => timeChangeHandler(t, 'Saturday')}
                                                        step={15}
                                                        value={timeSaturday}
                                                        pickerClassName="range-class"
                                                    />

                                                    <div className="header-day-parent slider-label mt-3"><span className="header-day">Sunday </span>StartTime : {timeSunday.start} - EndTime : {timeSunday.end} </div>
                                                    <TimeRangeSlider
                                                        disabled={false}
                                                        format={24}
                                                        maxValue={"23:59"}
                                                        minValue={"00:00"}
                                                        name={"time_range"}
                                                        onChange={(t) => timeChangeHandler(t, 'Sunday')}
                                                        step={15}
                                                        value={timeSunday}
                                                        pickerClassName="range-class"
                                                    />

                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-12 text-right">
                                            <button type="reset" className="btn" onClick={saveChanges}>
                                            {!beingSaved && ('Save Changes')}
                                                {beingSaved && (
                                                    <img src="assets/images/loader.gif" className="ratingLoader" />
                                                )}
                                                </button>
                                                <button type="reset" className="btn-secondry" onClick={() => history.push('/')}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <Alert />
                            <Toaster />
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

BasicTeacherProfileSetup.propTypes = {
    login: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { login, clearAlert, saveBasicProfile })(BasicTeacherProfileSetup);