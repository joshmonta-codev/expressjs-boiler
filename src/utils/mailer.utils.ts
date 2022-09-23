import nodemailer, { SendMailOptions } from 'nodemailer';
import { config } from "../config";
import log from './logger.utils';

// async function createTestCreds() {
//     const creds = await nodemailer.createTestAccount();
//     console.log({ creds });
// }
// createTestCreds();
const smtp = config.smtp;
const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: 587,
    secure: false,
    auth: { user: smtp.user, pass: smtp.pass },
    tls: {
        ciphers: 'SSLv3'
    }
})
export async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, "Error sending email...");
            return;
        }
        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
}