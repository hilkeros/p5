precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture and image coming from p5
uniform sampler2D tex0;
uniform float scrollX;
uniform float scrollY;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;
  uv = uv + vec2(0.5 - scrollX/2000.0, scrollY/2000.0);

  vec4 body = texture2D(tex0, uv/2.0);

  // output the image
  gl_FragColor = body;
}