import { connect } from 'react-redux';
import Notification from "components/Notification";

const mapStateToProps = ({ notification: { status, text } }) => ({
  status,
  text,
});

const Notifications = connect(
  mapStateToProps,
)(Notification);

export default Notifications;
