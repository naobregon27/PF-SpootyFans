// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();
const { PASS_NODEMAILER, USER_NODEMAILER } = process.env
// const createTransporter = nodemailer.createTransport(smtpTransport({
//   host: 'smtp.elasticemail.com',
//   port: 2525,  
//   auth: {
//     user: 'spotyfans0@gmail.com',  
//     pass: '135426ADCD4384D9D348F13F2D097C12A9C6',  
//   },
// }));


function createTransporter() {
  return nodemailer.createTransport(smtpTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: `${USER_NODEMAILER}`,
      pass: `${PASS_NODEMAILER}`,
    },
  }));
}
// const transporter = createTransporter();



// Detalles del correo electrónico
// const mailOptions = {
//   from: 'spotyfans0@gmail.com',
//   to: `${user.email}`,
//   subject: 'correo prueba',
//   text: 'asdasdasdasdasdasdasdddasasddaasdadsadssderfdsdrfrfsedsedrfsedrf',
// };

// Envía el correo electrónico
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Error:', error);
//   } else {
//     console.log('Correo enviado:', info.response);
//   }
// });

// const createTransporter = () => {
//   const transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "9e470cd6121f8a",
//             pass: "de64aff8f28cd7"
//     }
//   });
//   return transport;
// };

const sendMailRegister = async (user) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: `" SpootyFans" <${USER_NODEMAILER}>`,
    to: `${user.email}`,
    subject: "Welcome to SpotyFans!",
    text: "We are very happy to welcome you to our community and excited for you to start using our app!"
  });
  console.log("se envio el correo!")
  return
}
exports.sendMailRegister = (user) => sendMailRegister(user)

const sendMailPremium = async (user) => {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `" SpootyFans" <${USER_NODEMAILER}>`,
      to: `${user.email}`,
      subject: "Congratulations, you are premium now!",
      text: "Welcome to SpotyFans premium, from now on you can upload songs to the platform, good luck with your journey as an artist!"
    });
    console.log("se envio el correo!")
    return
  }
  exports.sendMailPremium = (user) => sendMailPremium(user)

  const sendMailSong = async (user) => {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `" SpootyFans" <${USER_NODEMAILER}>`,
      to: `${user}`,
      subject: "Congratulations, your song has been released!",
      text: "We wish you luck with this new release, it´s so good!!"
    });
    console.log("se envio el correo!")
    return
  }
  exports.sendMailSong = (user) => sendMailSong(user)