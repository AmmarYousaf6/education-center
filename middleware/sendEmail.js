var nodemailer = require('nodemailer');
var fs = require('fs'); 
const util = require('util');
const readFile = util.promisify(fs.readFile);

const sendEmail = (req,res,next) => {
    var email = res.email;
    var subject = res.subject;
    var body = res.body;
    let html ='<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Zubnee Email Activation</title> <style>@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper, table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}@media all{.ExternalClass{width: 100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}#MessageViewBody a{color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit;}.btn-primary table td:hover{background-color: #34495e !important;}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important;}}</style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Please click on the link below to continue with your action.</p><table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> '+body+' </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></table> </td></tr></table> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Company Inc, 3 Abbey Road, San Francisco CA 94102</span> <br>Dont like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>. </td></tr><tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>. </td></tr></table> </div></div></td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td></tr></table> </body></html>'
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
    let html = await extractHtml();
    //Adjusting Name
    html = html.replace("<--Name Placeholder-->" , name);

    // Adjusting email
    html = html.replace("<--Email Placeholder-->" , email);

    // Adjusting phone 
    html = html.replace(" <--Phone Placeholder-->" , phone);

    // Adjusting message
    html = html.replace(" <--Message Placeholder-->" , message);
    var transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com' ,
        port : 465 ,
        service: 'gmail',
        auth: {
            user: 'inquiries.hometutor@gmail.com',
            pass: 'COP21hometutor^^'
        }
    });
    var mailOptions = {
        from: 'inquiries.hometutor@gmail.com',
        to: process.env.GMAIL_EMAIL ,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("While senig email error:" , error);
        } else {
            console.log('Email sent: ' + info.response);
        
            if(res.status_message = true){
                res.status(200).json({
                    status: 1,
                    message: 'Contact us email sent'
                });
            }
        }
    });
}
const extractHtml =  async ()=>{
    try {
        const file = await readFile('./templates/contact.html', 'utf8');
        return file.toString();
    }
    catch (err) { 
        console.error( "Reading file error :" , err ); 
    }
    return "";
}

module.exports = {
    sendEmail ,
    sendCustomEmail
}