const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const jwtDecode = require('jwt-decode');
var metaphone = require('metaphone')

const allSettings = async (req,res) => {
    const settingsQuery = {
        text : `select * from settings`,
        values : []
    }

    try {
        const response  = await database.query(settingsQuery);        
        let data = response.rows;
        res.status(200).json({status :1 , data :data });        
    } catch(error) {
        console.log(error)
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}
module.exports = {
    allSettings
}