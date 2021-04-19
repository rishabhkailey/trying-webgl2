import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // canvas size in pixels
      sizePixels: {
        height: props.height | 500,
        width: props.width | 500
      }
    }

    this.canvasRef = React.createRef();

  }

  setSize(height, width) {
    this.setState({
      ...this.state,
      sizePixels: { height, width }
    })
  }

  componentDidMount() {
    if (this.props.setCanvasRef) {
      // seting canvas ref in parent state/props
      this.props.setCanvasRef(this.canvasRef);
    }
  }

  render() {
    return (
      <div style={{ height: "98vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

        <canvas ref={this.canvasRef} style={{ width: (this.state.sizePixels.width + "px"), height: (this.state.sizePixels.height + "px"), border: "1px solid black" }} >

        </canvas>

      </div>
    )
  }
}

export default Canvas;