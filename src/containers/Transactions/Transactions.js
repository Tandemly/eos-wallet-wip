import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Transactions from "components/Transactions";
import { selectRecentTransactions } from "../../redux-modules/transactions/transactions-selectors";

// TODO parameterize props
const mapStateToProps = state => ({
  data: selectRecentTransactions(state)
});

const Container = connect(mapStateToProps)(Transactions);

export default withRouter(Container);
