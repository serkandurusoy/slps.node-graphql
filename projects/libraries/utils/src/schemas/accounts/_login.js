import yup from 'yup';

const login = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default login;
