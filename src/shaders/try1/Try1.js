import VertexShaderFile from "./vertex-shader.glsl";
import FragmentShaderFile from "./fragment-shader.glsl";

import ShaderUtil from "./../../utils/Shader/Shader.js";

class Try1 {

  constructor(webGL) {
    this.gl = webGL.gl;
    this.webGL = webGL;
  }

  render = async() => {

    let gl = this.gl;

    let shaderProg = await ShaderUtil.createProgramFromShaderFiles(this.gl, VertexShaderFile, FragmentShaderFile, true);

    // load the shaders (if not then next step will not work (get attrib Location))
    this.gl.useProgram(shaderProg);

    // get attribute locations (similar to index of array of arrguments), will be used to set their values
    let aPositionLoc = gl.getAttribLocation(shaderProg, "a_position")
    let uPointSizeLoc = gl.getUniformLocation(shaderProg, "uPointSize");

    // not required but good practice
    gl.useProgram(null);

    var verticesArray = new Float32Array([
      ...[...[0, 0, 0], ...[0, -0.5, 0], ...[-0.5, 0, 0]],
      ...[...[0, 0, 0], ...[0, 0.5, 0], ...[0.5, 0, 0]]
    ]);

    let verticesCount = verticesArray.length;

    let verticesBuffer = this.webGL.createArrayBuffer(verticesArray);

    // load the shaders so we can set their values
    gl.useProgram(shaderProg);

    // set the uniform attribute value
    gl.uniform1f(uPointSizeLoc, 50.0);

    // set aPostionLoc attribute value
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    // select/enable the attribute whose values we are setting right now
    gl.enableVertexAttribArray(aPositionLoc);
    // tell how to get the value of attribute from buffer, (attributeLocation, number of values per iteration, value types)
    gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // (type, offset, number of elements in array)
    this.gl.drawArrays(gl.TRIANGLES, 0, verticesCount);
  }

}

export default Try1;