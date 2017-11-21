import reducer from "./notifications-reducer";
import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

export default persistReducer(
  {
    key: "notifications",
    storage: sessionStorage
  },
  reducer
);
