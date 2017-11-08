import { connect } from 'react-redux';
import Notification from 'components/Notification';
import { unsetNotification } from './reducer';

const mapStateToProps = ({ notification: { status, text } }) => ({
  status,
  text,
});

const mapDispatchToProps = (dispatch) => ({
  unsetNotification() {
    dispatch(unsetNotification());
  }
});

const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);

export default Notifications;
