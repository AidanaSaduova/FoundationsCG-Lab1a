//define on top of the file to atually call the methods from matrix lib
// const {vex4, mat4} = glMatrix;
var canvas;
var gl;
var colors=[];

window.onload = function init(){
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if(!gl){alert("WebGL is not available right now")}   

    // create projection matrix
    const orthoProjection = mat4.create();
    const aspectRatio = canvas.width/canvas.height;
    mat4.ortho(orthoProjection, -aspectRatio, aspectRatio, -1, 1, -1,100);



    //(x,y,width, height)
    gl.viewPort(0,0,canvas.width,canvas.height);
    //r,g,b,Alpha(1 for opaque)
    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.enable(gl.DEPTH_TEST);

    //Initiate Shaders and buffers 
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors.flat()), gl.STATIC_DRAW);

    //Note: this vColor is a variable from shader code in html! 
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4,gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(vPosition);

    var thetaLoc = gl.getUniformLocation(program,"theta");

    //place the projection into location
    const projectionLoc = gl.getUniformLocation(program, "projection");
    gl.uniformMatrix4fv(projectionLoc, false, orthoProjection);

    // define your figures here plz
    //and try to use rotation



    //I m not allowed to ude the method flatten in 
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    // but i can use like points.flat() which does the same
    //wrap the points into float Float32Array(points.flat())

    // also if i'll use the rotate() method from gl-matrix-min 
    //I dont have to define the matrices in html with those cos and sin 
    //as i understood

    //to use the matrix library we could also replace the vertices for quad() method
    //as a normatl arrays

    /**
     *  var vertices = [
        [-0.5, -0.5,  0.5, 1.0],
        [ -0.5,  0.5,  0.5, 1.0 ],
        [ 0.5,  0.5,  0.5, 1.0 ],
        [  0.5, -0.5,  0.5, 1.0 ],
        [ -0.5, -0.5, -0.5, 1.0 ],
        [ -0.5,  0.5, -0.5, 1.0 ],
        [  0.5,  0.5, -0.5, 1.0 ],
        [  0.5, -0.5, -0.5, 1.0 ]
    ];
     */

}