import * as React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { tryLogout } from './reducer';

const mapDispatchToProps = (dispatch, { history }) => ({
  willNavigate() {
    dispatch(tryLogout({ history }));
  },
});

class _Logout extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.willNavigate();
  }

  render() {
    return null;
  }
}

const Logout = connect(
  null,
  mapDispatchToProps,
)(_Logout);


export default withRouter(Logout);