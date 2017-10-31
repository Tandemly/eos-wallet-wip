import { connect } from 'react-redux';
import Balance from 'components/Balance';

/* eslint-disable camelcase */
const mapStateToProps = ({ account: { total, difference, symbol } }) => ({
  symbol,
  difference: difference ? difference.toFixed(6) : 0,
  total: parseFloat(total || 0),
});

const BalanceContainer = connect(
  mapStateToProps,
)(Balance);

export default BalanceContainer;
