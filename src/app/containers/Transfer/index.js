import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TransferForm from 'components/TransferForm';
import { tryPostTransaction } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostTransaction({
      history,
      ...values,
    }));
  },
});

const TransferContainer = connect(
  null,
  mapDispatchToProps,
)(TransferForm);

export default withRouter(TransferContainer);
