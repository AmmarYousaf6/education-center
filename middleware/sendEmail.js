var nodemailer = require('nodemailer');
var fs = require('fs'); 
const util = require('util');
const readFile = util.promisify(fs.readFile);

const sendEmailForgotPassword = async (req,res,next) => {
    var email = res.email;
    var subject = res.subject;
    var body = res.body;
    //Creating template html
    let html = await extractHtml('./templates/forget.html');
    //Adjusting Name
    html = html.replace("<--RESET_PASSWORD_PLACEHOLDER-->" , body);

    
    var transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        service: 'hostinger',
        port: 587 ,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: 'admin@zubnee.com',
        to: email,
        subject: res.subject,
        html: html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("New customer email send error ::" , error);
        } else {
            console.log('New customer Email sent: ' + info.response);
        
            if(res.status_message = true){
                res.status(200).json({
                    status: 1,
                    message: 'An email has been sent to your account. Please follow the instructions to complete the process'
                });
            }

        }
    });
}

const sendEmail = async (req,res,next) => {
    var email = res.email;
    var subject = res.subject;
    var body = res.body;
    //Creating template html
    let html = await extractHtml('./templates/activate.html');
    //Adjusting Name
    html = html.replace("<--ACTIVATION_LINK_PLACEHOLDER-->" , body);

    
    var transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        service: 'hostinger',
        port: 587 ,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: 'admin@zubnee.com',
        to: email,
        subject: res.subject,
        html: html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("New customer email send error ::" , error);
        } else {
            console.log('New customer Email sent: ' + info.response);
        
            if(res.status_message = true){
                res.status(200).json({
                    status: 1,
                    message: 'An email has been sent to your account. Please follow the instructions to complete the process'
                });
            }

        }
    });
}

const sendCustomEmail = async (req,res,next) => {
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;
    var phone =  req.body.phone;
    var name = req.body.name;

    var body = res.body;
    //Creating template html
    let html = await extractHtml('./templates/contact.html');
    //Adjusting Name
    html = html.replace("<--Name Placeholder-->" , name);

    // Adjusting email
    html = html.replace("<--Email Placeholder-->" , email);

    // Adjusting phone 
    html = html.replace(" <--Phone Placeholder-->" , phone);

    // Adjusting message
    html = html.replace(" <--Message Placeholder-->" , message);
    var transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        service: 'hostinger',
        port: 587 ,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: 'inquiries.hometutor@gmail.com',
        to: 'inquiries.hometutor@gmail.com' ,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("While senig email error:" , error);
        } else {
            console.log('Email sent: ' + info.response + 'to '+process.env.GMAIL_EMAIL);
        
            if(res.status_message = true){
                res.status(200).json({
                    status: 1,
                    message: 'Contact us email sent'
                });
            }
        }
    });
}
const extractHtml =  async (templatePath)=>{
    try {
        const file = await readFile(templatePath, 'utf8');
        return file.toString();
    }
    catch (err) { 
        console.error( "Reading file error :" , err ); 
    }
    return "";
}

module.exports = {
    sendEmail ,
    sendCustomEmail ,
    sendEmailForgotPassword
}