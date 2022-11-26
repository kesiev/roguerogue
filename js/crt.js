// Adapted from: https://github.com/malec-palec/death-game

let accumulateFragmentShader=`precision mediump float;
varying vec2 uv;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform float modulate;
void main() {
  vec4 a = texture2D(tex0, uv) * vec4(modulate);
  vec4 b = texture2D(tex1, uv);
  gl_FragColor = max(a, b * 0.96);
}`; // "./shaders/accumulate.frag";
let blendFragmentShader=`precision mediump float;
varying vec2 uv;
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform float modulate;
void main() {
  vec4 a = texture2D(tex0, uv) * vec4(modulate);
  vec4 b = texture2D(tex1, uv);
  gl_FragColor = max(a, b * 0.32);
}`; // "./shaders/blend.frag";
let blurFragmentShader=`precision mediump float;
varying vec2 uv;
uniform vec2 blur;
uniform sampler2D texture;
void main() {
  vec4 sum=texture2D(texture,uv)*0.2270270270;
  sum+=texture2D(texture,vec2(uv.x-4.0*blur.x,uv.y-4.0*blur.y))*0.0162162162;
  sum+=texture2D(texture,vec2(uv.x-3.0*blur.x,uv.y-3.0*blur.y))*0.0540540541;
  sum+=texture2D(texture,vec2(uv.x-2.0*blur.x,uv.y-2.0*blur.y))*0.1216216216;
  sum+=texture2D(texture,vec2(uv.x-1.0*blur.x,uv.y-1.0*blur.y))*0.1945945946;
  sum+=texture2D(texture,vec2(uv.x+1.0*blur.x,uv.y+1.0*blur.y))*0.1945945946;
  sum+=texture2D(texture,vec2(uv.x+2.0*blur.x,uv.y+2.0*blur.y))*0.1216216216;
  sum+=texture2D(texture,vec2(uv.x+3.0*blur.x,uv.y+3.0*blur.y))*0.0540540541;
  sum+=texture2D(texture,vec2(uv.x+4.0*blur.x,uv.y+4.0*blur.y))*0.0162162162;
  gl_FragColor=sum;
}`; // "./shaders/blur.frag";
let commonVertexShader=`attribute vec4 pos;
varying vec2 uv;
void main() {
  gl_Position = vec4(pos.xy, 0, 1);
  uv = pos.zw;
}`; // "./shaders/common.vert";
let copyFragmentShader=`precision mediump float;
varying vec2 uv;
uniform sampler2D tex0;
void main() {
  gl_FragColor = texture2D(tex0, uv);
}`; // "./shaders/copy.frag";
let crtFragmentShader=`precision mediump float;
varying vec2 uv;
uniform vec2 resolution;
uniform float time;
uniform sampler2D backbuffer;
uniform sampler2D blurbuffer;
vec3 tsample(sampler2D samp, vec2 tc) {
  vec3 s=pow(abs(texture2D(samp,vec2(tc.x,1.0-tc.y)).rgb),vec3(2.2));
  return s*vec3(1.25);
}
vec3 filmic(vec3 lcol) {
  vec3 x=max(vec3(0),lcol-vec3(0.004));
  return (x*(6.2*x+0.5))/(x*(6.2*x+1.7)+0.06);
}
vec2 curve(vec2 uv) {
  uv=(uv-0.5)*2.0;
  uv*=vec2(1.049,1.042);
  uv-=vec2(-0.008,0.008);
  uv.x*=1.0+pow(abs(uv.y)/5.0,2.0);
  uv.y*=1.0+pow(abs(uv.x)/4.0,2.0);
  uv=uv*0.5+0.5;
  return uv;
}
highp float rand(vec2 co) {
  /* iPad needs highp to avoid artifacts */
  highp float a = 12.9898;
  highp float b = 78.233;
  highp float c = 43758.5453;
  highp float dt = dot(co.xy,vec2(a,b));
  highp float sn = mod(dt,3.14);
  return fract(sin(sn) * c);
}
void main() {
  /* curve */
  vec2 curved_uv=mix(curve(uv),uv,0.4);
  #if 0 /* dead code in original */
    float scale=0.04;
    vec2 scuv=curved_uv*(1.0-scale)+scale*0.5+vec2(0.003,-0.001);
  #else
    vec2 scuv=curved_uv;
  #endif

  /* main color, bleed */
  vec3 col;
  float x=sin(0.1*time+curved_uv.y*13.0)
      *sin(0.23*time+curved_uv.y*19.0)
      *sin(0.3+0.11*time+curved_uv.y*23.0)
      *0.0012;
  float o=sin(gl_FragCoord.y/1.5)/resolution.x;
  x+=o*0.25;
  x*=0.2;
  col.r=tsample(backbuffer,vec2(x+scuv.x+0.0009,scuv.y+0.0009)).x+0.02;
  col.g=tsample(backbuffer,vec2(x+scuv.x+0.0000,scuv.y-0.0011)).y+0.02;
  col.b=tsample(backbuffer,vec2(x+scuv.x-0.0015,scuv.y+0.0000)).z+0.02;

  float i=clamp(col.r*0.299+col.g*0.587+col.b*0.114,0.0,1.0);
  i=pow(1.0-pow(i,2.0),1.0);
  i=(1.0-i)*0.85+0.15;

  /* ghosting */
  float ghs=0.15;
  vec3 r=tsample(blurbuffer, 
    vec2(x-0.014*1.0, -0.027)*0.85
      +0.007*vec2(0.35*sin(1.0/7.0 + 15.0*curved_uv.y + 0.9*time), 0.35*sin(2.0/7.0 + 10.0*curved_uv.y + 1.37*time))
      +vec2(scuv.x+0.001,scuv.y+0.001)
    ).xyz*vec3(0.5,0.25,0.25);
  vec3 g=tsample(blurbuffer, 
    vec2(x-0.019*1.0, -0.020)*0.85
      +0.007*vec2(0.35*cos(1.0/9.0 + 15.0*curved_uv.y + 0.5*time), 0.35*sin(2.0/9.0 + 10.0*curved_uv.y + 1.50*time))
      +vec2(scuv.x+0.000,scuv.y-0.002)
    ).xyz*vec3(0.25,0.5,0.25);
  vec3 b=tsample(blurbuffer, 
    vec2(x-0.017*1.0, -0.003)*0.85
      +0.007*vec2(0.35*sin(2.0/3.0 + 15.0*curved_uv.y + 0.7*time), 0.35*cos(2.0/3.0 + 10.0*curved_uv.y + 1.63*time))
      +vec2(scuv.x-0.002,scuv.y+0.000)
    ).xyz*vec3(0.25,0.25,0.5);

  vec3 ghost=vec3(0.0);
  ghost+=vec3(ghs*(1.0-0.299))*pow(clamp(vec3(3.0)*r,vec3(0.0),vec3(1.0)),vec3(2.0))*vec3(i);
  ghost+=vec3(ghs*(1.0-0.587))*pow(clamp(vec3(3.0)*g,vec3(0.0),vec3(1.0)),vec3(2.0))*vec3(i);
  ghost+=vec3(ghs*(1.0-0.114))*pow(clamp(vec3(3.0)*b,vec3(0.0),vec3(1.0)),vec3(2.0))*vec3(i);
  col+=ghost;

  /* level adjustment (curves) */
  col*=vec3(0.95,1.05,0.95);
  col=clamp(1.3*col+0.75*col*col+1.25*col*col*col*col*col,vec3(0.0),vec3(10.0));

  /* vignette */
  float vig=0.1+16.0*curved_uv.x*curved_uv.y*(1.0-curved_uv.x)*(1.0-curved_uv.y);
  #if 0 /* original */
    vig=1.3*pow(vig,0.5);
  #else /* less dark around edges; better for PICO-8 visibility */
    vig=1.5*pow(vig,0.25);
    vig=(vig>1.0) ? (1.0 + smoothstep(1.0,1.5,vig)*0.2) : vig;
  #endif
  col*=vig;

  /* scanlines */
  float scans=clamp(0.35+0.18*sin(6.0*time+curved_uv.y*resolution.y*1.5),0.0,1.0);
  float s=pow(scans,0.9);
  col*=s;

  /* vertical lines (shadow mask) */
  col*=1.0-0.23*clamp((mod(gl_FragCoord.xy.x,3.0))*0.5,0.0,1.0);
  
  /* tone map */
  col=filmic(col);

  /* noise */
  vec2 seed=curved_uv*resolution.xy;
  vec3 noise=pow(vec3(rand(seed+time),rand(seed+time*2.0),rand(seed+time*3.0)),vec3(1.5));
  col-=0.015*noise;

  /* flicker */
  col*=(1.0-0.004*(sin(50.0*time+curved_uv.y*2.0)*0.5+0.5));

  /* clamp */
  if (curved_uv.x < 0.0 || curved_uv.x > 1.0)
    col*= 0.0;
  if (curved_uv.y < 0.0 || curved_uv.y > 1.0)
    col*= 0.0;

  // brightness+
  col *= vec3(1.1);

  gl_FragColor = vec4(col, 1.0);
}`; // "./shaders/crt.frag";

const initRenderer = (targetCanvas) => {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "display:block;margin:0 auto;height:100%;";
  canvas.width = targetCanvas.clientWidth;
  canvas.height = targetCanvas.clientHeight;

  const gl = canvas.getContext("webgl"),
    GL_FRAMEBUFFER = gl.FRAMEBUFFER,
    glGetUniformLocation = gl.getUniformLocation.bind(gl),
    targetContext = targetCanvas.getContext("2d");

  targetCanvas.parentNode.insertBefore(canvas, targetCanvas);
  targetCanvas.style.position = "absolute";
  targetCanvas.style.left="-10000px";
  targetCanvas.style.top="0";
  targetCanvas.style.opacity = "0";

  const unbind = (...args) => {
      for (let i = 0; i < args.length; ++i) {
        const arg = args[i];
        switch (arg) {
          case GL_FRAMEBUFFER:
            gl.bindFramebuffer(arg, null);
            break;
          case gl.TEXTURE_2D:
            gl.bindTexture(arg, null);
            break;
          case gl.ARRAY_BUFFER:
            gl.bindBuffer(arg, null);
            break;
          default:
            gl.activeTexture(arg);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
      }
    },
    compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        throw "could not compile shader:" + info;
      }
      return shader;
    },
    vs = compileShader(commonVertexShader, gl.VERTEX_SHADER),
    fs_crt = compileShader(crtFragmentShader, gl.FRAGMENT_SHADER),
    fs_blur = compileShader(blurFragmentShader, gl.FRAGMENT_SHADER),
    fs_accumulate = compileShader(accumulateFragmentShader, gl.FRAGMENT_SHADER),
    fs_blend = compileShader(blendFragmentShader, gl.FRAGMENT_SHADER),
    fs_copy = compileShader(copyFragmentShader, gl.FRAGMENT_SHADER),
    createProgram = (vs, fs, name) => {
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);
        throw "shader " + name + " failed to link:" + info;
      }
      return program;
    };

  const crt_program = createProgram(vs, fs_crt, "crt_program"),
    loc_crt_pos = gl.getAttribLocation(crt_program, "pos"),
    loc_crt_time = glGetUniformLocation(crt_program, "time"),
    loc_crt_backbuffer = glGetUniformLocation(crt_program, "backbuffer"),
    loc_crt_blurbuffer = glGetUniformLocation(crt_program, "blurbuffer"),
    loc_crt_resolution = glGetUniformLocation(crt_program, "resolution"),
    blur_program = createProgram(vs, fs_blur, "blur_program"),
    loc_blur_pos = gl.getAttribLocation(blur_program, "pos"),
    loc_blur_blur = glGetUniformLocation(blur_program, "blur"),
    loc_blur_texture = glGetUniformLocation(blur_program, "texture"),
    accumulate_program = createProgram(vs, fs_accumulate, "accumulate_program"),
    loc_accumulate_pos = gl.getAttribLocation(accumulate_program, "pos"),
    loc_accumulate_tex0 = glGetUniformLocation(accumulate_program, "tex0"),
    loc_accumulate_tex1 = glGetUniformLocation(accumulate_program, "tex1"),
    loc_accumulate_modulate = glGetUniformLocation(accumulate_program, "modulate"),
    blend_program = createProgram(vs, fs_blend, "blend_program"),
    loc_blend_pos = gl.getAttribLocation(blend_program, "pos"),
    loc_blend_tex0 = glGetUniformLocation(blend_program, "tex0"),
    loc_blend_tex1 = glGetUniformLocation(blend_program, "tex1"),
    loc_blend_modulate = glGetUniformLocation(blend_program, "modulate"),
    copy_program = createProgram(vs, fs_copy, "copy_program"),
    loc_copy_pos = gl.getAttribLocation(copy_program, "pos"),
    loc_copy_tex0 = glGetUniformLocation(copy_program, "tex0"),
    posBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
    gl.STATIC_DRAW
  );
  unbind(gl.ARRAY_BUFFER);

  const bindVertexBuffer = (loc_pos) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.vertexAttribPointer(loc_pos, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(loc_pos);
    },
    tex_backbuffer = gl.createTexture();

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex_backbuffer);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  unbind(gl.TEXTURE_2D);

  const texFbos = [];
  for (let i = 0; i < 4; ++i) {
    const tex = gl.createTexture(),
      fbo = gl.createFramebuffer();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    unbind(gl.TEXTURE_2D);
    texFbos.push({ tex, fbo});
  }
  const blur_buf = texFbos[0],
    blur_tmp = texFbos[1],
    accum_buf = texFbos[2],
    accum_cpy = texFbos[3],
    drawBlurAxis = (srcTex, dstBuf, blurX, blurY) => {
      gl.bindFramebuffer(GL_FRAMEBUFFER, dstBuf);
      gl.useProgram(blur_program);
      bindVertexBuffer(loc_blur_pos);
      gl.uniform2f(loc_blur_blur, blurX, blurY);
      gl.uniform1i(loc_blur_texture, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, srcTex);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      unbind(gl.TEXTURE_2D, gl.ARRAY_BUFFER, GL_FRAMEBUFFER);
    },
    drawBlur = (srcTex, dstBuf, tmp, r, w, h) => {
      drawBlurAxis(srcTex, tmp.fbo, r / w, 0);
      drawBlurAxis(tmp.tex, dstBuf, 0, r / h);
    },
    drawCopy = (srcTex, dstBuf) => {
      gl.bindFramebuffer(GL_FRAMEBUFFER, dstBuf);
      gl.useProgram(copy_program);
      bindVertexBuffer(loc_copy_pos);
      gl.uniform1i(loc_copy_tex0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, srcTex);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      unbind(gl.TEXTURE_2D, gl.ARRAY_BUFFER, GL_FRAMEBUFFER);
    };

  let lastDw = -1,
    lastDh = -1;

  return (now) => {
    /* hack fix for Safari: texImage2D fails to copy targetCanvas to tex_backbuffer */
    targetContext.resetTransform();
    targetContext.clearRect(-1, -1, 1, 1);

    let targetScale = Math.ceil(
      Math.max(targetCanvas.clientWidth / targetCanvas.width, targetCanvas.clientHeight / targetCanvas.height)
    );
    targetScale = Math.max(1, Math.min(4, targetScale));

    const dw = targetCanvas.width * targetScale,
      dh = targetCanvas.height * targetScale,
      time = now * 0.001;

    if (lastDw != dw || lastDh != dh) {
      for (let i = 0; i < texFbos.length; ++i) {
        const texture = texFbos[i].tex,
          framebuffer = texFbos[i].fbo;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, dw, dh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(GL_FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(GL_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        unbind(gl.TEXTURE_2D, GL_FRAMEBUFFER);
      }
    }

    /* blit targe screen to backbuffer; backbuffer = texImage2D(targetCanvas) */
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex_backbuffer);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, targetCanvas);
    unbind(gl.TEXTURE_2D);

    gl.viewport(0, 0, dw, dh);

    /* blur previous accumulation buffer; blur_buf = blur(accum_cpy) */
    drawBlur(accum_cpy.tex, blur_buf.fbo, blur_tmp, 1.0, dw, dh);

    /* update accumulation buffer; accum_buf = accumulate(backbuffer, blur_buf) */
    gl.bindFramebuffer(GL_FRAMEBUFFER, accum_buf.fbo);
    gl.useProgram(accumulate_program);
    bindVertexBuffer(loc_accumulate_pos);
    gl.uniform1i(loc_accumulate_tex0, 0);
    gl.uniform1i(loc_accumulate_tex1, 1);
    gl.uniform1f(loc_accumulate_modulate, 1.0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex_backbuffer);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, blur_buf.tex);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    unbind(gl.TEXTURE0, gl.TEXTURE1, gl.ARRAY_BUFFER, GL_FRAMEBUFFER);

    /* store copy of accumulation buffer; accum_cpy = copy(accum_buf) */
    drawCopy(accum_buf.tex, accum_cpy.fbo);

    /* blend accumulation and backbuffer; accum_buf = blend(backbuffer, accum_cpy) */
    gl.bindFramebuffer(GL_FRAMEBUFFER, accum_buf.fbo);
    gl.useProgram(blend_program);
    bindVertexBuffer(loc_blend_pos);
    gl.uniform1i(loc_blend_tex0, 0);
    gl.uniform1i(loc_blend_tex1, 1);
    gl.uniform1f(loc_blend_modulate, 1.0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex_backbuffer);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, accum_cpy.tex);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    unbind(gl.TEXTURE0, gl.TEXTURE1, gl.ARRAY_BUFFER, GL_FRAMEBUFFER);

    /* add slight blur to backbuffer; accum_buf = blur(accum_buf) */
    drawBlur(accum_buf.tex, accum_buf.fbo, blur_tmp, 0.17, dw, dh);

    /* create fully blurred version of backbuffer; blur_buf = blur(accum_buf) */
    drawBlur(accum_buf.tex, blur_buf.fbo, blur_tmp, 1.0, dw, dh);

    /* ensure crt canvas overlays targetCanvas */
    const cw = (canvas.width = targetCanvas.clientWidth),
      ch = (canvas.height = targetCanvas.clientHeight);
    gl.viewport(0, 0, cw, ch);

    /* apply crt shader; canvas = crt(accum_buf, blur_buf) */
    gl.bindFramebuffer(GL_FRAMEBUFFER, null);
    gl.useProgram(crt_program);
    bindVertexBuffer(loc_crt_pos);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, accum_buf.tex);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, blur_buf.tex);
    gl.uniform2f(loc_crt_resolution, cw, ch);
    gl.uniform1f(loc_crt_time, 1.5 * time);
    gl.uniform1i(loc_crt_backbuffer, 0);
    gl.uniform1i(loc_crt_blurbuffer, 1);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    unbind(gl.TEXTURE0, gl.TEXTURE1, gl.ARRAY_BUFFER, GL_FRAMEBUFFER);

    lastDw = dw;
    lastDh = dh;
  };
};
