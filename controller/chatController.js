const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const jwtDecode = require('jwt-decode');

const getChatMessages = async (req,res,next) => {
    const sessionId = req.params.sessionId;
    const getMessages = {
        text : 'SELECT chat_messages.*,name,image FROM chat_messages JOIN users ON users.id = chat_messages.sender_id WHERE chat_session_id = $1',
        values : [sessionId]
    }
    try {
        const query = database.query(getMessages).then(response => {
            let data = response.rows;
            if(data.length > 0){
                res.status(200).json({
                    status : 1,
                    message : 'Message retrieved successfully!',
                    data : data
                });
            } else {
                res.status(200).json({
                    status : 1,
                    message : 'No messages found!',
                    data : []
                });
            }
        })
    } catch (err) {
        res.status(500).json({
            status : 0,
            message : err,
            data : []
        });
    }
}

const getLatestMessages = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let userId;
    console.log("userInfo" , userInfo  , "Userid" , userId);
    //Edited by Malik Ahsan Aftab
    //I cant know the purpose of if and else for user types
    userId = userInfo.userID;
    const getMessages = {
        //Query changed by malik ahsan aftab
        text : 'SELECT chat_messages.*,name,image FROM user_connections JOIN chat_messages ON chat_messages.chat_session_id = user_connections.id JOIN users ON users.id = chat_messages.sender_id  WHERE user_connections.user_id = $1 AND sender_id != $1 ORDER BY id DESC LIMIT 3 ',
        values : [userId]
    }
    try {
        const query = database.query(getMessages).then(async response => {
            let data = response.rows;
            if(data.length > 0){
                
                res.status(200).json({
                    status : 1,
                    message : 'Message retrieved successfully!',
                    data : data
                });
            } else {
                res.status(200).json({
                    status : 1,
                    message : 'No messages found!',
                    data : []
                });
            }
        })
    } catch (err) {
        res.status(500).json({
            status : 0,
            message : err,
            data : []
        });
    }
}

const sendMessage = async (req,res,next) => {
    const {sessionId , message} = req.body;
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let senderId;
    //Edited by Malik Ahsan Aftab
    senderId = userInfo.userID;

    const text = 'INSERT INTO chat_messages(chat_session_id, sender_id, message ) VALUES($1, $2, $3) RETURNING *'
    const values = [sessionId, senderId, message];
    try {
        const query = await database.query(text, values).then(async (response) => {
            let data = response.rows[0];
            const getUserData = {
                text : 'SELECT name,image FROM users WHERE id = $1',
                values : [senderId]
            }
            const userData  = await database.query(getUserData);
            data.name = userData.rows[0].name;
            data.image = userData.rows[0].image;
            res.status(200).json({
                status : 1,
                message : 'Message has been posted successfully!',
                data : data
            });
        });
    } catch (err) {
        res.status(500).json({
            status : 0,
            message : err.stack
        });
    }
}
const markRead = async (req,res,next) => {
    const messageId = req.params.messageId;
    const markMessage = {
        text : 'Update chat_messages SET is_read = 1 WHERE id = $1',
        values : [messageId]
    }
    try {
        const query = await database.query(markMessage);
        if(query.rowCount > 0){
            res.status(200).json({
                status : 1,
                message : 'Success',
                data : []
            });
        } else {
            res.status(500).json({
                status: 0,
                message: 'Unable to mark message'
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}

module.exports = {
    getChatMessages,
    getLatestMessages,
    sendMessage ,
    markRead
}