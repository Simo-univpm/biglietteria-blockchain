const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});



async function sendEmail(oggetto,destinatario,testo){

  transporter.sendMail({
    from: process.env.EMAIL,
    to: destinatario,
    subject: oggetto,
    text: testo
  })

}


module.exports.sendEmail = sendEmail;