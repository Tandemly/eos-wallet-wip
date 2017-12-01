import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Transactions from "components/Transactions";
import { selectRecentTransactions } from "../../redux-modules/transactions/transactions-selectors";
import { selectEOSAccountName } from "../../redux-modules/eos-account/account-selectors"

// TODO parameterize props
const mapStateToProps = state => ({
  account: selectEOSAccountName(state),
  data: selectRecentTransactions(state)
});

const Container = connect(mapStateToProps)(Transactions);

export default withRouter(Container);
