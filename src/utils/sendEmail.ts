import nodemailer from "nodemailer";
import sendgridTranport from "nodemailer-sendgrid";

/**
 * Send email to change password
 * @param to receiver
 * @param html html body
 */
export async function sendEmail(to: string, html: string) {
   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing

   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport(
      sendgridTranport({
         apiKey: process.env.SEND_GRID_API_KEY as string,
      })
   );

   // send mail with defined transport object
   const info = await transporter.sendMail({
      from: "rday61062@gmail.com", // sender address
      to, // list of receivers
      subject: "Change Password", // Subject line
      text: "Change Password", // plain text body
      html, // html body
   });

   console.log("Message sent: %s", info);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
