// @flow
// global localStorage, window
import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Menu from "./components/Menu/index";
import Modal from "./components/Modal/index";
import Login from "./routes/Login/index";
import Signup from "./routes/Signup/index";
import About from "./routes/About/index";
import Faq from "./routes/Faq/index";
import Transfer from "./routes/Transfer/index";
import Transactions from "./routes/Transactions/index";
import Users from "./routes/Users/index";
import Accounts from "./routes/Accounts/index";
import EditProfile from "./routes/EditProfile/index";
import NoMatch from "./routes/NoMatch/index";
import { closeMenu } from "./redux-modules/app/app-actions";
import { doLogout } from "./thunks/login";
import { toggleMenu } from "./redux-modules/app/app-actions";
import { selectWalletUserAuthenticated } from "./redux-modules/user/user-selectors";
import { selectIsMenuOpen } from "./redux-modules/app/app-selectors";
import "./App.scss";

const RoutesAuthenticated = ({ isAuthenticated, location }) =>
  !isAuthenticated ? (
    <Redirect to="/login" />
  ) : (
    [
      <Route path="/" exact component={Transfer} key="transfer" />,
      <Route
        path="/transactions"
        component={Transactions}
        key="transactions"
      />,
      <Route path="/accounts" component={Accounts} key="accounts" />,
      <Route path="/profile" component={EditProfile} key="profile" />
    ]
  );

const renderModalRoutes = props => (
  <Switch>
    <Redirect from="/create-account" to="/signup" />
    <Redirect from="/connect-account" to="/accounts" />
    <Route path="/login" render={() => <Login {...props} />} />
    <Route path="/signup" component={() => <Signup {...props} />} />
  </Switch>
);

const modalRoutes = ["/login", "/signup", "/create-account"];

type Props = {
  history: any,
  location: any,
  isMenuOpen: boolean,
  isAuthenticated: boolean,
  handleClickMenu: () => mixed,
  handleClickMenuClose: () => mixed,
  onLogout: () => mixed
};

type LocationType = {
  pathname: string,
  hash: string,
  search: string
};

class App extends React.Component<Props> {
  previousLocation: LocationType;
  unauthLocation: LocationType;

  constructor(props, context) {
    super(props, context);

    /* eslint-disable */
    this.previousLocation = this.unauthLocation = {
      pathname: "/about",
      hash: "",
      search: ""
    };
    /* eslint-enable */
  }

  componentWillUpdate(nextProps) {
    const {
      history: { location } = { location: window.location },
      isAuthenticated
    } = this.props;

    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = isAuthenticated
        ? this.props.location
        : this.unauthLocation;
    }
  }

  handleModalClose() {
    const { history } = this.props;
    history.push(this.previousLocation);
    console.log("closing");
  }

  render() {
    const {
      handleClickMenu,
      handleClickMenuClose,
      history: { location } = { location: window.location },
      isAuthenticated,
      isMenuOpen,
      onLogout
    } = this.props;
    const handleModalClose = this.handleModalClose.bind(this);
    const isModalOpen = modalRoutes.some(path =>
      new RegExp(path).test(location.pathname)
    );

    return (
      <main className={`${isMenuOpen ? "open" : "closed"}`}>
        <Helmet titleTemplate="%s | EOS Wallet" defaultTitle="EOS Wallet" />

        <Header
          isAuthenticated={isAuthenticated}
          onClick={handleClickMenu}
          onLogout={onLogout}
        />

        <div className="wrapper">
          <aside className="sidebar">
            <Menu isAuthenticated={isAuthenticated} />
          </aside>

          <section className={`body ${isMenuOpen ? "open" : "closed"}`}>
            <div
              onClick={handleClickMenuClose}
              className="menu-closer"
              role="button"
              tabIndex="0"
            />

            <Switch location={isModalOpen ? this.previousLocation : location}>
              <Route path="/users" component={Users} key="users" />,
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

const mapStateToProps = state => ({
  isAuthenticated: selectWalletUserAuthenticated(state),
  isMenuOpen: selectIsMenuOpen(state)
});

const mapDispatchToProps = dispatch => ({
  handleClickMenu() {
    dispatch(toggleMenu());
  },
  handleClickMenuClose() {
    dispatch(closeMenu());
  },
  onLogout: () => dispatch(doLogout())
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
