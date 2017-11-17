import * as React from "react";
import Balance from "containers/Balance";
import Login from "containers/Login";
import Shortcuts from "components/Shortcuts";

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
const authLinks = [
  [
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
    }
    // {
    //   to: '/login',
    //   onClick: onLogout,
    //   text: 'Logout',
    //   iconClass: 'icon-logout u-mr1',
    // },
  ],
  ...unauthLinks
];

const Menu = ({ isAuthenticated }) => (
  <div className="menu p-lg">
    {!isAuthenticated && <Login className="aside-login" modal={false} />}

    {isAuthenticated && <Balance />}

    <Shortcuts data={isAuthenticated ? authLinks : unauthLinks} />
  </div>
);

export default Menu;
