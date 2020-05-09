const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendAlertLoginEmail = (email, name, wrongLoginCount) => {
  return sgMail.send({
    to: email,
    from: 'huynhtran924@gmail.com',
    subject: 'Wrong login more times',
    "text": `${name} have entered the wrong account or password more than ${wrongLoginCount} times`
  })
}

module.exports = sendAlertLoginEmail;