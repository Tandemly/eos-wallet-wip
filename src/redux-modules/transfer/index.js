import reducer from "./transfer-reducer";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

export default persistReducer(
  {
    key: "transfer",
    storage: sessionStorage
  },
  reducer
);
