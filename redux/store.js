import { applyMiddleware, combineReducers} from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import {
  IconFilterReducer,
  SearchReducer,
  UserReducer,
  CartReducer,
} from "./adminReducer";
import { cartitems } from "./adminAction";
import storage from 'redux-persist/lib/storage'

const combinedReducer = combineReducers({
  user: UserReducer,
  search: SearchReducer,
  iconfilter: IconFilterReducer,
  cart: CartReducer,
  userItems: cartitems,
});

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};


const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require("redux-persist");

    const persistConfig = {
      key: 'root',
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};




export let persistor = persistStore(makeStore);
  
