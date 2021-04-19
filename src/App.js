import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history/history.js';

import CanvasContainer from "./components/CanvasContainer/CanvasContainer.jsx";
import RoutingMenu from "./components/RoutingMenu/RoutingMenu.jsx";

// shaders
import Try1 from "./shaders/try1/Try1.js";
import Try2 from "./shaders/try2/Try2.js";

const shaders = ["Try1"];

class App extends Component {

  render() {
    // let routes = shaders.map((shader, index) => <Route key={index} path={`/${shader}`} render={() => <CanvasContainer shader={eval(shader)} /> } />);
    return (
      <Router history={history}>
        <Switch>
          <Route exact={true} path="/" render={() => < RoutingMenu />} />
          {/* {routes} */}
          <Route path="/try1" render={() => <CanvasContainer shader={Try1} />} />
          <Route path="/try2" render={() => <CanvasContainer shader={Try2} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
