import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { middlewares } from './middlewares';
import authReducer from './modules/auth/reducers';


const rootReducer = combineReducers({
  authReducer,
 
});

// STORE
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;