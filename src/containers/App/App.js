// @flow
// global localStorage, window
import * as React from "react";
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from "components/Header";
import Footer from "components/Footer";
import Menu from "components/Menu";
import Modal from "components/Modal";

import Logout from "containers/Logout";
import AccountName from "containers/AccountName";
import Email from "containers/Email";
import Phone from "containers/Phone";
import SignupFinal from "containers/SignupFinal";

import Login from "routes/Login";
import Signup from "routes/Signup";
import About from "routes/About";
import Faq from "routes/Faq";
import Transfer from "routes/Transfer";
import Transactions from "routes/Transactions";
import Users from "routes/Users";
import Profile from "routes/Profile";
import Permissions from "routes/Permissions";
import Preferences from "routes/Preferences";
import NoMatch from "routes/NoMatch";

import {
  toggleMenu,
  closeMenu,
  routeLoad
} from "./reducer";

import "./App.scss";

const RoutesAuthenticated = ({ isAuthenticated, location }) => 
!isAuthenticated ? 
  <Redirect to="/login" />
: ([
  <Route path="/" exact component={Transfer} key="transfer" />,
  <Route path="/transactions" component={Transactions} key="transactions" />,
  <Route path="/users" component={Users} key="users" />,
  <Route path="/user/:id" component={Profile} key="user" />,
  <Route path="/permissions" component={Permissions} key="permissions" />,
  <Route path="/preferences" component={Preferences} key="preferences" />,
  <Route path="/logout" component={Logout} key="logout" />,
]);

const renderModalRoutes = (props) => (
  <Switch>
    <Redirect from="/create-account" to="/signup" />
    <Route path="/login" render={() => <Login {...props} />} />
    <Signup {...props}>
      <Switch>
        <Route exact path="/signup" component={() => <AccountName {...props} />} />
        <Route exact path="/signup/email" component={() => <Email {...props} />} />
        <Route exact path="/signup/phone" component={() => <Phone {...props} />} />
        <Route path="/signup/complete" component={() => <SignupFinal {...props} />} />
      </Switch>
    </Signup>
  </Switch>
);

const modalRoutes = [
  '/login',
  '/signup',
  '/create-account',
  '/connect-account',
];

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    /* eslint-disable */
    this.previousLocation = this.unauthLocation = {
      pathname: '/about',
      hash: '',
      search: '',
    };
    /* eslint-enable */
  }

  componentWillUpdate(nextProps) {
    const {
      history: { location } = { location: window.location },
      isAuthenticated,
    } = this.props;

    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = isAuthenticated ? this.props.location : this.unauthLocation;
    }
  }

  handleModalClose() {
    const { history } = this.props;
    history.push(this.previousLocation);
    console.log('closing')
  }

  render() {
    const {
      handleClickMenu,
      handleClickMenuClose,
      history: { location } = { location: window.location },
      isAuthenticated,
      isMenuOpen,
    } = this.props;
    const handleModalClose = this.handleModalClose.bind(this);
    const isModalOpen = modalRoutes.some(path => new RegExp(path).test(location.pathname));

    return (
      <main className={`${isMenuOpen ? 'open' : 'closed'}`}>
        <Helmet titleTemplate="%s | EOS Wallet" defaultTitle="EOS Wallet" />
    
        <Header
          isAuthenticated={isAuthenticated}
          onClick={handleClickMenu}
        />
        
        <div className="wrapper">
          <aside className="sidebar">
            <Menu isAuthenticated={isAuthenticated} />
          </aside>
    
          <section className={`body ${isMenuOpen ? 'open' : 'closed'}`}>
            <div  
              onClick={handleClickMenuClose}
              className="menu-closer"
              role="button"
              tabIndex="0" />

            <Switch location={isModalOpen ? this.previousLocation : location}>
              <Route path="/about" component={About} />
              <Route path="/faq" component={Faq} />
              <RoutesAuthenticated isAuthenticated={isAuthenticated} />
              <Route path="*" component={NoMatch} />
            </Switch>
    
            <Footer />
          </section>
        </div>

        <Modal
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          renderRoute={renderModalRoutes}
        />
      </main>
    );
  }
}

const mapStateToProps = ({ 
  app: { isMenuOpen },
  login: { isAuthenticated },
}) => ({
  isAuthenticated: false,
  isMenuOpen,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickMenu() {
    dispatch(toggleMenu());
  },
  handleClickMenuClose() {
    dispatch(closeMenu());
  },
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
