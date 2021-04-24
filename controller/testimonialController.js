const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');

const getTestimonials = async (req,res) => {
    const testimonialQuery = {
        text : `select * from testimonials where status = true`,
        values : []
    }

    try {
        const response  = await database.query(testimonialQuery);        
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
    getTestimonials
}