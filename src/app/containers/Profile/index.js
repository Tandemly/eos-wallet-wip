import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Profile from "components/Profile";

// TODO genericize this to network call to specific user
const mapStateToProps = ({ login: { user } }) => ({
  name: user.display_name || user.account_name,
  image: { url: user.image_url }, 
});

const Container = connect(
  mapStateToProps,
)(Profile);

export default withRouter(Container);
