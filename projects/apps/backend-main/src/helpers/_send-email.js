import Sendgrid from 'sendgrid';

const {
  SENDGRID_API_SECRET,
} = process.env;

const sendGrid = Sendgrid(SENDGRID_API_SECRET);

const sendEmail = async (email, subject, content) => {
  const request = sendGrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [{ email }],
          subject,
        },
      ],
      from: {
        email: 'info@sloops.today',
      },
      content: [
        {
          type: 'text/plain',
          value: content,
        },
      ],
    },
  });

  let response;

  try {
    response = await sendGrid.API(request);
    const {
      statusCode,
    } = response;
    return statusCode;
  } catch (error) {
    console.log('SENDGRID ERROR', error); // eslint-disable-line no-console
    console.log('SENDGRID ERROR', JSON.stringify(error)); // eslint-disable-line no-console
    console.log('SENDGRID ERROR', JSON.stringify(error.response)); // eslint-disable-line no-console
  }

  return response;
};

export default sendEmail;
