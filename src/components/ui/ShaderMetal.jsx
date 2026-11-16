import { useEffect, useRef } from "react";

const VERTEX = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.,1.);}`;
const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution,u_mouse;
uniform float u_time,u_pull;
uniform vec3 u_metal;
#define TAU 6.28318530718
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
float grain(float x,float seed){float i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(hash(vec2(i,seed)),hash(vec2(i+1.,seed)),f);}
float spine(float x,float seed,float lane,float t,vec2 mouse){
  float y=lane+.13*sin(1.15*x+.55*t+2.1*seed)+.06*sin(2.6*x-.8*t+1.3*seed+.7)+.025*sin(5.3*x+1.3*t+4.*seed);
  float near=exp(-(x-mouse.x)*(x-mouse.x)*5.);
  return y+(mouse.y-y)*.22*u_pull*near;
}
vec3 studio(vec3 r,float t){
  r.xz=rot(.28*sin(t*.11))*r.xz;
  float y=r.y;
  vec3 top=vec3(.018,.02,.018),horizon=vec3(.14,.16,.13),ground=vec3(.003);
  vec3 color=mix(mix(ground*2.4,ground,smoothstep(0.,-.5,y)),mix(horizon,top,smoothstep(0.,.85,y)),smoothstep(-.025,.025,y));
  float box=smoothstep(.6,.45,abs(r.x))*smoothstep(.42,.55,y)*smoothstep(1.,.85,y);
  float stripL=smoothstep(.1,.03,abs(r.x+.78))*smoothstep(-.35,-.1,y)*smoothstep(.8,.5,y);
  float stripR=smoothstep(.08,.02,abs(r.x-.72))*smoothstep(-.3,-.05,y)*smoothstep(.75,.45,y);
  return color+box*2.1+stripL*vec3(.9,1.25,.5)*1.5+stripR*vec3(.65,1.05,.3)*1.3;
}
vec3 tonemap(vec3 x){x=max(x,0.);return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
vec3 toSrgb(vec3 c){c=clamp(c,0.,1.);return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(vec3(.0031308),c));}
void main(){
  vec2 frag=gl_FragCoord.xy;
  float px=1./u_resolution.y;
  vec2 p=rot(-.32)*(frag-.5*u_resolution)*px;
  vec2 mouse=rot(-.32)*(u_mouse-.5)*u_resolution*px;
  float t=u_time;
  vec3 light=normalize(vec3(-.45,.55,.85));
  vec3 color=vec3(0.);float alpha=0.;
  for(int i=0;i<3;i++){
    float k=float(i),f=k/2.,lane=(f-.5)*.38,tk=t*mix(.82,1.,f),x=p.x,e=.004;
    float center=spine(x,k,lane,tk,mouse);
    float slope=(spine(x+e,k,lane,tk,mouse)-spine(x-e,k,lane,tk,mouse))/(2.*e);
    float d=(p.y-center)*inversesqrt(1.+slope*slope);
    float theta=1.5*x+.45*tk+1.7*k+.55*sin(.7*x-.3*tk+k);
    float ct=cos(theta),st=sin(theta);
    float halfWidth=.1*(.82+.22*sin(.9*x+.35*tk+2.3*k));
    float projected=halfWidth*max(abs(ct),.035);
    float v=d/(ct>=0.?projected:-projected);
    float cover=1.-smoothstep(1.-1.2*px/projected,1.+1.2*px/projected,abs(v));
    if(cover<=0.)continue;
    vec3 tangent=normalize(vec3(1.,slope,0.));
    vec3 normal2=normalize(vec3(-slope,1.,0.));
    vec3 across=ct*normal2+st*vec3(0.,0.,1.);
    vec3 normal=-st*normal2+ct*vec3(0.,0.,1.);
    float brush=grain(v*34.+k*17.,k)-.5;
    normal=normalize(normal+across*(v*.45+v*v*v*.5+brush*.015)+tangent*sin(x*13.-tk*2.2+k*3.1)*.06);
    if(normal.z<0.)normal*=-1.;
    vec3 reflection=reflect(vec3(0.,0.,-1.),normal);
    float facing=clamp(normal.z,0.,1.);
    vec3 fresnel=u_metal+(1.-u_metal)*pow(1.-facing,5.);
    float film=.5+.5*sin(x*1.6+v*.9+tk*.35+k*1.9);
    vec3 rainbow=.2+.8*(.5+.5*cos(TAU*(film*1.6+facing*1.1+vec3(0.,.33,.67))));
    fresnel*=mix(vec3(1.),rainbow,.12*(.45+.55*(1.-facing)));
    float spec=max(dot(reflection,light),0.);
    vec3 lit=studio(reflection,t)*fresnel+(pow(spec,90.)*5.+pow(spec,14.)*.55)*fresnel;
    vec3 rgb=toSrgb(tonemap(lit*1.05))*(.94+brush*.12);
    color=color*(1.-cover)+rgb*cover;alpha=alpha*(1.-cover)+cover;
  }
  float dither=(hash(frag+fract(t)*91.)-.5)/255.;
  gl_FragColor=vec4(clamp(color+dither*alpha,0.,1.),clamp(alpha+dither*step(.0005,alpha),0.,1.));
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function linearColor(hex) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [16, 8, 0]
    .map((shift) => ((value >> shift) & 255) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
}

export function ShaderMetal({
  color = "#a4ec22",
  speed = 0.24,
  interactive = true,
  className = "",
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      canvas.dataset.webglUnavailable = "true";
      return undefined;
    }
    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) {
      canvas.dataset.webglUnavailable = "true";
      return undefined;
    }
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.webglUnavailable = "true";
      return undefined;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "u_resolution"),
      time = gl.getUniformLocation(program, "u_time"),
      mouseUniform = gl.getUniformLocation(program, "u_mouse"),
      pullUniform = gl.getUniformLocation(program, "u_pull");
    gl.uniform3fv(
      gl.getUniformLocation(program, "u_metal"),
      linearColor(color),
    );
    const mouse = { x: 0.5, y: 0.5 },
      target = { x: 0.5, y: 0.5 };
    let pull = 0,
      pullTarget = 0,
      frame = 0,
      inView = true,
      last = performance.now(),
      clock = 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        1.6,
        Math.sqrt(
          2400000 / Math.max(1, parent.clientWidth * parent.clientHeight),
        ),
      );
      const width = Math.max(1, Math.floor(parent.clientWidth * ratio)),
        height = Math.max(1, Math.floor(parent.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const onMove = (event) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width,
        y = 1 - (event.clientY - rect.top) / rect.height,
        inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pullTarget = inside ? 1 : 0;
      if (inside) {
        target.x = x;
        target.y = y;
      }
    };
    const render = (now) => {
      frame = 0;
      if (!inView) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced) clock += dt;
      const ease = 1 - Math.exp(-dt * 4);
      mouse.x += (target.x - mouse.x) * ease;
      mouse.y += (target.y - mouse.y) * ease;
      pull += (pullTarget - pull) * ease;
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, clock * speed * 3 + 11);
      gl.uniform2f(mouseUniform, mouse.x, mouse.y);
      gl.uniform1f(pullUniform, pull);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) frame = requestAnimationFrame(render);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView && !frame) frame = requestAnimationFrame(render);
    });
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    resize();
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [color, speed, interactive]);
  return (
    <div className={`shader-metal ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
