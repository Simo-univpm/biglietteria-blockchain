


var nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});



async function sendEmail(oggetto,destinatario,testo){

  const mailOptions = {
    from: process.env.EMAIL,
    to: destinatario,
    subject: oggetto,
    text: testo
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}


module.exports.sendEmail = sendEmail;