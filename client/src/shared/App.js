import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Test from "../pages/Test";
import PostWrite from "../pages/PostWrite";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/test" component={Test} />
        <Route path="/write" component={PostWrite} />
      </ConnectedRouter>
    </>
  );
}

export default App;
