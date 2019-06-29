import React from 'react';
import './App.css';

import Router from './router/Router'

import storeFactory from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { WsCloudConnector } from './services/WsCloudConnector';

const {store, persistor} = storeFactory()

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <WsCloudConnector store={store} />
            <Router store={store} />
          </div>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default App;
