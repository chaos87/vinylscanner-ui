import { combineReducers } from 'redux';
import authReducer from './auth';
import registerReducer from './register';
import searchReducer from './search';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['error', 'isFetching']
};

const registerPersistConfig = {
  key: 'register',
  storage: storage,
  blacklist: ['error', 'isConfirmed', 'isRegistered', 'isResent', 'isFetching', 'isResendFetching', 'isConfirmFetching']
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  register: persistReducer(registerPersistConfig, registerReducer),
  search: searchReducer,
})
