import yup from 'yup';

const updateMyBusiness = yup.object().shape({
  logo: yup.string().url().nullable(),
  name: yup.string().required(),
  description: yup.string(),
  categories: yup.array().of(yup.string().required()).min(1).required(),
  phoneNumber: yup.string().required(),
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
  openingHours: yup.array().of(yup.object().shape({
    open: yup.boolean(),
    // TODO: change this to weekday index
    day: yup.string().required(),
    openingHour: yup.string().required(),
    closingHour: yup.string().required(),
  }))
    .min(7)
    .max(7)
    .required(),
  pictures: yup.array().of(yup.string().url()).nullable(),
});

export default updateMyBusiness;
