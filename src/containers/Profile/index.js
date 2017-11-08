import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Profile from "components/Profile";

// TODO genericize this to network call to specific user
const mapStateToProps = ({ login: { user: { name, picture }}}) => ({
  name,
  image: { url: picture },
});

const Container = connect(
  mapStateToProps,
)(Profile);

export default withRouter(Container);
