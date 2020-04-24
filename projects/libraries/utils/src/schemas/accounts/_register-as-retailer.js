import yup from 'yup';
import '../helpers';

const registerAsRetailer = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required().sameAs(yup.ref('password'), 'passwords do not match'),
});

export default registerAsRetailer;
