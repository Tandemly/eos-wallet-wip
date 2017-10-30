import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Transactions from 'components/Transactions';

// TODO parameterize props
const mapStateToProps = () => ({
});

const Container = connect(
  mapStateToProps,
)(Transactions);

export default withRouter(Container);
