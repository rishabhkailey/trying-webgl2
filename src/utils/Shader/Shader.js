class ShaderUtil {

  static async getTextFromFile(file) {
    let loadedFile = await fetch(file);
    return await loadedFile.text();
  }

  static createShader(gl, src, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    //Get Error data if shader failed compiling
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Error compiling shader : " + src, gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  static async createProgramFromShaderFiles(gl, VertexShaderFile, FragmentShaderFile, dovalidate) {
    if (!gl || !VertexShaderFile || !FragmentShaderFile)
      return null;
    // get shaders source in text format
    let vertexShaderSrc = await ShaderUtil.getTextFromFile(VertexShaderFile);
    let fragmentShaderSrc = await ShaderUtil.getTextFromFile(FragmentShaderFile);

    // create shaders
    let vertexShader = ShaderUtil.createShader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
    let fragmentShader = ShaderUtil.createShader(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER);

    // create program using shaders
    let shaderProg = ShaderUtil.createProgram(gl, vertexShader, fragmentShader, true);

    return shaderProg;

  }

  static createProgram(gl, vShader, fShader, doValidate) {
    //Link shaders together
    var prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    //Check if successful
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Error creating shader program.", gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }

    //Only do this for additional debugging.
    if (doValidate) {
      gl.validateProgram(prog);
      if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
        console.error("Error validating program", gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
        return null;
      }
    }

    //Can delete the shaders since the program has been made.
    gl.detachShader(prog, vShader); //TODO, detaching might cause issues on some browsers, Might only need to delete.
    gl.detachShader(prog, fShader);
    gl.deleteShader(fShader);
    gl.deleteShader(vShader);

    return prog;
  }
}

export default ShaderUtil;