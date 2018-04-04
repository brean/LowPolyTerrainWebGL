let gl;
let canvas;

let vertexShader;
let fragmentShader;
var loaded = [];
let vertexSizeBytes = 12 + 4 + 4; // positon + normal + color

function render() {
  window.requestAnimationFrame(render, canvas);
  // sky blue background
  gl.clearColor(.6, .8, 1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function loadFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.log(xhr);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function vertexShaderReady(data) {
  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, data);
  gl.compileShader(vertexShader);
  loaded.push("VERTEX_SHADER");
  console.log("Vertex shader loaded");
  initDone();
}

function fragmentShaderReady(data) {
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, data);
  gl.compileShader(fragmentShader);
  loaded.push("FRAGMENT_SHADER");
  console.log("Fragment shader loaded");
  initDone();
}

function initShader() {
  let vertexShaderScript = document.getElementById("VERTEX_SHADER");
  loadFile(vertexShaderScript.src, vertexShaderReady);

  let fragmentShaderScript = document.getElementById("FRAGMENT_SHADER");
  loadFile(fragmentShaderScript.src, fragmentShaderReady);
}

/**
 * check if all shader are loaded we can start rendering
 */
function initDone() {
  if (loaded.indexOf("VERTEX_SHADER") == -1 ||
      loaded.indexOf("FRAGMENT_SHADER") == -1)  {
    return;
  }
  console.log("All shader loaded");

  // todo: use a class instead
  let config = window.config;
  config.terrain_colors.forEach(function (item, index) {
    config.terrain_colors[index] = Color.convert(item);
  });

  canvas.width  = 800;
  canvas.height = 600;

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  render();
}

/**
 * we start loading the shader, when all are loaded we start rendering
 * (see initDone)
 */
function init() {
  canvas = document.getElementById("glscreen");
  gl = canvas.getContext("experimental-webgl");

  let configFile = document.getElementById("CONFIG");
  loadFile(configFile.src, function(config) {
    // TODO: object oriented - use class
    window.config = JSON.parse(config);
    initShader();
  });
}

window.onload = init;
