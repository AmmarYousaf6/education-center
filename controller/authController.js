const {jwt,sign} = require("jsonwebtoken");
const md5 = require('md5');
const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');

const signUp = async (req,res,next) => {
    const {email, password, name, gender,type} = req.body;

    let encryptPassword = await md5(password);

    const text = 'INSERT INTO users(email, password, name, gender, type, status, image ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [email.trim(), encryptPassword, name, gender, type, 0, 'default.jpg'];
    try {
        const query = await database.query(text, values).then((res) => {
            return {
                email : res.rows[0].email,
                userId : res.rows[0].id
            };
        }).then((obj) => {
            res.email = obj.email;
            res.subject = 'Account activation';
            res.body = '<a href="http://localhost:4000/users/activate/' + obj.userId + '" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Activate</a>';
            next();
        });
        res.status(200).json({
            status : 1,
            message : 'User has been registered successfully. You will recieve an email shortly to activate your account.'
        });
    } catch (err) {
        res.status(500).json({
            status : 0,
            message : err.stack
        });
    }
}

const socialSignUp = async (req,res,next) => {
    if(req.userExists == true){
        next();
    } else {
        const {email, password, name, gender,type, image} = req.body;
        var encryptPassword = ''; 
        if(password){
            encryptPassword = await md5(password);
        }
        const text = 'INSERT INTO users(email, password, name, gender, type, status, image ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
        const values = [email.trim(), encryptPassword, name, gender, type, 1, image];
        try {
            const query = await database.query(text, values).then((res) => {
                return {
                    email : res.rows[0].email,
                    userId : res.rows[0].id
                };
            }).then((obj) => {
                req.email = obj.email;
                next();
            });
        } catch (err) {
            res.status(500).json({
                status : 0,
                message : err.stack
            });
        }
    }
}

const login =  (req,res) => {
    const {email, password} = req.body;
    if(validateUser(req.body)){

       getUserByEmail(email,password, (err,results)=>{
            if(err){
                res.status(500).json({
                    message : err,
                    status : 0
                });
            }
            if(!results){
                return res.status(400).json({
                    status : 0,
                    message : 'Invalid user or password'
                })
            }
            if(results.status == 0){
                return res.status(400).json({
                    status : 0,
                    message : 'Your account has not been activated yet.'
                })
            }

            if(results){

                const jsonToken = sign({
                        username: results.name,
                        userID: results.id,
                        user_type : results.user_type
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "24hr"
                    },
                    function(err, token) {
                        if (err) {
                            return res.status(500).json({
                                status : 0,
                                message : err
                            })
                        } else {
                            return res.status(200).json({
                                status : 1,
                                message : 'login success',
                                token : token
                            })
                        }
                    });
            } else {
                res.status(500).json({
                    message : "Error in compairing password",
                    status : 0
                });
            }
            });
    } else {
        res.status(500).json({
            status : 0,
            message : "Invalid User"
        });
    }
}

const socialLogin =  (req,res) => {
    const {email, password} = req.body;
    if(validateSocialUser(req.body)){
        getSocialUserByEmail(email, (err,results)=>{
            if(err){
                res.status(500).json({
                    message : err,
                    status : 0
                });
            }
            if(!results){
                return res.status(400).json({
                    status : 0,
                    message : 'Invalid user'
                })
            }
            if(results.status == 0){
                return res.status(400).json({
                    status : 0,
                    message : 'User is not activated yet!'
                })
            }

            if(results){

                const jsonToken = sign({
                        username: results.name,
                        userID: results.id,
                        user_type : results.user_type
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "24hr"
                    },
                    function(err, token) {
                        if (err) {
                            return res.status(500).json({
                                status : 0,
                                message : err
                            })
                        } else {
                            return res.status(200).json({
                                status : 1,
                                message : 'login success',
                                token : token
                            })
                        }
                    });
            } else {
                res.status(500).json({
                    message : "No user found",
                    status : 0
                });
            }
            });
    } else {
        res.status(500).json({
            status : 0,
            message : "Invalid User"
        });
    }

}


function getUserByEmail(email,password, callback){
    const getUserByEmail = {
        text : 'SELECT id,name,email,status,user_type FROM users WHERE email = $1 AND password = $2',
        values : [email,md5(password)]
    }
    try {
        const query = database.query(getUserByEmail).then(res => {
            if(res.rows.length > 0){
                callback(null, {id : res.rows[0].id,name : res.rows[0].name,email : res.rows[0].email,password : res.rows[0].password, status : res.rows[0].status, user_type : res.rows[0].user_type})
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}
function validateUser(user){
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
    return validEmail && validPassword;
}
function validateSocialUser(user){
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    return validEmail;
}
function getSocialUserByEmail(email, callback){
    const getUserByEmail = {
        text : 'SELECT id,name,email,status,user_type FROM users WHERE email = $1',
        values : [email]
    }
    try {
        const query = database.query(getUserByEmail).then(res => {
            if(res.rows.length > 0){
                callback(null, {id : res.rows[0].id,name : res.rows[0].name,email : res.rows[0].email, status : res.rows[0].status, user_type : res.rows[0].user_type})
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}
module.exports = {
    signUp,
    socialSignUp,
    login,
    socialLogin,
}