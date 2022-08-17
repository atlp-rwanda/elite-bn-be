import nodemailer from 'nodemailer';
require('dotenv').config();

const sendEmail=(receiver,sender,subject,template) =>{
  let transport = nodemailer.createTransport({
    host: process.env.HOST_MAILER,
    port: process.env.PORT_MAILER,
    secure: true,
    auth: {
      type: "OAuth2",
      user: sender,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    }
  });
  
  const mailOptions = {
    from: sender, 
    to: receiver, 
    subject: subject, 
    html: template,
  
  };
  
  
  transport.sendMail(mailOptions, function(err, info) {
   if (err) {
  
   } else {
     
   }
  });
}

export default sendEmail