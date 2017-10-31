import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmailForm from 'components/EmailForm';
import { tryPostEmail } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostEmail({
      history,
      ...values
    }));
  },
});

const Email = connect(
  null,
  mapDispatchToProps,
)(EmailForm);

export default withRouter(Email);
