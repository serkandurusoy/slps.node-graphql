import yup from 'yup';

const updateAccountSettings = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumbers: yup.array().of(yup.string().required()).min(1).required(),
  address: yup.object().shape({
    lat: yup.number().required(),
    lng: yup.number().required(),
    number: yup.string().required(),
    street: yup.string(),
    area: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    state: yup.string(),
    country: yup.string().required(),
  }).required(),
});

export default updateAccountSettings;
