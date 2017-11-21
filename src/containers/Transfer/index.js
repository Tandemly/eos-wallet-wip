import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { change } from 'redux-form';
import TransferForm from 'components/TransferForm';
import { tryPostTransaction } from '../../redux-modules/transfer/transfer-actions';
import { selectEOSTotalBalance } from '../../redux-modules/eos-account/account-selectors';

function setAmountToBalance() {
  return (dispatch, getState) => {
    const balance = selectEOSTotalBalance(getState());

    return dispatch(change('transfer', 'amount', balance));
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostTransaction({
      history,
      ...values,
    }));
  },
  updateAmount() {
    dispatch(setAmountToBalance());
  }
});

const TransferContainer = connect(
  null,
  mapDispatchToProps,
)(TransferForm);

export default withRouter(TransferContainer);
