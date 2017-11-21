import { connect } from "react-redux";
import EOSAccount from "components/EOSAccount";
import {
  selectEOSAccountName,
  selectEOSActiveKeys,
  selectEOSOwnerKeys
} from "../../redux-modules/eos-account/account-selectors";
import { disconnectEOSAccount } from "../../redux-modules/eos-account/account-actions";

const mapStateToProps = state => ({
  accountName: selectEOSAccountName(state),
  activeKeys: selectEOSActiveKeys(state),
  ownerKeys: selectEOSOwnerKeys(state)
});

const mapDispatchToProps = dispatch => ({
  onDisconnect: () => {
    dispatch(disconnectEOSAccount());
  }
});

const ConnectedEOSAccount = connect(mapStateToProps, mapDispatchToProps)(
  EOSAccount
);

export default ConnectedEOSAccount;
