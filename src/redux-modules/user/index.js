import userReducer from "./user-reducer";
import CookieStorage from "redux-persist-cookie-storage";
import { persistReducer } from "redux-persist";

export default persistReducer(
  {
    key: `wallet-user`,
    storage: new CookieStorage({ expiration: 60 * 60 }) //One hour login timeout
  },
  userReducer
);
