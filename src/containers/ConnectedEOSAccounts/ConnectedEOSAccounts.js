import { connect } from 'react-redux';
import ConnectedEOSAccountsForm from 'components/ConnectedEOSAccountsForm';
import { tryPostEOSAccount } from './actions'

/* eslint-disable camelcase */
const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    dispatch(tryPostEOSAccount({
      history,
      ...values
    }));
  },
});

const ConnectedEOSAccounts = connect(
  null,
  mapDispatchToProps,
)(ConnectedEOSAccountsForm);

export default ConnectedEOSAccounts;
