import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "reducers";

const persistConfig = {
  key: "search",
  storage: storage,
  whitelist: ["search"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk, logger);

const store = createStore(persistedReducer, composeWithDevTools(middleware));

const persistor = persistStore(store);

export { persistor, store };
