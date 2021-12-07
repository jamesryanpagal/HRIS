import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// -------------------------- REDUCER -------------------------
import { usersReducers, applicantsReducers } from "../Redux_reducers/reducers";

import { employeeReducers } from "../Redux_reducers/employeeReducers";

import { newAdminReducers } from "../Redux_reducers/newAdminReducers";

import { departmentReducers } from "../Redux_reducers/departmentReducers";

import { updatingReducers } from "../Redux_reducers/updatingReducers";

import { companyProjectReducers } from "../Redux_reducers/companyProjectReducers";

const reducer = combineReducers({
  GS_Admin: usersReducers,
  Applicants: applicantsReducers,
  Employee: employeeReducers,
  newAdmin: newAdminReducers,
  department: departmentReducers,
  Updating: updatingReducers,
  CompanyProjects: companyProjectReducers,
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
