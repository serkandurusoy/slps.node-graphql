import yup from 'yup';

const forgotPassword = yup.object().shape({
  email: yup.string().required().email(),
});

export default forgotPassword;
