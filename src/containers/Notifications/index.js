import { connect } from "react-redux";
import Notification from "components/Notification";
import { unsetNotification } from "../../redux-modules/notifications/notifications-actions";

const mapStateToProps = ({ notification: { status, text } }) => ({
  status,
  text
});

const mapDispatchToProps = dispatch => ({
  unsetNotification() {
    dispatch(unsetNotification());
  }
});

const Notifications = connect(mapStateToProps, mapDispatchToProps)(
  Notification
);

export default Notifications;
