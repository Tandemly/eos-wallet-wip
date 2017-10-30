import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import { tryPostLogin } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    return dispatch(tryPostLogin({
      history,
      ...values,
    }));
  },
});

const LoginContainer = connect(
  null,
  mapDispatchToProps,
)(LoginForm);

export default withRouter(LoginContainer);
