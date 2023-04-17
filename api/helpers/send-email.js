const nodemailer = require('nodemailer')
module.exports = {


  friendlyName: 'Send email',


  description: 'for email send on signup',


  inputs: {
    to: {
      type: "string",
      required: true
    },

    subject: {
      type: "string",
      required: true
    },
    text: {
      type: "string",
      required: true
    },
    

  },


  exits: {

    success: {
      description: 'Email done ',
    },

  },


  fn: async function (inputs) {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivamp@zignuts.com",
        pass: "skju ubqt bepi qseg"
      }
    });

    const data = {
      from: "shivamp@zignuts.com",
      to: inputs.to,
      subject: inputs.subject,
      text: inputs.text
    };
    sails.log.debug(data);
    transporter.sendMail(data, (error, info) => {
        error
          ? sails.log.error(error)
          : sails.log.info("Email sent: " + info.response);
      });
  }


};

