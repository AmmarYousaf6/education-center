const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const md5 = require('md5');
const jwtDecode = require('jwt-decode');
const multer = require('multer');
var metaphone = require('metaphone')
var cloudinary = require('cloudinary');
const util = require('util')

const cloudinaryConf = {
    cloud_name: "home-tutor",
    api_key: "935911474249697",
    api_secret: "IKj8Ghx6Grhvy-zS28gnZVftDT8"
};
const streamifier = require('streamifier');

const getUser = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);

    let user_type = userInfo.user_type;
    const getUserById = {
        text : 'SELECT * FROM users WHERE id = $1',
        values : [userInfo.userID]
    }
    const getUserSubjects = {
        text : 'SELECT name FROM user_subjects WHERE user_id = $1',
        values : [userInfo.userID]
    }
    const getUserGrades = {
        text : 'SELECT name FROM user_grades WHERE user_id = $1',
        values : [userInfo.userID]
    }
    const getUserAreas = {
        text : 'SELECT name FROM user_target_areas WHERE user_id = $1',
        values : [userInfo.userID]
    }
    const getUserSlots = {
        text : 'SELECT day, time FROM user_slots WHERE user_id = $1',
        values : [userInfo.userID]
    }
    const getChildren = {
        text : 'SELECT * FROM children WHERE parent_id = $1',
        values : [userInfo.userID]
    }
    try {
        const response  = await database.query(getUserById);
        
        if (!response.rows[0]) {
            return res.status(400).send({'message': 'The credentials you provided is incorrect'});
        }
        else {
            let data = response.rows[0];
            if(response.rows[0].user_type){
                if(user_type == 'teacher'){
                    const subjects  = await database.query(getUserSubjects);
                    const grades  = await database.query(getUserGrades);
                    const areas  = await database.query(getUserAreas);
                    const slots  = await database.query(getUserSlots);
                    data.subjects = subjects.rows;
                    data.grades = grades.rows;
                    data.areas = areas.rows;
                    data.slots = slots.rows;
                } else {
                    const children = await database.query(getChildren);
                    data.children = children.rows;
                }
                
                
            }
            res.status(200).json({
                status: 1,
                message: 'success',
                user : data
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}
const activateUser = async (req,res,next) => {
    const userId = req.params.userId;
    //Generating token
    const rand=()=>Math.random(0).toString(36).substr(2);
    const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);
    let createdToken = token(20);

    const activateUser = {
        text : 'Update users SET status = 1 , token = $1 WHERE id = $2',
        values : [ createdToken , userId]
    }
    try {
        const query = await database.query(activateUser);
        if(query.rowCount > 0){
            res.redirect(process.env.HOST_FRONT_URL+'/activate/'+createdToken);
        } else {
            res.status(500).json({
                status: 0,
                message: 'Unable to activate the user'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}
const forgotPassword = async (req,res,next) => {
    const {email} = req.body;
    //check if email exists
    checkUserExists(email, (err,results)=> {
        if (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        if (!results) {
            res.status(500).json({
                status: 0,
                message: 'User has not registered yet!'
            });
        }
        if (results.status == 0) {
            res.status(500).json({
                status: 0,
                message: 'User is not activated yet!'
            });
        }
        res.email = email;
        res.subject = 'Reset Password';
        res.body = '<a href="'+process.env.HOST_FRONT_URL+'/reset-password/' + results.userId + '" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Reset Password</a>';
        res.status_message = true;
        next();
    });
}
function checkUserExists(email, callback){
    const getUserByEmail = {
        text : 'SELECT id,email,status FROM users WHERE email = $1',
        values : [email]
    }
    try {
        const query = database.query(getUserByEmail).then(res => {
            if(res.rows.length > 0){
                callback(null, {email : res.rows[0].email, status : res.rows[0].status, userId : res.rows[0].id})
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}
const resetPassword = async (req,res,next) => {
    const {userId, password} = req.body;
    let encryptPassword = md5(password);
    const updatePassword = {
        text : 'Update users SET password = $1 WHERE id = $2',
        values : [encryptPassword, userId]
    }
    try {
        const response  = await database.query(updatePassword);
        if (response.rowCount < 1) {
            res.status(400).json({
                status: 0,
                message: 'No user found',
            });
        }
        else {
            res.status(200).json({
                status: 1,
                message: 'Your password has been updated!'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: callback(err)
        });
    }
}

const updateBasicProfile = async (req,res , image) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let {userType, subject, grade, locationValue, timeSlot , summary, experience, qualification,age, salary, duration_of_commitment, video_introduction, hours_per_day} = req.body;
    let target_area = locationValue;
    let slots = timeSlot;

    console.log(typeof target_area , eval(target_area) , ":::::");
    if(userType == 'teacher' || userType == 'parent'){
        /* Update user type */
        let imageQry ='';
        let imageArr = [];
        if(image){
            imageQry = ', image = $11';
            imageArr = [image];
        }

        const updateType = {
            text : 'Update users SET user_type = $1, summary = $2, experience = $3, qualification = $4, age = $5, salary = $6, duration_of_commitment = $7, video_introduction = $8, hours_per_day = $9 '+imageQry+'WHERE id = $10',
            values : [userType, summary, experience, qualification, age, salary, duration_of_commitment, video_introduction, hours_per_day, userInfo.userID].concat(imageArr)
        }
        
        try {
            const response  = await database.query(updateType);
            if (response.rowCount < 1) {
                res.status(400).json({
                    status: 0,
                    message: 'Cannot update user type',
                });
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        /* ** */
        /* Update subjects */
        if(subject && eval(subject).length > 1){
            /* Remove subjects if they exists */
            const removeSubjects = {
                text : 'DELETE FROM user_subjects WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removeSubjects); 
            /* *** */
            let getSubjects = eval(subject);
            console.log("Subjects ", getSubjects);
            for(let i = 0; i<getSubjects.length; i++){
                let text = 'INSERT INTO user_subjects(user_id, name) VALUES($1, $2) RETURNING *'
                let values = [userInfo.userID, getSubjects[i].name];
                try {
                    const query = await database.query(text, values).then((res) => {
                       console.log('updated subjects')
                    });
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        /* Update grades */
        if(grade && eval(grade).length > 1){
            /* Remove grades if they exists */
            const removeGrades = {
                text : 'DELETE FROM user_grades WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removeGrades);
            /* *** */
            let getGrades = eval(grade);
            console.log("Grades" , getGrades) ;
            for(let i = 0; i<getGrades.length; i++){
                let text = 'INSERT INTO user_grades(user_id, name) VALUES($1, $2) RETURNING *'
                let values = [userInfo.userID, getGrades[i].name];
                try {
                    await database.query(text, values);
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        console.dir(target_area, { depth: null });
        // console.log(JSON.stringify(target_area) , "<<<")
        /* Update Target Area */
        if(target_area && eval(target_area).length > 1){
            /* Remove target_area if they exists */
            const removetarget_area = {
                text : 'DELETE FROM user_target_areas WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removetarget_area);
            /* *** */
            let gettarget_area = eval(target_area);
            console.log("Targeted areas " , gettarget_area);
            for(let i = 0; i<gettarget_area.length; i++){
                let text = 'INSERT INTO user_target_areas(user_id, name, latitude , longitude , meta_name ) VALUES($1, $2 , $3, $4, $5) RETURNING *'
                let values = [userInfo.userID, gettarget_area[i].location , gettarget_area[i].lat , gettarget_area[i].lng , metaphone(gettarget_area[i].location) ];
                try {
                    await database.query(text, values);
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        /* Update Time slot */
   
        if(slots && Object.keys(JSON.parse(slots) ).length ){
            /* Remove slots if they exists */
            const removeslots = {
                text : 'DELETE FROM user_slots WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removeslots);
            /* *** */
            let slotKeys= Object.keys(JSON.parse(slots) );
            let getSlots = JSON.parse(slots);
            slotKeys.forEach(async (i)=>{
                let slotType = getSlots[i]['timeMonday'] ? 'timeMonday' : getSlots[i]['timeTuesday'] ? 'timeTuesday' : getSlots[i]['timeWednesday'] ? 'timeWednesday' : getSlots[i]['timeThursday'] ? 'timeThursday' : getSlots[i]['timeFriday'] ? 'timeFriday' : getSlots[i]['timeSaturday'] ? 'timeSaturday' : getSlots[i]['timeSunday'] ? 'timeSunday' : '';
                let slotNow = getSlots[i];
                let day = slotNow.day;
                let time = slotNow.start+' - '+slotNow.end;
                let text = 'INSERT INTO user_slots(user_id, day, time) VALUES($1, $2, $3) RETURNING *'
                let values = [userInfo.userID, day, time];
                try {
                    await database.query(text, values);
                } catch (err) {
                    console.log(err.stack)
                }

            })            
        }
        /* Upload Image */
        res.status(200).json({
            status: 1,
            message: 'Your profile has been updated successfully!'
        });
        
        /* ***** */
    } else {
        console.log('wwwww')
        res.status(400).json({
            status: 0,
            message: 'You can only register as a teacher or parent!',
        });
    }
    
}
const getChildren = async (req, res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const getChildren = {
        text : ' select ch.* , STRING_AGG (cs.name , \',\' ) as subjects from children ch left join child_subjects cs on ch.id=cs.child_id WHERE parent_id = $1 group by ch.id , ch.parent_id , ch.name , ch.qualification , ch.summary , ch.age , ch.status , ch.image  ',
        values : [userInfo.userID]
    }
    console.log(getChildren);
    try {
        const query = database.query(getChildren).then(response => {
            if(response.rows.length > 0){
                res.status(200).json({
                    status: 1,
                    message: 'Success',
                    data : response.rows
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message: 'No list of children found',
                    data : []
                });
            }
        })
    } catch (err) {
        callback(err);
    }
}
const getChild = async (req, res) => {
    const {childId} = req.params;
    const getChild = {
        text : 'SELECT * FROM children WHERE id = $1',
        values : [childId]
    }
    const getUserSubjects = {
        text : 'SELECT name FROM user_subjects WHERE user_id = $1',
        values : [childId]
    }
    try {
        
        const query = database.query(getChild).then(async response => {
            let data = response.rows[0];
            
            if(response.rows.length > 0){
                const subjects  = await database.query(getUserSubjects);
                data.subjects = subjects.rows;
                res.status(200).json({
                    status: 1,
                    message: 'Success',
                    data : response.rows[0]
                });
            } else {
                res.status(500).json({
                    status: 0,
                    message: 'No user found',
                    data : []
                });
            }
        })
    } catch (err) {
        callback(err);
    }
}
const addChildren = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let {name, qualification, subjects, summary, age, image} = req.body;
        /* Update user type */
        const addChildren = {
            text : 'INSERT INTO children(parent_id, name, qualification, summary, age, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            values : [userInfo.userID, name, qualification, summary, age, image]
        }
        try {
            const response  = await database.query(addChildren);
            if (response.rowCount < 1) {
                res.status(400).json({
                    status: 0,
                    message: 'Something went wrong. Please try again!',
                });
            } else {
                 /* Update subjects */
            if(subjects && eval(subjects).length > 1){
                let getSubjects = eval(subjects);
                console.log('here')
                for(let i = 0; i<getSubjects.length; i++){
                    
                    let text = 'INSERT INTO child_subjects(child_id, name) VALUES($1, $2) RETURNING *'
                    let values = [response.rows[0].id, getSubjects[i].name];
                    try {
                        const query = await database.query(text, values).then((res) => {
                        console.log('updated subjects')
                        });
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }
                res.status(200).json({
                    status: 1,
                    message: 'Success'
                });
            }
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
}
const updateChildren = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let {name, summary, qualification, age, image, childId, subjects} = req.body;
    console.log(childId)
        /* Update user type */
        const updateType = {
            text : 'Update children SET name = $1, summary = $2, qualification = $3, age = $4, image = $5 WHERE id = $6',
            values : [name, summary, qualification, age, image, childId]
        }
        
        try {
            const response  = await database.query(updateType);
            if (response.rowCount < 1) {
                res.status(400).json({
                    status: 0,
                    message: 'Cannot update user type',
                });
            }
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        /* ** */
        /* Update subjects */
        if(subjects && eval(subjects).length > 1){
            /* Remove subjects if they exists */
            const removeSubjects = {
                text : 'DELETE FROM child_subjects WHERE child_id = $1',
                values : [childId]
            }
            database.query(removeSubjects);
            /* *** */
            let getSubjects = eval(subjects);
            for(let i = 0; i<getSubjects.length; i++){
                let text = 'INSERT INTO child_subjects(child_id, name) VALUES($1, $2) RETURNING *'
                let values = [childId, getSubjects[i].name];
                try {
                    const query = await database.query(text, values)
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        res.status(200).json({
            status: 1,
            message: 'Child profile has been updated successfully!'
        });
    

}
const removeChild = async (req, res) => {
    const {childId} = req.params;
    const removeChild = {
        text : 'DELETE FROM children WHERE id = $1',
        values : [childId]
    }
    try {
        database.query(removeChild);
        res.status(200).json({
            status: 1,
            message: 'Child has been removed',
        });
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
    
}
const getTeachers = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const getUserById = {
        text : 'SELECT * FROM users WHERE user_type = $1 AND id != $2',
        values : ['teacher', userInfo.userID]
    }
    try {
        const response  = await database.query(getUserById);
        
        if (!response.rows[0]) {
            return res.status(400).send({'message': 'No user found'});
        }
        else {
            let data = response.rows;
            res.status(200).json({
                status: 1,
                message: 'success',
                user : data
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}
const getProfileById = async (req,res) => {
    const {userId} = req.params;
    console.log(userId)
    const getUserById = {
        text : 'SELECT * FROM users WHERE id = $1',
        values : [userId]
    }
    const getUserSubjects = {
        text : 'SELECT name FROM user_subjects WHERE user_id = $1',
        values : [userId]
    }
    const getUserGrades = {
        text : 'SELECT name FROM user_grades WHERE user_id = $1',
        values : [userId]
    }
    const getUserAreas = {
        text : 'SELECT name, latitude, longitude FROM user_target_areas WHERE user_id = $1',
        values : [userId]
    }
    const getUserSlots = {
        text : 'SELECT day, time FROM user_slots WHERE user_id = $1',
        values : [userId]
    }
    const getAverageRating = {
        text : 'SELECT AVG(rating) as averageRating FROM ratings WHERE rated_to = $1',
        values : [userId]
    }
    //Added by Malik Ahsan aftab
    const getAllRatings = {
        text : 'SELECT rating FROM ratings WHERE rated_to = $1',
        values : [userId]
    }
    const getViewCount = {
        text : 'SELECT count(*) FROM profile_views WHERE teacher_id = $1',
        values : [userId]
    }
    try {
        const response  = await database.query(getUserById);
        
        if (!response.rows[0]) {
            res.status(200).json({
                status: 1,
                message: 'No data found',
                user : []
            });
        }
        else {
            let data = response.rows[0];
            if(response.rows[0].user_type){
                const subjects  = await database.query(getUserSubjects);
                const grades  = await database.query(getUserGrades);
                const areas  = await database.query(getUserAreas);
                const slots  = await database.query(getUserSlots);
                const rating  = await database.query(getAverageRating);
                const allRatings = await database.query(getAllRatings);
                const viewsCount = await database.query(getViewCount);
                // Map data
                data.rating = rating.rows[0].averagerating;
                data.subjects = subjects.rows;
                data.grades = grades.rows;
                data.areas = areas.rows;
                data.slots = slots.rows;
                data.ratings = allRatings.rows; 
                data.viewsCount = viewsCount.rows;               
            }
            res.status(200).json({
                status: 1,
                message: 'success',
                user : data
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}
const sendInvite = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let userId,participant_id;
    if(userInfo.user_type == 'parent'){
        userId = userInfo.userID;
        participant_id = req.params.userId;
    } else {
        userId = req.params.userId;
        participant_id = userInfo.userID;
    }
    checkConnectionExists(userId,participant_id, async (err,results)=> {
        if (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        if (!results) {
            const text = 'INSERT INTO user_connections(user_id, participant_id,status ) VALUES($1, $2, $3) RETURNING *'
            const values = [userId, participant_id, 'pending'];
            try {
                const query = await database.query(text, values).then((response) => {
                    res.status(200).json({
                        status : 1,
                        message : 'Invite has been sent successfully!',
                        session : response.rows[0]
                    });
                });
                
            } catch (err) {
                res.status(500).json({
                    status : 0,
                    message : err.stack
                });
            }
        } else {
            res.status(200).json({
                status : 1,
                message : 'Connection already Exists',
                data : results
            });
        }
        
    });
}
const getUserConnectionSession = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let userId,participant_id;
    if(userInfo.user_type == 'parent'){
        userId = userInfo.userID;
        participant_id = req.params.userId;
    } else {
        userId = req.params.userId;
        participant_id = userInfo.userID;
    }
    checkConnectionExists(userId,participant_id, async (err,results)=> {
        if (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        if (!results) {
            res.status(200).json({
                status : 1,
                message : 'No connection exists.Please send an invite to to connect with the user',
                data : []
            });
        } else {
            res.status(200).json({
                status : 1,
                message : 'Connection exists',
                data : results
            });
        }
        
    });
}
function checkConnectionExists(userId, participant_id, callback){
    const checkConnectionExists = {
        text : 'SELECT id as session_id, user_id,participant_id,status FROM user_connections WHERE user_id = $1 AND participant_id = $2',
        values : [userId, participant_id]
    }
    try {
        const query = database.query(checkConnectionExists).then(res => {
            if(res.rows.length > 0){
                callback(null, res.rows[0])
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}
const updateInvite = async (req,res,next) => {
    const {id, status} = req.body;
    const updatePassword = {
        text : 'Update user_connections SET status = $1 WHERE id = $2',
        values : [status, id]
    }
    try {
        const response  = await database.query(updatePassword);
        if (response.rowCount < 1) {
            res.status(400).json({
                status: 0,
                message: 'No data found',
            });
        }
        else {
            res.status(200).json({
                status: 1,
                message: 'Your request has been updated!'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: callback(err)
        });
    }
}
const myInvites = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let query;
    
    if(userInfo.user_type == 'parent'){ // AND participant_id = $2
        query = 'SELECT user_connections.id as session_id, name, qualification, gender, summary, user_connections.status as inviteStatus FROM user_connections JOIN users ON users.id = user_connections.participant_id  WHERE user_id = $1 AND user_connections.status = $2';
    } else {
        query = 'SELECT user_connections.id as session_id, name, qualification, gender, summary, user_connections.status as inviteStatus FROM user_connections JOIN users ON users.id = user_connections.user_id  WHERE participant_id = $1 AND user_connections.status = $2';
    }
    const getInvites = {
        text : query,
        values : [userInfo.userID, 'accepted']
    }
    try {
        const response  = await database.query(getInvites);
        if (response.rowCount < 1) {
            res.status(200).json({
                status: 1,
                message: 'No data found',
                data : []
            });
        }
        else {
            res.status(200).json({
                status: 1,
                message: 'Connection requests',
                data : response.rows
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: callback(err)
        });
    }
}
const myPendingInvites = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let query;
    
    if(userInfo.user_type == 'parent'){ // AND participant_id = $2
        query = 'SELECT user_connections.id as session_id, name, qualification, gender, summary, user_connections.status as inviteStatus FROM user_connections JOIN users ON users.id = user_connections.participant_id  WHERE user_id = $1 AND user_connections.status = $2';
    } else {
        query = 'SELECT user_connections.id as session_id, name, qualification, gender, summary, user_connections.status as inviteStatus FROM user_connections JOIN users ON users.id = user_connections.user_id  WHERE participant_id = $1 AND user_connections.status = $2';
    }
    const getInvites = {
        text : query,
        values : [userInfo.userID, 'pending']
    }
    try {
        const response  = await database.query(getInvites);
        if (response.rowCount < 1) {
            res.status(200).json({
                status: 1,
                message: 'No data found',
                data : []
            });
        }
        else {
            res.status(200).json({
                status: 1,
                message: userInfo.user_type == 'teacher' ? 'Connection requests' : 'No data found',
                data : userInfo.user_type == 'teacher' ? response.rows : []
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: callback(err)
        });
    }
}
function isRated(userId, ratedTo, callback){
    const checkisRated = {
        text : 'SELECT * FROM ratings WHERE rated_by = $1 AND rated_to = $2',
        values : [userId, ratedTo]
    }
    try {
        const query = database.query(checkisRated).then(res => {
            if(res.rows.length > 0){
                callback(null, res.rows[0])
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}
const rateUser = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {ratedTo, rating, feedback} = req.body;
    isRated(userInfo.userID,ratedTo, async (err,results)=> {
        if (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        if (!results) {
            const text = 'INSERT INTO ratings(rated_by, rated_to, rating, feedback ) VALUES($1, $2, $3, $4) RETURNING *'
            const values = [userInfo.userID, ratedTo, rating,feedback ];
            try {
                const query = await database.query(text, values).then((response) => {
                    res.status(200).json({
                        status : 1,
                        message : 'Rating has been placed successfully!'
                    });
                });
                
            } catch (err) {
                res.status(500).json({
                    status : 0,
                    message : err.stack
                });
            }
        } else {
            console.log(results)
            const updateRating = {
                text : 'UPDATE ratings SET rating = $1,feedback = $2 WHERE id = $3',
                values : [rating, feedback, results.id]
            }
            try {
                const response  = await database.query(updateRating);
                if (response.rowCount < 1) {
                    res.status(400).json({
                        status: 0,
                        message: 'No data found',
                    });
                }
                else {
                    res.status(200).json({
                        status: 1,
                        message: 'Your request has been updated!'
                    });
                }
            } catch (err) {
                res.status(500).json({
                    status: 0,
                    message: callback(err)
                });
            }
        }
        
    });
    
}
const userRated = async (req,res,next) => {
    const {userId} = req.params;
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const myRatings = {
        text : 'SELECT * FROM ratings WHERE rated_by = $1 AND rated_to = $2',
        values : [userInfo.userID, userId]
    }
    try {
        const query = database.query(myRatings).then(response => {
            if(response.rows.length > 0){
                res.status(200).json({
                    status: 1,
                    message: 'Ratings to the user',
                    data : response.rows
                });
            } else {
                res.status(200).json({
                    status: 1,
                    message: 'No rating found',
                    data : []
                });
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err,
            data : []
        });
    }
}
const health = async (req,res) => {
    const getUserById = {
        text : 'SELECT * FROM users WHERE user_type = $1 AND id != $2',
        values : ['teacher', 20]
    }
    try {
        const response  = await database.query(getUserById);
        
        if (!response.rows[0]) {
            return res.status(400).send({'message': 'No user found'});
        }
        else {
            let data = response.rows;
            res.status(200).json({
                status: 1,
                message: 'success',
                user : data
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
    // res.status(200).json({
    //     status: 1,
    //     message: 'Server Is running'
    // });
}
const getLatestTeachers = async (req,res) => {
    const getLatest = {
        text : `select * from (select 
            u.id, 
            u.name, 
            u.image, 
            u.qualification, 
            u.curriculum, 
            u.duration_of_commitment, 
            string_agg(us.name, ', ') subjects, 
            sum( rat.rating ) / count( rat.rating ) ratings,
            (select count(*) from ratings where ratings.rated_to=u.id) as reviewsCount ,  
            string_agg( ug.name , ',') classes , 
            u.experience ,
            u.salary 
          from 
            users u 
            left join user_grades ug on u.id = ug.user_id 
            left join ratings rat on rat.rated_to = u.id 
            left join user_subjects us on u.id = us.user_id 
          where 
            u.user_type = $1
          GROUP by 
            u.id, 
            u.name, 
            u.image, 
            u.qualification, 
            u.curriculum, 
            u.duration_of_commitment ,
            u.experience ,
            u.salary ) as data
            limit $2`,
        values : ['teacher' , 4]
    }
    const getUserById = {
        text : 'SELECT * FROM users WHERE user_type = $1 ',
        values : ['teacher', 20]
    }
 
    try {
        const response  = await database.query(getLatest);
        // console.log("Response we have " , response.rows)        
        if (!response.rows[0]) {
            return res.status(400).send({users: []});
        }
        else {
            let data = response.rows;
            data = data.map(resp=>{
                let uniqueSubjects;
                let uniqueClasses;
                if(resp.subjects == null )
                {
                    uniqueSubjects = '';
                }else{
                    let subjects = resp.subjects.split(",");
                    uniqueSubjects =  [...new Set(subjects)].join(",");    
                }
                if(resp.classes == null )
                {
                    uniqueClasses = '';
                }else{
                    let classes = resp.classes.split(",");
                    uniqueClasses =  [...new Set(classes)].join(",");    
                }
                delete resp.classes;
                delete resp.subjects; 
                return {...resp , subjects: uniqueSubjects , classes : uniqueClasses };
            })


            res.status(200).json({
                users : data
            });
        }
    } catch(error) {
        console.log("Error , " , error)
        res.status(500).json({
            status: 0,
            message: error
        });
    }
    // res.status(200).json({
    //     status: 1,
    //     message: 'Server Is running'
    // });
}
//Added by Malik Ahsan Aftab 
const search = async (req,res) => {
    console.log("A request recieved to search" , req.body )
    //Making a variable to keep recording of values binded
    let values = [];
    let counter = 1;
    //For teacher type
    values.push(`teacher`);
    //Check if user has short listed any classes
    // classes: ["Secondary"], 
    let classQuery = '';
    //Making sure the classes are provided and atleast one class is provided with string length greater then 0
    if(req.body.classes.length && req.body.classes.some(cls=>cls.trim().length > 0) ){
        let tempInClassesQuery = [];
        for(let i=0 ; i < req.body.classes.length ; i++)
        {   
            tempInClassesQuery.push(`$${++counter}`);
            values.push(req.body.classes[i]);
        }
        // values.push ( Object.keys(req.body.classes).map(i=>`$${i+1}`) );
        classQuery = `and ug.name in (${tempInClassesQuery.join()})`
    }
    // subjects: [], 
    //Check if user has short listed any subjects
    let subjectQuery = '';
    if(req.body.subjects.length && req.body.subjects.some(subj=>subj.trim().length > 0) ){
        let tempInSubjectsQuery = [];
        for(let i=0 ; i < req.body.subjects.length ; i++)
        {   
            tempInSubjectsQuery.push(`$${++counter}`);
            values.push(req.body.subjects[i]);
        }
        // values.push ( Object.keys(req.body.subjects).map(i=>`$${i+1}`) );
        subjectQuery = `and us.name in (${tempInSubjectsQuery.join()})`
    }
    //check if gender is selected
    let genderQuery = '';
    // gender: "female", 
    if(req.body.gender && ["female" , "male"].includes(req.body.gender)){
        genderQuery = `and u.gender = $${++counter}`;
        values.push(req.body.gender);
    }
    //check if experience is selected
    //    experience: "all"
    let experienceQuery = '';
    if(req.body.experience && req.body.experience.split("-").length == 2){
        experienceQuery = `and u.experience between $${++counter} and $${++counter}`;
        values.push(parseInt(req.body.experience.split("-")[0]) );
        values.push(parseInt(req.body.experience.split("-")[1] ));
    }
    //Minimum salary 
    //    fee_range_min: -1
    let minSalaryQuery = '';
    if(req.body.fee_range_min && !isNaN(req.body.fee_range_min) && req.body.fee_range_min > -1){
        minSalaryQuery = `and u.salary >= $${++counter}` ;
        values.push(req.body.fee_range_min);
    }
    //MAximum salary
    // fee_range_max: -1
    let maxSalaryQuery = '';
    if(req.body.fee_range_max && !isNaN(req.body.fee_range_max) && req.body.fee_range_max > -1){
        maxSalaryQuery = `and u.salary <= $${++counter}` ;
        values.push(req.body.fee_range_max);
    }
    //Handling search query
    let searchText = '';
    if(req.body.search && req.body.search.trim().length > 0){
        searchText = `and ( uta.meta_name like $${++counter} OR u.name Ilike $${++counter})`;
        values.push('%'+metaphone(req.body.search)+'%');
        values.push('%'+req.body.search+'%');
    }
    // sort_fee: 1, 
    let orderQuery = ` order by u.salary ${req.body.sort_fee == '1' ? 'desc' : 'asc'}`;

    //Now for pagination
    //We have number of records
    //We need
    /* Total records */
    /* Current page number */
    let num_rows= isNaN(req.body.num_rows) ? 10 : req.body.num_rows  ; 
    let skip = isNaN(req.body.skip) ? 0 : req.body.skip * num_rows ;
    values.push(num_rows);
    values.push(skip);
    const searchQuery = {
        text : `select * from (select 
            u.id, 
            u.name, 
            u.image, 
            u.qualification, 
            u.curriculum, 
            u.duration_of_commitment, 
            string_agg(us.name, ', ') as subjects, 
            sum( rat.rating ) / count( rat.rating ) ratings,
            (select count(*) from ratings where ratings.rated_to=u.id) as reviewsCount ,  
            string_agg( ug.name , ',') classes , 
            u.experience ,
            u.salary ,
            count(*) over() as rowsFiltered
          from 
            users u 
            left join user_grades ug on u.id = ug.user_id 
            left join ratings rat on rat.rated_to = u.id 
            left join user_subjects us on u.id = us.user_id 
            left join user_target_areas uta on u.id = uta.user_id
          where 
            u.user_type = $1 ${classQuery} ${subjectQuery} ${genderQuery} ${experienceQuery} ${minSalaryQuery} ${maxSalaryQuery} ${searchText}
          GROUP by 
            u.id, 
            u.name, 
            u.image, 
            u.qualification, 
            u.curriculum, 
            u.duration_of_commitment ,
            u.experience ,
            u.salary ${orderQuery} ) as data 
            limit $${values.length-1} offset $${values.length} `,
        values : values
    }
    //Now we need total records from table
    //We need total filtered records

 
    try {
        const response  = await database.query(searchQuery);
        // console.log("Response we have after searching :" , response.rows)        
        if (!response.rows[0]) {
            return res.status(400).send({users: []});
        }
        else {
            let data = response.rows;
            res.status(200).json({
                users : data
            });
        }
    } catch(error) {
        console.log("Error occured " , error )
        res.status(500).json({
            status: 0,
            message: error
        });
    }
    // res.status(200).json({
    //     status: 1,
    //     message: 'Server Is running'
    // });
}
const uniqueClasses = async (req,res) => {
    console.log("A request recieved to search" , req.body )
    const getUniqueClasses = {
        text : `SELECT distinct(name)
        FROM public.user_grades;`,
        values : []
    }
   
    try {
        const response  = await database.query(getUniqueClasses);
        if (!response.rows[0]) {
            return res.status(400).send({classes: []});
        }
        else {
            let data = response.rows;
            res.status(200).json({
                classes : data
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
    // res.status(200).json({
    //     status: 1,
    //     message: 'Server Is running'
    // });
}
const uniqueSubject = async (req,res) => {
    console.log("A request recieved to search" , req.body )
    const getUniqueSubject = {
        text : `SELECT distinct(name)
        FROM public.user_subjects;`,
        values : []
    }
   
    try {
        const response  = await database.query(getUniqueSubject);
        // console.log("Response we have subject" , response)        
        if (!response.rows[0]) {
            return res.status(400).send({subjects: []});
        }
        else {
            let data = response.rows;
            res.status(200).json({
                subjects : data
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
    // res.status(200).json({
    //     status: 1,
    //     message: 'Server Is running'
    // });
}
//Used for cloudinary
const streamUpload = (req) => {

    return new Promise((resolve, reject) => {
  
      let stream = cloudinary.v2.uploader.upload_stream(
        { folder: "edu_tutor/" , } ,
        (error, result) => {
          if (result) {
            let temp = result;
            let imgUrl = result.url.split("/");
            temp.url = imgUrl[imgUrl.length-1];
            console.log("File after upload result object" , temp)
            resolve(temp);
          } else {
            reject(error);
          }
        }
      );
      console.log("I am streamfier and req file is " , req.files , "body" , req.body)
      streamifier.createReadStream(req.files.file.data).pipe(stream);
  
    });
  
};
const uploadImage = async function(req , res ){
    //Configuring cloudinary
    // console.log("Req body" , req.body , "Request files " , req.files)
    try{
      cloudinary.config(cloudinaryConf);
      let result = await streamUpload(req);
      console.log("File upload success" , result.url );
      return await basicInfoProvided(req , res , result.url);
     }catch(err ){
       console.log("Error occured while uploading.Code : 190237@", err)
       res.status(400).send({error : "Error occured while uploading image.Code : 190237@" } );
  
     }
  }
  const uploadImageTeacher = async function(req , res ){
    //Configuring cloudinary
    // console.log("Req body" , req.body , "Request files " , req.files)
    try{
      cloudinary.config(cloudinaryConf);
      let result = {url : null };
      if(req.files && req.files.file)
            result = await streamUpload(req);
      console.log("File upload success for teacher" , result.url );
      return await updateBasicProfile(req , res , result.url);
     }catch(err ){
       console.log("Error occured while uploading.Code : 190237@", err)
       res.status(400).send({error : "Error occured while uploading image.Code : 190237@" } );
  
     }
  }

  const basicInfoProvided = async (req,res,image) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let id = userInfo.userID;
    let userType = userInfo.user_type; 
    let summary = req.body.summary;

    const setupProfile = {
        text : 'Update users SET summary = $1 , image = $2 WHERE id = $3',
        values : [summary , image , id ]
    }
    try {
        const query = await database.query(setupProfile);
        res.status(200).json({ status: 1 , message: 'User updated' });        
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "Something went wrong while updating."
        });
    }
}
const uploadImageOnly = async function(req , res ){
    //Configuring cloudinary
    // console.log("Req body" , req.body , "Request files " , req.files)
    try{
      cloudinary.config(cloudinaryConf);
      let result = await streamUpload(req);
      return await res.status(200).send({status :1 , url : result.url});
     }catch(err ){
       console.log("Error occured while uploading.Code : 190237@", err)
       res.status(400).send({ status :0 , error : "Error occured while uploading image.Code : 190237@" } );
  
     }
  }
  
  const updateProfileDesc = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let {name, age, file, summary} = req.body;
    // console.log(name, age, file, summary , req.body , "<<<< Update profile description");
    /* Update user type */
    const updateType = {
        text : 'Update users SET name = $5 ,summary = $1, age = $2, image = $3 WHERE id = $4',
        values : [ summary, age, file, userInfo.userID , name ]
    }
    
    try {
        const response  = await database.query(updateType);
        res.status(200).json({
                status: 1,
                message: 'User updated.',
            });            
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 0,
            message: err
        });
    }
  }
  const addView = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let {teacher} = req.body;
    console.log("Add view teacher " , userInfo , teacher );
    /* insert view */
    const insertView = {
        text : 'INSERT INTO public.profile_views(user_id, teacher_id) VALUES ( $1 , $2 )',
        values : [ userInfo.userID , teacher ]
    }
    
    try {
        const response  = await database.query(insertView);
        res.status(200).json({
                status: 1,
                message: 'View added.',
            });            
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 0,
            message: err
        });
    }
  }
module.exports = {
    activateUser,
    forgotPassword,
    resetPassword,
    getUser,
    updateBasicProfile,
    updateProfileDesc , 
    getChildren,
    getChild,
    addChildren,
    updateChildren,
    removeChild,
    getTeachers,
    getProfileById,
    sendInvite,
    getUserConnectionSession,
    updateInvite,
    myInvites,
    myPendingInvites,
    rateUser,
    userRated,
    health,
    getLatestTeachers,
    uniqueClasses,
    uniqueSubject,
    search , 
    uploadImage,
    uploadImageOnly ,
    uploadImageTeacher ,
    addView
}