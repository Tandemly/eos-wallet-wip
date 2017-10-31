import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignupFinalForm from 'components/SignupFinalForm';
import { tryPostSignup } from './actions';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostSignup({
      history,
      ...values
    }));
  },
});

const SignupFinal = connect(
  null,
  mapDispatchToProps,
)(SignupFinalForm);

export default withRouter(SignupFinal);
