function initShaders(gl, vertexShaderName, fragmentShaderName){

    //Init shaders 
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    
    /**
     * Fill up and compile vertex shader
     */
    var vSource = document.getElementById(vertexShaderName);
    gl.shaderSource(vertexShader,vSource.text);
    gl.compileShader(vertexShader);
    //if there were no parameters set, throw an error
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return -1;
    }
    
    /**
     * Fill up and compile fragment shader
     */
    var fSource = document.getElementById(fragmentShaderName);
    gl.shaderSource(fragmentShader, fSource.text);
    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return -1;
    }

    /**
     * Init a program (link and valiadte it)
     */

     var program = gl.createProgram();
     gl.attachShader(program,vertexShader);
     gl.attachShader(program,fragmentShader);
     gl.linkProgram(program);
     if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
        return -1;
    } 

     //validate
     gl.validateProgram(program);
     //check validation
     if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
         console.error('ERROR validating program!', gl.getProgramInfoLog(program));
         return -1;
     }

    return program;

}