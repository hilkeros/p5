precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture and image coming from p5
uniform sampler2D tex0;
uniform float scrollX;
uniform float scrollY;
uniform float time;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;
  uv = uv + vec2(0.5 - scrollX/5000.0, scrollY/5000.0);

  float sineWave = sin(uv.y * 2.0 + time/10.0) * 0.02;
  vec2 distort = vec2(sineWave, 0.0);

  vec4 body = texture2D(tex0, uv/2.0 + distort);

  // output the image
  gl_FragColor = body;
}