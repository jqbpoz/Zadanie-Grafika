console.error("works");
const vertexShaderTxt = `
    precision mediump float;

    attribute vec2 vertPosition;
    attribute vec3 vertColor;

    varying vec3 fragColor;

    void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
    }
`;
const fragmentShaderTxt = `
    precision mediump float;

    varying vec3 fragColor;

    void main() {
        gl_FragColor = vec4(fragColor, 1.0);
    }
`;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let canvasColor = [0.2, 0.5, 0.8];
let figureColor = [0.32, 1, 0.27];

const button = document.querySelector(".button");
const rgb = document.querySelector(".rgb");
button.addEventListener("click", function () {
  let R = getRandomNumber(0, 255);
  let G = getRandomNumber(0, 255);
  let B = getRandomNumber(0, 255);
  rgb.textContent = `Current color : 
  RGB (${R},${G},${B})`;
  figureColor = [R / 255, G / 255, B / 255];
  displayAll();
});

const first = function () {
  const canvas = document.getElementById("first-canvas");
  const gl = canvas.getContext("webgl");

  checkGl(gl);

  gl.clearColor(...canvasColor, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderTxt);
  gl.shaderSource(fragmentShader, fragmentShaderTxt);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  checkShaderCompile(gl, vertexShader);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);

  gl.validateProgram(program);

  let triangleVerts = [
    // X, Y
    -0.8, -0.8, 0.0, -0.8, 0.8, 0, 0.8, -0.8, 0.0, 0.8, 0.8, 0.0, -0.8, 0.8, 0,
    0.8, -0.8, 0.0,
  ];

  let colors = [
    ...figureColor,
    ...figureColor,
    ...figureColor,
    ...figureColor,
    ...figureColor,
    ...figureColor,
  ];

  const triangleVertBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(triangleVerts),
    gl.STATIC_DRAW
  );

  const posAttribLocation = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    posAttribLocation,
    3,
    gl.FLOAT,
    gl.FALSE,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(posAttribLocation);

  const triangleColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
  gl.vertexAttribPointer(
    colorAttribLocation,
    3,
    gl.FLOAT,
    gl.FALSE,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(colorAttribLocation);

  // render time

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

function checkGl(gl) {
  if (!gl) {
    console.log("WebGL not suppoerted, use another browser");
  }
}

function checkShaderCompile(gl, shader) {
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("shader not compiled", gl.getShaderInfoLog(shader));
  }
}

function checkLink(gl, program) {
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("linking error", gl.getProgramInfoLog(program));
  }
}

const displayAll = function () {
  first();
  second();
};

const second = function () {
  {
    const canvas = document.getElementById("second-canvas");
    const gl = canvas.getContext("webgl");

    checkGl(gl);

    gl.clearColor(...canvasColor, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    checkShaderCompile(gl, vertexShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);

    gl.validateProgram(program);

    let triangleVerts = [
      // X, Y
      0.3, 0.8, 0.0, 0.8, 0.3, 0, 0, 0, 0, -0.3, 0.8, 0.0, -0.8, 0.3, 0, 0, 0,
      0.0,

      0.8, -0.3, 0.0, 0.3, -0.8, 0, 0, 0, 0.0, -0.8, -0.3, 0.0, -0.3, -0.8, 0,
      0, 0, 0.0,

      0.3, 0.8, 0.0, -0.3, 0.8, 0, 0, 0, 0,

      -0.8, 0.3, 0.0, -0.8, -0.3, 0, 0, 0, 0.0,

      0.8, 0.3, 0.0, 0.8, -0.3, 0, 0, 0, 0.0,

      0.3, -0.8, 0.0, -0.3, -0.8, 0, 0, 0, 0,
    ];

    let colors = [
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
      ...figureColor,
    ];

    const triangleVertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(triangleVerts),
      gl.STATIC_DRAW
    );

    const posAttribLocation = gl.getAttribLocation(program, "vertPosition");
    gl.vertexAttribPointer(
      posAttribLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(posAttribLocation);

    const triangleColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
      colorAttribLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      3 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(colorAttribLocation);

    // render time

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 24);
  }
};

function checkGl(gl) {
  if (!gl) {
    console.log("WebGL not suppoerted, use another browser");
  }
}

function checkShaderCompile(gl, shader) {
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("shader not compiled", gl.getShaderInfoLog(shader));
  }
}

function checkLink(gl, program) {
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("linking error", gl.getProgramInfoLog(program));
  }
}