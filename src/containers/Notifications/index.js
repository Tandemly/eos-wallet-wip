import { connect } from "react-redux";
import Notification from "components/Notification";
import { unsetNotification } from "../../redux-modules/notifications/notifications-actions";
import { selectNotificationsState } from "../../redux-modules/notifications/notifications-selectors";

const mapStateToProps = state => selectNotificationsState(state);

const mapDispatchToProps = dispatch => ({
  unsetNotification() {
    dispatch(unsetNotification());
  }
});

const Notifications = connect(mapStateToProps, mapDispatchToProps)(
  Notification
);

export default Notifications;
