import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PreferencesForm from 'components/PreferencesForm';
// import { tryPostPhone } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  callAPI(values) {
    // dispatch(tryPostPhone({
    //   history,
    //   ...values
    // }));
  },
});

const Preferences = connect(
  null,
  mapDispatchToProps,
)(PreferencesForm);

export default withRouter(Preferences);
