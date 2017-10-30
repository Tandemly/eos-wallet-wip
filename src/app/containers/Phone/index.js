import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PhoneForm from 'components/PhoneForm';
import { tryPostPhone } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostPhone({
      history,
      ...values
    }));
  },
});

const PhoneContainer = connect(
  null,
  mapDispatchToProps,
)(PhoneForm);

export default withRouter(PhoneContainer);
