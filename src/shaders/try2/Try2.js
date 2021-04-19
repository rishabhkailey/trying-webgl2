import VertexShaderFile from "./vertex-shader.glsl";
import FragmentShaderFile from "./fragment-shader.glsl";

import ShaderUtil from "../../utils/Shader/Shader.js";
import WebGLAnimation from "./../../utils/Animation/Animation.js";

class Try2 {

  constructor(webGL) {
    this.gl = webGL.gl;
    this.webGL = webGL;
    this.fps = 60;
    this.frameInterval = 1000 / this.fps;
  }

  animate = () => {
    // this.animationCallback();
    let AnimationObj = new WebGLAnimation(this.animationCallback, this.fps);
    AnimationObj.startAnimatation();
  }

  animationCallback = (deltaTime) => {
    // console.log(deltaTime);
    if (deltaTime)
      this.angle -= (deltaTime / this.frameInterval * this.anglePerFrame);
    // console.log(this.angle);
    this.gl.uniform1f(this.uAngleLoc, this.angle);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verticesCount);
  }

  render = async() => {

    let gl = this.gl;

    let shaderProg = await ShaderUtil.createProgramFromShaderFiles(this.gl, VertexShaderFile, FragmentShaderFile, true);

    // load the shaders (if not then next step will not work (get attrib Location))
    this.gl.useProgram(shaderProg);

    // get attribute locations (similar to index of array of arrguments), will be used to set their values
    let aPositionLoc = gl.getAttribLocation(shaderProg, "a_position")

    // storing location in the object context because it will be reused
    this.uAngleLoc = gl.getUniformLocation(shaderProg, "uAngle");

    // not required but good practice
    gl.useProgram(null);

    var verticesArray = new Float32Array([
      ...[...[0, 0, 0], ...[0.5, 0, 0], ...[0.5, 0.2, 0]],
      ...[...[0.5, 0, 0], ...[0.5, 0.5, 0], ...[0.3, 0, 0]],
      ...[...[0, 0, 0], ...[-0.5, 0, 0], ...[-0.5, -0.2, 0]],
      ...[...[-0.5, 0, 0], ...[-0.5, -0.5, 0], ...[-0.3, 0, 0]]
    ]);

    this.verticesCount = verticesArray.length;

    let verticesBuffer = this.webGL.createArrayBuffer(verticesArray);

    // load the shaders so we can set their values
    gl.useProgram(shaderProg);

    // set aPostionLoc attribute value
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    // select/enable the attribute whose values we are setting right now
    gl.enableVertexAttribArray(aPositionLoc);
    // tell how to get the value of attribute from buffer, (attributeLocation, number of values per iteration, value types)
    gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // angle per frame
    this.anglePerFrame = (Math.PI / 180.0) * 10; // 1 deg per frame
    this.angle = 0;

    this.animate();
  }



}

export default Try2;