import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CurrentEOSBalance } from "../Balance";
import Login from "containers/Login";
import Shortcuts from "components/Shortcuts";
import { doLogout } from "../../thunks/login";

const unauthLinks = [
  {
    to: "/users",
    text: "Users"
  },
  {
    to: "/about",
    text: "About"
  },
  {
    to: "/faq",
    text: "FAQ"
  }
];
const authLinks = ({ onLogout }) => [
  {
    to: "/",
    text: "Transfer",
    iconClass: "icon-transfer u-mr1"
  },
  {
    to: "/transactions",
    text: "Transaction History",
    iconClass: "icon-history u-mr1"
  },
  {
    to: "/accounts",
    text: "Accounts",
    iconClass: "icon-account u-mr1"
  },
  {
    to: "/logout",
    onClick: onLogout,
    text: "Logout",
    iconClass: "icon-logout u-mr1"
  },
  ...unauthLinks
];

const Menu = props => {
  const { isAuthenticated } = props;
  return (
    <div className="menu p-lg">
      {!isAuthenticated && <Login className="aside-login" modal={false} />}

      {isAuthenticated && <CurrentEOSBalance />}

      <Shortcuts data={isAuthenticated ? authLinks(props) : unauthLinks} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(doLogout())
});

export default withRouter(connect(undefined, mapDispatchToProps)(Menu));
