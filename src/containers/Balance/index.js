import { connect } from "react-redux";
import Balance from "components/Balance";
import {
  selectEOSBalanceDifference,
  selectEOSTotalBalance
} from "../../redux-modules/eos-account/selectors";

/* eslint-disable camelcase */
const mapStateToProps = state => ({
  difference: selectEOSBalanceDifference(state),
  total: selectEOSTotalBalance(state)
});

const BalanceContainer = connect(mapStateToProps)(Balance);

export default BalanceContainer;
