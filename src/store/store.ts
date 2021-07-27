import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/root.reducer';
import todosSaga from './sagas/todos.saga';

export const sagaMiddleware = createSagaMiddleware()
const enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const configureStore = (() => {
  return createStore(
    rootReducer,
    enhancers
  );

});


export const store = configureStore();
sagaMiddleware.run(todosSaga);