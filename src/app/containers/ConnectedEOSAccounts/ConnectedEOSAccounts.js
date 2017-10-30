import { connect } from 'react-redux';
import ConnectedEOSAccountsForm from "components/ConnectedEOSAccountsForm";

/* eslint-disable camelcase */
const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    // values
    // account_name, active_key, owner_key

    // dispatch(tryPostEmail({
    //   history,
    //   ...values
    // }));
  },
});

const ConnectedEOSAccounts = connect(
  null,
  mapDispatchToProps,
)(ConnectedEOSAccountsForm);

export default ConnectedEOSAccounts;
