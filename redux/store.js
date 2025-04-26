import { configureStore } from '@reduxjs/toolkit';
import bookReducer from "./bookSlice";
import AuthReducer from "./demoAuthSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',       
  storage
};

const persistBookReducer = persistReducer(persistConfig , bookReducer)
const persistAuthReducer = persistReducer(persistConfig , AuthReducer)

const store = configureStore({
  reducer: {
    book: persistBookReducer,
    demoAuth: persistAuthReducer,
  },
});

const persistor = persistStore(store);

export default store;