const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

// send mail
const sendMail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: txt,
        html: `
            <div style="max-width: 700px; padding: 50px 20px; margin: auto; border: 1px solid #ddd;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Benvenuti a BuscoMas!</h2>
                <p>Felicitazioni! A breve potrai iniziare a essere un utente di BuscoMas.
                    Fare clic sul pulsante sottostante per convalidare l'indirizzo e-mail.
                </p>

                <a href=${url} style="background: teal; text-decoration: none; color: #fff; padding: 10px 15px; border-radius: 5px; margin: 20px 0;">${txt}</a>

                <p>Se il pulsante non funziona, copia e incolla il seguente link nel tuo browser:</p>

                <div>${url}</div>

                <p>Se non hai richiesto questa e-mail, puoi ignorarla.</p>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) return err;
        return info;
    })
}

module.exports = sendMail;

