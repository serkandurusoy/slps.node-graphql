import yup from 'yup';

const sendInvitations = yup.object().shape({
  role: yup.string().required(),
  manager: yup.number(),
  invitations: yup.array().of(yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
  })).min(1).required(),
});

export default sendInvitations;
