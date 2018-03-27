import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

//const loggerMiddleware = createLogger();

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


export default configureStore;