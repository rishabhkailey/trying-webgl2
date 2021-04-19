#version 300 es
in vec3 a_position;		
uniform float uAngle;

void main(void){
  // gl_Position = vec4(a_position, 1.0);
  // holds the position to be drawn (vec4 type)
  vec2 u_rotation = vec2(cos(uAngle), sin(uAngle));
  gl_Position = vec4(
    (a_position.y * u_rotation.y - a_position.x * u_rotation.x) * -1.0, 
    (a_position.x * u_rotation.y + a_position.y * u_rotation.x), 
    a_position.z, 
    1.0
  );
}