import React, { Component } from "react";

// components
import Canvas from "./../canvas/Canvas.jsx";

// utils
import WebGL from "./../../utils/WebGL/WebGL.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = null;
    this.webGL = null;
    this.Shader = this.props.shader;
  }

  setCanvasRef = (ref) => {
    this.canvasRef = ref;
    this.webGL = new WebGL(this.canvasRef.current);
    this.renderShader();
  }

  renderShader = () => {
    let shader = new this.Shader(this.webGL);
    shader.render() 
  }

  render() {
    return (
      <Canvas setCanvasRef={this.setCanvasRef} />
    );
  }
}

export default App;
