const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const jwtDecode = require('jwt-decode');
var metaphone = require('metaphone')

const search = async (req,res) => {

    //Since meta strings are mechanism where
    //Strings are search for based ont  their pronounciation sounds
    //So they make search more efficient with the feel of artificial intelligence :D
    let metaStr = (metaphone(req.params.search.toLowerCase().trim())) ;

    const searchMap = {
        text : 'SELECT u.id , u.name , u.image , u.summary , uta.name as location , uta.latitude , uta.longitude FROM user_target_areas uta inner join users u on u.id=uta.user_id WHERE meta_name like $1',
        values : [`%${metaStr}%`]
    }

    try {
        const response  = await database.query(searchMap);      
        console.log(metaStr ,"Response "  );
  
        let data = response.rows;
        res.status(200).json(data);        
    } catch(error) {
        console.log(error)
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}
module.exports = {
    search
}