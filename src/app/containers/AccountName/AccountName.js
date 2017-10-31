import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AccountNameForm from 'components/AccountNameForm';
import { tryPostUsername } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    console.log(history);
    dispatch(tryPostUsername({
      history,
      ...values
    }));
  },
});

const AccountName = connect(
  null,
  mapDispatchToProps,
)(AccountNameForm);

export default withRouter(AccountName);
