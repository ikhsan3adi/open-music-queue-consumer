const nodemailer = require('nodemailer');
const config = require('./utils/config');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      auth: {
        user: config.smtp.address,
        pass: config.smtp.password,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music Apps',
      to: targetEmail,
      subject: 'Ekspor Lagu Playlist',
      text: 'Terlampir hasil dari ekspor lagu playlist',
      attachments: [
        {
          filename: 'playlist_songs.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
