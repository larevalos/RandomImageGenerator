import React from "react";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import configureStore, {history} from "./store";
import App from "./containers/App";



export const store = configureStore();

//new AmplifyBridge(store);


const MainApp = () =>  //provider make redux store to be available in the app (MainApp)
  <Provider store={store}>   
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>;


export default MainApp;