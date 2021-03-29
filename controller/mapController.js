const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const jwtDecode = require('jwt-decode');
var metaphone = require('metaphone')

const detail = async (req,res) => {
    let id = req.params.id ;
    console.log("Id recieved" , id);
    const teacherQuery = {
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
                    u.user_type = $1 and
                    u.id = $2
                GROUP by 
                    u.id, 
                    u.name, 
                    u.image, 
                    u.qualification, 
                    u.curriculum, 
                    u.duration_of_commitment ,
                    u.experience ,
                    u.salary ) as data
                    `,
        values : ['teacher' , id]
    }

    try {
        const response  = await database.query(teacherQuery);        
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
const fetchNearbyTeachers = async (req,res) => {
    console.log("Req body" , req.body)
    //Since we have to search for users in 1KM radius
    //*so fetching all users with latitude and longitude
    let { center , range , rangetype} = req.body;
    let distance = 200; //Default distance is 200 KM
    //
    let whereClause = '';
    let filters = ['teacher'];
    if(rangetype == "fee"){
        whereClause  = ' and cast(salary As int) < $2';
        filters.push(range.value * 1000 );
    }else if(range){
        distance = range.value;
    }
    //*For each user_id latitude longitude compare if the distance is less then 1KM
    const allUserAreas = {
        text : 'SELECT user_id , latitude , longitude FROM user_target_areas uta inner join users u on uta.user_id=u.id where u.user_type = $1 '+whereClause,
        values : filters
    }
    try {
        const usersData  = await database.query(allUserAreas);      
        // console.log("All users data" , usersData.rows)
        //Filtering records based on 1km radius
        //In case we need all users
        let shortListedUsers = usersData.rows;

        if(req.body.all != 'true'){
             shortListedUsers = usersData.rows.filter(userArea=>isDistanceLessThenKm(center.latitude , center.longitude , userArea["latitude"] , userArea["longitude"] , distance ));
        }

        //Fetch users info 
        let shortListedUserIds = shortListedUsers.map(user=>user.user_id);

        whereClause = Array(shortListedUserIds.length).fill().map((e , i)=>'$'+(i+1)).join();

        whereClause = whereClause.trim().length ? `where u.id in (${whereClause})` : '';

        if(whereClause == ''){
            return res.status(200).json({
                status: 1,
                data : []
            });        

        }
        const filterUsers = {
            text : `SELECT u.id , u.name , u.image , u.summary , uta.name as location , uta.latitude , uta.longitude FROM user_target_areas uta inner join users u on u.id=uta.user_id ${whereClause}`,
            values : shortListedUserIds
        }

        const response  = await database.query(filterUsers);

        let data = response.rows;

        res.status(200).json({status : 1 , data : data});        
    } catch(error) {
        console.log(error)
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}

//Measure distance between two points in meters
function isDistanceLessThenKm(lat1, lon1, lat2, lon2 , distance){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; //Distance in KM
    // console.log("Distance calculated so far :",d,"::::" , lat1, lon1, lat2, lon2)
    return Math.floor(d) < distance;//Distance is less then 2km
    // return d * 1000; // meters
}
module.exports = {
    detail,
    fetchNearbyTeachers
}