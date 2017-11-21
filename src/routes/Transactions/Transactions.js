import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import Container from "containers/Transactions";
//import Filter from "components/Filter";
import { selectRecentTransactions } from "../../redux-modules/transactions/transactions-selectors";

const Transactions = ({ transactions }) => (
  <div>
    <Helmet>
      <title>Transaction History</title>
    </Helmet>

    <div className="content">
      <div className="d-md-flex justify-content-between items-center">
        <div>
          <h2 className="title is-2">Transaction History</h2>
        </div>
      </div>

      <div>
        {/*<Filter data={transactions}>*/}
        <Container />
        {/*</Filter>*/}
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  transactions: selectRecentTransactions(state)
});

export default connect(mapStateToProps)(Transactions);
