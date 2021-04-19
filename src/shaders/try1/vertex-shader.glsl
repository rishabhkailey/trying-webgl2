#version 300 es
in vec3 a_position;		
uniform float uPointSize;

void main(void){
  gl_PointSize = uPointSize;
  // holds the position to be drawn (vec4 type)
  gl_Position = vec4(a_position, 1.0);
}