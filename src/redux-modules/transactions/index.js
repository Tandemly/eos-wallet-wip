import reducer from "./transactions-reducer";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

export default persistReducer(
  {
    key: "transactions",
    storage: sessionStorage
  },
  reducer
);
