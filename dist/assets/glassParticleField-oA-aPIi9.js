import{W,S as D,O as j,a as L,V as x,P as A,M as F,b as O,R as E,L as I,c as X,G as q,d as J,I as K,T as Q,C as P,e as S}from"./index-C4LnwLHc.js";import"./index-DCyYze6T.js";const _=34,Y="void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }",Z=`precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;

vec3 bloom(vec2 uv, vec2 centre, float radius, vec3 tint){
  float aspect = uRes.x / max(uRes.y, 1.0);
  float d = length((uv - centre) * vec2(aspect, 1.0));
  float falloff = smoothstep(radius, 0.0, d);
  return tint * falloff * falloff;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float t = uTime * 0.17;
  /* the base tone matters more than the blooms: refraction samples the whole
     frame, so a backdrop with black regions makes beads read as dark holes */
  vec3 col = vec3(0.085, 0.095, 0.125);
  col += mix(vec3(0.0), vec3(0.05, 0.06, 0.10), uv.y);
  col += bloom(uv, vec2(0.23 + 0.055 * sin(t * 0.9), 0.76 + 0.045 * cos(t * 0.7)), 0.86, vec3(0.24, 0.42, 0.96)) * 0.92;
  col += bloom(uv, vec2(0.82 + 0.05 * cos(t * 0.8), 0.34 + 0.055 * sin(t * 1.1)), 0.80, vec3(0.66, 0.30, 0.88)) * 0.80;
  col += bloom(uv, vec2(0.50 + 0.07 * sin(t * 0.6 + 1.7), 0.10 + 0.04 * cos(t * 0.9)), 0.74, vec3(0.14, 0.68, 0.70)) * 0.60;
  col += bloom(uv, vec2(0.10 + 0.04 * cos(t * 1.2), 0.16 + 0.05 * sin(t * 0.8)), 0.58, vec3(0.98, 0.60, 0.40)) * 0.34;
  col += bloom(uv, vec2(0.5 + uPointer.x * 0.20, 0.56 + uPointer.y * 0.16), 0.46, vec3(0.74, 0.78, 0.96)) * 0.30;
  float vignette = smoothstep(1.34, 0.30, length((uv - 0.5) * vec2(1.05, 1.0)));
  col *= mix(0.62, 1.0, vignette);
  gl_FragColor = vec4(col, 1.0);
}`,$=`varying vec3 vNormalView;
varying vec3 vViewPos;
varying vec4 vScreen;

void main(){
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vNormalView = normalize(normalMatrix * normal);
  vViewPos = mvPosition.xyz;
  vScreen = projectionMatrix * mvPosition;
  gl_Position = vScreen;
}`,ee=`precision highp float;
uniform sampler2D uBackdrop;
uniform float uThickness;
uniform float uDispersion;
uniform float uSpecular;
uniform float uRim;
uniform vec3 uTint;
uniform vec3 uLight;
varying vec3 vNormalView;
varying vec3 vViewPos;
varying vec4 vScreen;

void main(){
  vec2 screenUV = (vScreen.xy / vScreen.w) * 0.5 + 0.5;
  vec3 N = normalize(vNormalView);
  vec3 V = normalize(-vViewPos);
  vec3 I = -V;
  float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.4);

  vec2 offsetR = refract(I, N, 1.0 / (1.44 - uDispersion)).xy * uThickness;
  vec2 offsetG = refract(I, N, 1.0 / 1.44).xy * uThickness;
  vec2 offsetB = refract(I, N, 1.0 / (1.44 + uDispersion)).xy * uThickness;

  vec3 col;
  col.r = texture2D(uBackdrop, clamp(screenUV + offsetR, 0.002, 0.998)).r;
  col.g = texture2D(uBackdrop, clamp(screenUV + offsetG, 0.002, 0.998)).g;
  col.b = texture2D(uBackdrop, clamp(screenUV + offsetB, 0.002, 0.998)).b;
  col *= uTint;

  vec3 L = normalize(uLight);
  vec3 H = normalize(L + V);
  float ndoth = max(dot(N, H), 0.0);
  col += pow(ndoth, 150.0) * uSpecular;
  col += pow(ndoth, 16.0) * uSpecular * 0.11;
  /* a second, dimmer key from below keeps the underside of every bead alive */
  vec3 H2 = normalize(normalize(vec3(0.55, -0.7, 0.45)) + V);
  col += pow(max(dot(N, H2), 0.0), 44.0) * uSpecular * 0.22;
  col += fresnel * uRim * vec3(0.86, 0.90, 1.0);

  /* aerial perspective: the small far beads dissolve into the plate they float
     over instead of reading as hard specks */
  float haze = smoothstep(7.4, 11.4, -vViewPos.z);
  col = mix(col, texture2D(uBackdrop, screenUV).rgb, haze * 0.7);
  gl_FragColor = vec4(col, 1.0);
}`;function oe(g){let d=g;return()=>(d=(d*1664525+1013904223)%4294967296,d/4294967296)}function re(g,d){const i=new W({canvas:g,antialias:!0,alpha:!1});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setClearColor(658191,1);const y=new D,V=new j(-1,1,1,-1,0,1),w={uRes:{value:new x(1,1)},uTime:{value:0},uPointer:{value:new x}},R=new L({uniforms:w,vertexShader:Y,fragmentShader:Z,depthTest:!1,depthWrite:!1}),T=new A(2,2);y.add(new F(T,R));const h=new O(2,2,{minFilter:I,magFilter:I,format:E}),k=new D,l=new X(42,1,.1,100);l.position.set(0,0,7.4);const v=new q;k.add(v);const z=[new J(1,44,30),new K(1,1),new Q(.78,.3,22,56)],G=[new P(1.04,1,1.02),new P(.97,1,1.06),new P(1.05,.99,.97)],a=oe(20260826),m=[];for(let t=0;t<_;t+=1){const o=t<8,c=o?.4+a()*.34:.09+a()*.18,s=z[o?t===3?1:t===6?2:0:0],e=new L({uniforms:{uBackdrop:{value:h.texture},uThickness:{value:.1},uDispersion:{value:.05},uSpecular:{value:.85},uRim:{value:.5},uTint:{value:G[t%G.length]},uLight:{value:new S(-.45,.86,.62)}},vertexShader:$,fragmentShader:ee}),r=new F(s,e);r.scale.setScalar(c);const n=new S;for(let B=0;B<48&&(n.set((a()-.5)*8.4,(a()-.5)*5-.25,o?-1.4+a()*2.6:-3.6+a()*2.4),!(!o||m.every(M=>{const U=M.origin.x-n.x,H=M.origin.y-n.y;return Math.hypot(U,H)>(M.radius+c)*1.25+.3})));B+=1);r.position.copy(n),r.rotation.set(a()*6.28,a()*6.28,a()*6.28),v.add(r),m.push({mesh:r,material:e,origin:n,radius:c,bob:.14+a()*.34,phase:a()*6.28,spin:new S((a()-.5)*.28,(a()-.5)*.34,(a()-.5)*.2)})}const u=new x,C=new x;let f=1,p=1,b=0,N=performance.now();return{resize:(t,o)=>{const c=Math.max(1,Math.round(t)),s=Math.max(1,Math.round(o));if(c===f&&s===p)return;f=c,p=s;const e=Math.min(window.devicePixelRatio,2);i.setSize(f,p,!1),h.setSize(Math.round(f*e),Math.round(p*e)),w.uRes.value.set(f*e,p*e),l.aspect=f/p,l.fov=l.aspect>1?42:42/Math.max(.62,l.aspect),l.updateProjectionMatrix();for(const r of m)r.material.uniforms.uBackdrop.value=h.texture},render:(t=performance.now())=>{const o=d();b+=Math.min(96,t-N)*.001,N=t,u.lerp(C,.045);const c=Math.max(4,Math.min(_,Math.round(o.count)));for(let s=0;s<m.length;s+=1){const e=m[s];if(e.mesh.visible=s<c,!e.mesh.visible)continue;const r=e.material.uniforms;r.uThickness.value=o.thickness*(.55+e.radius*.9),r.uDispersion.value=o.dispersion,r.uSpecular.value=o.specular,r.uRim.value=o.rim;const n=b*o.drift;e.mesh.position.set(e.origin.x+Math.sin(n*.21+e.phase)*e.bob*.9,e.origin.y+Math.cos(n*.27+e.phase*1.3)*e.bob,e.origin.z+Math.sin(n*.17+e.phase*.7)*e.bob*.5),e.mesh.rotation.x+=e.spin.x*.0075*o.drift,e.mesh.rotation.y+=e.spin.y*.0075*o.drift,e.mesh.rotation.z+=e.spin.z*.0075*o.drift}v.rotation.y=u.x*.14,v.rotation.x=-u.y*.1,v.position.x=u.x*.28,v.position.y=u.y*.2,w.uTime.value=b,w.uPointer.value.set(u.x,u.y),i.setRenderTarget(h),i.render(y,V),i.setRenderTarget(null),i.render(y,V),i.autoClear=!1,i.render(k,l),i.autoClear=!0},setPointer:(t,o)=>C.set(t,o),dispose:()=>{for(const t of m)t.material.dispose();for(const t of z)t.dispose();T.dispose(),R.dispose(),h.dispose(),i.dispose()}}}export{re as createGlassParticleField};
