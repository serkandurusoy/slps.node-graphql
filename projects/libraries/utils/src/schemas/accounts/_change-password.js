import yup from 'yup';
import '../helpers';

const changePassword = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
  newPasswordConfirm: yup.string().required().sameAs(yup.ref('newPassword'), 'passwords do not match'),
});

export default changePassword;
