/*
	Uses Twilio's Sendgrid to send mails
*/

const sg = require("@sendgrid/mail");
sg.setApiKey(process.env.SENDGRID_API_KEY);

const send_mail = ({origin, destination, subject, message}) => {
	const msg = {
		to: origin,
		from: destination,
		subject: subject,
		text: message
	};
	return sg.send(msg);
};

module.exports = send_mail;


