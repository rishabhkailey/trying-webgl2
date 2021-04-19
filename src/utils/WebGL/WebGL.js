class WebGL {

  constructor(canvas, args) {
    this.clearColor = [1.0, 1.0, 1.0, 1.0];

    if (args) {
      let { clearColor } = args;
      this.clearColor = clearColor | [1.0, 1.0, 1.0, 1.0];
    }

    this.gl = canvas.getContext("webgl2");
    this.setClearColor(this.clearColor)
  }

  setClearColor(clearColor) {
    if (clearColor) {
      this.clearColor = clearColor;
      this.gl.clearColor(...this.clearColor);
    }
  }

  createArrayBuffer(floatArray, isStatic = true) {
    let buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, floatArray, isStatic ? this.gl.STATIC_DRAW : this.gl.DYNAMIC_DRAW);
    this.gl.bindBuffer(this.ARRAY_BUFFER, null);
    return buffer;
  }

  clearCanvas() {
    this.gl.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
  }

}

export default WebGL;