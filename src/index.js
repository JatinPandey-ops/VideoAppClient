// import { ThemeProvider } from '@mui/system';
import React  from "react";
import {ThemeContextProvider } from "./context/ThemeContext";

import ReactDOM from "react-dom/client";
import App from "./App";
import { DisplayContextProvider } from "./context/DisplayContext";
import { AlertContextProvider } from "./context/AlertContext";
import { store } from "./redux/store";
import {Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore} from "redux-persist"
import axios from 'axios'
axios.defaults.baseURL = "https://electron-api.herokuapp.com/api"
const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store)

root.render(
  <React.StrictMode>
  <ThemeContextProvider>
  <DisplayContextProvider>
    <AlertContextProvider>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App/>

      </PersistGate>

    </Provider>
    </AlertContextProvider>

  </DisplayContextProvider>

  </ThemeContextProvider>

  </React.StrictMode>
);
