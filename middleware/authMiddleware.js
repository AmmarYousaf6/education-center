const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const axios = require("axios");
const {database} = require('../config/database');

const validateSignup = async (req,res,next) => {
    const {email, password,dateOfBirth} = req.body;
    if(email){
        next();
    } else {
        res.status(500).json({
            status : 0,
            message : "Email is required!"
        });
    }
}
const validateSocialSignup = async (req,res,next) => {
    const {email} = req.body;
    if(email){
        next();
    } else {
        res.status(500).json({
            status : 0,
            message : "Email is required!"
        });
    }
}
const validateToken = async (req,res,next) => {
    let token = req.get('authorization');
    if(token){
        token = token.slice(7);
        verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded) =>{
            if(err){
                res.status(400).json({
                    status: 0,
                    message: 'Invalid token',
                });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            status: 0,
            message : 'Access denied! unauthorized user'
        });
    }
}
const checkUserExists = async (req,res,next) => {
    const {email,type} = req.body;
    const getUserByEmail = {
        text : 'SELECT email FROM users WHERE email = $1',
        values : [email]
    }
    try {
        const query = database.query(getUserByEmail).then(response => {
            if(response.rows.length > 0){
                req.userExists = true;
                if(type == 'manual'){
                    res.status(401).json({
                        status: 0,
                        message : 'User already exists!'
                    });
                } else {
                    next();
                }
            } else {
                req.userExists = false;
                next();
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    validateSignup,
    validateSocialSignup,
    validateToken,
    checkUserExists
}