import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import spacecraftReducer from './spacecraft';
import spaceportReducer from './spaceport';
import planetReducer from './planet';
import profileReducer from './profile';
import walletReducer from './wallet';
import planetCommentReducer from './planetComments';
import apiReducer from './api';
import travelClassReducer from './travelClass';
import flightReducer from './flight';
import bookingReducer from './bookings';

const rootReducer = combineReducers({
  session,
  spacecrafts: spacecraftReducer,
  spaceports: spaceportReducer,
  planets: planetReducer,
  profiles: profileReducer,
  wallets: walletReducer,
  planetComments: planetCommentReducer,
  api: apiReducer,
  travelClasses: travelClassReducer,
  flights: flightReducer,
  bookings: bookingReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
