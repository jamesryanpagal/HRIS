import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// -------------------------- REDUCER -------------------------
import { usersReducers } from "../Redux_reducers/reducers";

const reducer = combineReducers({
  GS_Admin: usersReducers,
});

// ------------------------- PERSIST CONFIG ------------------
const persistConfig = {
  key: "persistRootReducer",
  storage,
};

const persistreducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

export const store = createStore(
  persistreducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persiststore = persistStore(store);
