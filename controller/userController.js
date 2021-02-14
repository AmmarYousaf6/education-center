const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const md5 = require('md5');
const jwtDecode = require('jwt-decode');
const multer = require('multer');

const getUser = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);

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
    try {
        const response  = await database.query(getUserById);
        
        if (!response.rows[0]) {
            return res.status(400).send({'message': 'The credentials you provided is incorrect'});
        }
        else {
            let data = response.rows[0];
            if(response.rows[0].user_type){
                const subjects  = await database.query(getUserSubjects);
                const grades  = await database.query(getUserGrades);
                const areas  = await database.query(getUserAreas);
                const slots  = await database.query(getUserSlots);
                data.subjects = subjects.rows;
                data.grades = grades.rows;
                data.areas = areas.rows;
                data.slots = slots.rows;
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
    const activateUser = {
        text : 'Update users SET status = 1 WHERE id = $1',
        values : [userId]
    }
    try {
        const query = await database.query(activateUser);
        if(query.rowCount > 0){
            res.redirect(process.env.HOST_URL)
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

const updateBasicProfile = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let {userType, subjects, grades, target_area, slots, summary, experience, qualification,age, salary, duration_of_commitment, video_introduction, hours_per_day} = req.body;
    let image = req.files.image ? req.files.image[0].filename  : 'default.jpg';
    let curriculum = req.files.curriculum ? req.files.curriculum[0].filename  : 'NA';
    if(userType == 'teacher' || userType == 'parent'){
        /* Update user type */
        const updateType = {
            text : 'Update users SET user_type = $1, summary = $2, experience = $3, qualification = $4, age = $5, salary = $6, duration_of_commitment = $7, video_introduction = $8, hours_per_day = $9, image = $10, curriculum = $11 WHERE id = $12',
            values : [userType, summary, experience, qualification, age, salary, duration_of_commitment, video_introduction, hours_per_day, image, curriculum, userInfo.userID]
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
                message: callback(err)
            });
        }
        /* ** */
        /* Update subjects */
        if(eval(subjects).length > 1){
            /* Remove subjects if they exists */
            const removeSubjects = {
                text : 'DELETE FROM user_subjects WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removeSubjects);
            /* *** */
            let getSubjects = eval(subjects);
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
        if(eval(grades).length > 1){
            /* Remove grades if they exists */
            const removeGrades = {
                text : 'DELETE FROM user_grades WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removeGrades);
            /* *** */
            let getGrades = eval(grades);
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
        /* Update Target Area */
        if(eval(target_area).length > 1){
            /* Remove target_area if they exists */
            const removetarget_area = {
                text : 'DELETE FROM user_target_areas WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removetarget_area);
            /* *** */
            let gettarget_area = eval(target_area);
            for(let i = 0; i<gettarget_area.length; i++){
                let text = 'INSERT INTO user_target_areas(user_id, name) VALUES($1, $2) RETURNING *'
                let values = [userInfo.userID, gettarget_area[i]];
                try {
                    await database.query(text, values);
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        /* Update Time slot */
        if(eval(slots)){
            /* Remove slots if they exists */
            const removeslots = {
                text : 'DELETE FROM user_slots WHERE user_id = $1',
                values : [userInfo.userID]
            }
            database.query(removeslots);
            /* *** */
            let getSlots = eval(slots);
            for(let i = 0; i<getSlots.length; i++){
                let slotType = getSlots[i]['timeMonday'] ? 'timeMonday' : getSlots[i]['timeTuesday'] ? 'timeTuesday' : getSlots[i]['timeWednesday'] ? 'timeWednesday' : getSlots[i]['timeThursday'] ? 'timeThursday' : getSlots[i]['timeFriday'] ? 'timeFriday' : getSlots[i]['timeSaturday'] ? 'timeSaturday' : getSlots[i]['timeSunday'] ? 'timeSunday' : '';
                let slotNow = getSlots[i][slotType];
                let day = slotNow.day;
                let time = slotNow.start+' - '+slotNow.end;
                
                let text = 'INSERT INTO user_slots(user_id, day, time) VALUES($1, $2, $3) RETURNING *'
                let values = [userInfo.userID, day, time];
                try {
                    await database.query(text, values);
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }
        /* Upload Image */

        res.status(200).json({
            status: 1,
            message: 'Your profile has been updated successfully!'
        });
        
        /* ***** */
    } else {
        res.status(400).json({
            status: 0,
            message: 'You can only register as a teacher or parent!',
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

const getTeacherById = async (req,res) => {
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
        text : 'SELECT name FROM user_target_areas WHERE user_id = $1',
        values : [userId]
    }
    const getUserSlots = {
        text : 'SELECT day, time FROM user_slots WHERE user_id = $1',
        values : [userId]
    }
    try {
        const response  = await database.query(getUserById);
        
        if (!response.rows[0]) {
            return res.status(400).send({'message': 'No user found'});
        }
        else {
            let data = response.rows[0];
            if(response.rows[0].user_type){
                const subjects  = await database.query(getUserSubjects);
                const grades  = await database.query(getUserGrades);
                const areas  = await database.query(getUserAreas);
                const slots  = await database.query(getUserSlots);
                data.subjects = subjects.rows;
                data.grades = grades.rows;
                data.areas = areas.rows;
                data.slots = slots.rows;
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
        query = 'SELECT name, qualification, gender, summary, user_connections.status as inviteStatus FROM user_connections JOIN users ON users.id = user_connections.participant_id  WHERE user_id = $1';
    } else {
        query = 'SELECT name, qualification, gender, summary, user_connections.status as inviteStatus FROM user_connections JOIN users ON users.id = user_connections.user_id  WHERE participant_id = $1';
    }
    const getInvites = {
        text : query,
        values : [userInfo.userID]
    }
    try {
        const response  = await database.query(getInvites);
        if (response.rowCount < 1) {
            res.status(400).json({
                status: 0,
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
    res.status(200).json({
        status: 1,
        message: 'Server Is running'
    });
}
module.exports = {
    activateUser,
    forgotPassword,
    resetPassword,
    getUser,
    updateBasicProfile,
    getTeachers,
    getTeacherById,
    sendInvite,
    getUserConnectionSession,
    updateInvite,
    myInvites,
    rateUser,
    userRated,
    health,
}