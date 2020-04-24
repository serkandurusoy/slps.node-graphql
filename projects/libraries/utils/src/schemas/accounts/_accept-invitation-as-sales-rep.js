import yup from 'yup';
import '../helpers';

const acceptInvitationAsSalesRep = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
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
  password: yup.string().required(),
  passwordConfirm: yup.string().required().sameAs(yup.ref('password'), 'passwords do not match'),
});

export default acceptInvitationAsSalesRep;
