import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas/root-saga';
import rootReducer from './reducers/root-reducer';

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers/root-reducer', () => {
            store.replaceReducer(rootReducer)
        })
    }

    sagaMiddleware.run(rootSaga);

    return store
};

export default configureStore