// import speakeasy from 'speakeasy';
// import nodemailer from 'nodemailer';

// export const generateOTP = () => {
//     return speakeasy.totp({
//         secret: process.env.JWT_SECRET,
//         encoding: 'base32'
//     });
// };

// export const sendEmail = async (to, subject, text) => {
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: to,
//         subject: subject,
//         text: text,
//     });
// };