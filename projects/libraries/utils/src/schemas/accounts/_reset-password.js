import yup from 'yup';
import '../helpers';

const resetPassword = yup.object().shape({
  password: yup.string().required(),
  passwordConfirm: yup.string().required().sameAs(yup.ref('password'), 'passwords do not match'),
});

export default resetPassword;
