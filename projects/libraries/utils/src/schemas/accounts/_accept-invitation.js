import yup from 'yup';
import '../helpers';

const acceptInvitationAsSalesRep = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required().sameAs(yup.ref('password'), 'passwords do not match'),
});

export default acceptInvitationAsSalesRep;
