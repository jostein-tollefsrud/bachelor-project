import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.BACHERLORHUSETSENDGRID);

async function sendEmail(req, res) {
  console.log('her er server body!!', req.body);

  const msg = {
    to: 'refurbishinghuset@gmail.com',
    from: 'refurbishinghuset@gmail.com',
    templateId: req.body.templateId || 'd-075f8b12c0ba429a95955b458f5ae183',
    subject: req.body.Emne,

    dynamicTemplateData: {
      allThings: req.body,
    },
  };
  try {
    await sendgrid.send(msg);
    return res.status(200).json({ error: '' });
  } catch (error) {
    console.log('its a error', error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
export default sendEmail;
