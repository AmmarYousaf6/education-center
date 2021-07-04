const {jwt,sign} = require("jsonwebtoken");
const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const jwtDecode = require('jwt-decode');
async function getSimilarBlogs(req , resp){
    try {
        const getSimilar = {
            text : `WITH tags as (select unnest(string_to_array(tags, ' ' ) )  from blogs where id =$1)
                        select MAX(BLOGS.ID) id, BLOGS.TITLE, BLOGS.DESCRIPTION,BLOGS.DATE,BLOGS.image,COUNT(COMMENTS.*) TOTAL_COMMENTS from 
                            BLOGS JOIN TAGS 
                                ON BLOGS.TAGS like concat('%', TAGS ,'%') 
                                JOIN COMMENTS ON BLOGS.ID=COMMENTS.BLOG_ID
                                where BLOGS.ID !=  $1
                                GROUP BY BLOGS.ID`,
            values : [req.params.id]
        }
        const similarBlogs  = await database.query(getSimilar);
        resp.status(200).json({
            status : 1,
            message : 'Similar blogs fetched',
            data : similarBlogs.rows
        });
    } catch (err) {
        resp.status(500).json({
            status : 0,
            message : err.stack
        });
    }

}
async function addComment(req , resp , next){
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let userId = userInfo.userID ;
    let comment = req.body.comment;
    let blog_id = req.body.blog_id;
    console.log(userId , comment , blog_id);
    const text = 'INSERT INTO comments(blog_id, user_id, comment ) VALUES($1, $2, $3) RETURNING *'
    const values = [blog_id, userId , comment ];
    try {
        const query = await database.query(text, values).then(async (response) => {
            let data = response.rows[0];
            const getComments = {
                text : 'SELECT users.name , users.image , comments.* FROM comments join users on comments.user_id=users.id WHERE blog_id = $1  ORDER BY id DESC',
                values : [blog_id]
            }
            const commentsData  = await database.query(getComments);
            resp.status(200).json({
                status : 1,
                message : 'Comment has been posted successfully!',
                data : commentsData.rows
            });
        });
        console.log("Query insert comment " , query )
    } catch (err) {
        console.log(err);
        resp.status(500).json({
            status : 0,
            message : err.stack
        });
    }
}
async function getComments(req , resp){
    try {
            const getComments = {
                text : 'SELECT users.name , users.image , comments.* FROM comments join users on comments.user_id=users.id WHERE blog_id = $1 ORDER BY id DESC',
                values : [req.params.id]
            }
            const commentsData  = await database.query(getComments);
            resp.status(200).json({
                status : 1,
                message : 'Comments fetched',
                data : commentsData.rows
            });
    } catch (err) {
        resp.status(500).json({
            status : 0,
            message : err.stack
        });
    }
}
function getBlogs(req , resp , next){
    const getBlogs = {
        text : 'SELECT * from blogs where status=$1',
        values : ['active']
    }
    try {
        const query = database.query(getBlogs).then(res => {
            if(res.rows.length > 0){
                resp.status(200).json({
                    status : 1,
                    message : '',
                    data : res.rows
                });

            } else {
                resp.status(200).json({
                    status : 1,
                    message : 'No blogs found!',
                    data : []
                });

            }
        })
    } catch (err) {
        resp.status(200).json({
            status : 1,
            message : 'No blogs found!.',
            data : []
        });

    }
}
function getBlogDetails(req , resp , next){
    const getBlogs = {
        text : 'SELECT * from blogs where status=$1 and id=$2 ',
        values : ['active' , req.params.id ]
    }
    try {
        const query = database.query(getBlogs).then(res => {
            if(res.rows.length > 0){
                resp.status(200).json({
                    status : 1,
                    message : '',
                    data : res.rows[0]
                });

            } else {
                resp.status(200).json({
                    status : 1,
                    message : 'Blog not found!',
                    data : []
                });

            }
        })
    } catch (err) {
        resp.status(200).json({
            status : 1,
            message : 'Blog not found!.',
            data : []
        });

    }
}


module.exports = {
    getBlogs ,
    getSimilarBlogs,
    getBlogDetails,
    addComment,
    getComments
}