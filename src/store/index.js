import { createStore,
  applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import mainReducer from './reducers'
// import storeData from './initialState'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] 
}
const persistedReducer = persistReducer(persistConfig, mainReducer)

const storeFactory = (initialState, options) => {
  let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
  let persistor = persistStore(store)
  return { store, persistor }

  // const store = createStore(mainReducer, initialState, applyMiddleware(thunkMiddleware))
  // return store
}

export default storeFactory