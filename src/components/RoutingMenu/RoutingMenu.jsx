import React, { Component } from 'react';
import history from "./../../history/history.js";
import shaders from "./shaders.json";

class RoutingMenu extends Component {
  handleClick = (path) => {
    history.push(`/${path}`);
  }
  render() {
    let buttons = shaders.map((shader, index) => {
      return <button key={index} className="btn btn-primary ml-5" onClick={(e) => { this.handleClick(shader) }}>
        {shader}
      </button>
    })

    return <div className="d-flex flex-row flex-wrap">
      {buttons}
    </div>
  }
}

export default RoutingMenu;