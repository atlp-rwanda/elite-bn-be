import dotenv from "dotenv";
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
dotenv.config();

export const sendEmail = async (receiver, sender, subject, template) => {
    const msg = {
        to: receiver,
        from: sender,
        subject: subject,
        html: template,
    };
    await sendgrid.send(msg);
};
export const sendMultipleEmails = async (
    receivers,
    sender,
    subject,
    template
) => {
    const msg = {
        to: receivers,
        from: sender,
        subject: subject,
        html: template,
    };
    await sendgrid.sendMultiple(msg);
};