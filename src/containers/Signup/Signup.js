import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignupForm from 'components/SignupForm';
import { tryPostSignup } from './actions';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostSignup({
      history,
      ...values
    }));
  },
});

const Signup = connect(
  null,
  mapDispatchToProps,
)(SignupForm);

export default withRouter(Signup);
