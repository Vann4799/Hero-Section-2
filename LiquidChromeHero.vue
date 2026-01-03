<template>
  <div ref="container" class="liquid-chrome-hero">
    <canvas ref="canvas"></canvas>
    <div class="content-overlay">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref(null)
const canvas = ref(null)

let gl = null
let program = null
let animationId = null
let startTime = 0
let mouse = { x: 0.5, y: 0.5 }
let targetMouse = { x: 0.5, y: 0.5 }
let mouseActive = 0
let targetMouseActive = 0

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision highp float;
  
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  
  #define PI 3.14159265359
  
  // =============================================
  // NOISE FUNCTIONS
  // =============================================
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  // =============================================
  // LAYER 1: MACRO DISPLACEMENT GEOMETRY
  // Large smooth folded liquid metal shapes
  // =============================================
  float macroGeometry(vec2 uv, float time) {
    // Very slow viscous flow
    float flow = time * 0.025;
    vec3 p = vec3(uv * 1.2, flow);
    
    // Domain warping for organic thick folds
    float w1 = snoise(p * 0.5 + vec3(0.0, flow * 0.3, 0.0));
    float w2 = snoise(p * 0.35 + vec3(50.0, flow * 0.2, 30.0));
    float w3 = snoise(p * 0.7 + vec3(-40.0, flow * 0.25, 70.0));
    
    // Heavy gravity fold warping
    p.xy += vec2(w1 + w2 * 0.4, w2 + w3 * 0.3) * 0.7;
    
    // Low frequency thick folds - 3 octaves only
    float folds = 0.0;
    folds += snoise(p * 0.6) * 1.5;
    folds += snoise(p * 1.1 + vec3(20.0, flow * 0.1, 10.0)) * 0.7;
    folds += snoise(p * 1.8 + vec3(-30.0, flow * 0.15, -20.0)) * 0.35;
    
    return folds;
  }
  
  // Cursor deformation on geometry
  float cursorBend(vec2 uv, vec2 mouse, float active, float time) {
    vec2 d = uv - mouse;
    float dist = length(d);
    
    // Smooth bulge
    float bulge = exp(-dist * 3.5) * active * 1.2;
    
    // Slow ripple
    float ripple = sin(dist * 12.0 - time * 3.0) * exp(-dist * 2.0) * active * 0.35;
    
    return bulge + ripple;
  }
  
  // =============================================
  // LAYER 2: MICRO SURFACE NORMALS
  // High frequency ripple for chrome shimmer
  // =============================================
  vec3 microNormals(vec2 uv, float time) {
    float flow = time * 0.035;
    
    // Higher frequency shimmer - increased intensity
    float n1 = snoise(vec3(uv * 10.0, flow * 0.5));
    float n2 = snoise(vec3(uv * 15.0 + vec2(5.0, 3.0), flow * 0.45));
    float n3 = snoise(vec3(uv * 22.0 + vec2(-4.0, 7.0), flow * 0.6));
    float n4 = snoise(vec3(uv * 30.0 + vec2(8.0, -5.0), flow * 0.55));
    
    float micro = n1 * 0.4 + n2 * 0.3 + n3 * 0.2 + n4 * 0.1;
    
    // Stronger micro normal perturbation
    float eps = 0.0025;
    float mx = snoise(vec3((uv + vec2(eps, 0.0)) * 12.0, flow * 0.5));
    float my = snoise(vec3((uv + vec2(0.0, eps)) * 12.0, flow * 0.5));
    
    // Increased shimmer strength
    return normalize(vec3((micro - mx) * 0.22, (micro - my) * 0.22, 1.0));
  }
  
  // Combined normal calculation
  vec3 calcNormal(vec2 uv, float time, vec2 mouse, float active) {
    float eps = 0.004;
    
    // Macro geometry normals
    float h0 = macroGeometry(uv, time) + cursorBend(uv, mouse, active, time);
    float hx = macroGeometry(uv + vec2(eps, 0.0), time) + cursorBend(uv + vec2(eps, 0.0), mouse, active, time);
    float hy = macroGeometry(uv + vec2(0.0, eps), time) + cursorBend(uv + vec2(0.0, eps), mouse, active, time);
    
    // Strong macro normal
    float strength = 1.0;
    vec3 macroN = normalize(vec3((h0 - hx) * strength / eps, (h0 - hy) * strength / eps, 1.0));
    
    // Blend with micro shimmer normals
    vec3 microN = microNormals(uv, time);
    
    // Combine: macro dominant, micro adds stronger shimmer
    vec3 N = normalize(macroN + microN * 0.18);
    
    return N;
  }
  
  // =============================================
  // LAYER 3: ENVIRONMENT MIRROR REFLECTION
  // Cold icy HDR studio with elongated strip lights
  // =============================================
  vec3 environmentHDRI(vec3 rd) {
    float y = rd.y;
    float x = rd.x;
    
    // Base: dark navy to ice white gradient
    vec3 env = mix(
      vec3(0.008, 0.015, 0.045),   // Bottom: deep navy
      vec3(0.12, 0.16, 0.24),      // Top: cold blue
      smoothstep(-1.0, 0.8, y)
    );
    
    // ========================================
    // ELONGATED HORIZONTAL STRIP LIGHTS
    // ========================================
    
    // Main bright strip - wide horizontal softbox
    float strip1 = exp(-pow((y - 0.35) * 5.0, 2.0)) * smoothstep(-0.95, 0.0, x) * smoothstep(0.95, 0.0, x);
    env += vec3(0.98, 1.0, 1.0) * strip1 * 2.8;
    
    // Secondary strip - upper
    float strip2 = exp(-pow((y - 0.65) * 6.0, 2.0)) * smoothstep(-0.85, 0.1, x) * smoothstep(0.85, -0.1, x);
    env += vec3(0.9, 0.95, 1.0) * strip2 * 1.8;
    
    // Lower accent strip
    float strip3 = exp(-pow((y + 0.1) * 7.0, 2.0)) * smoothstep(-0.7, 0.2, x) * smoothstep(0.8, 0.0, x);
    env += vec3(0.7, 0.85, 1.0) * strip3 * 1.2;
    
    // Narrow bright highlight strip
    float strip4 = exp(-pow((y - 0.5) * 10.0, 2.0)) * smoothstep(-0.6, 0.3, x) * smoothstep(0.7, 0.1, x);
    env += vec3(1.0, 1.0, 1.0) * strip4 * 2.0;
    
    // Cold blue fill strip
    float fillBox = exp(-pow((y + 0.35) * 5.0, 2.0));
    env += vec3(0.35, 0.5, 0.85) * fillBox * 0.6;
    
    // Ice top accent
    float topBox = exp(-pow((y - 0.88) * 6.0, 2.0));
    env += vec3(0.7, 0.8, 1.0) * topBox * 0.5;
    
    // Side gradient strips
    float leftStrip = exp(-pow((x + 0.8) * 4.0, 2.0)) * smoothstep(-0.3, 0.7, y);
    float rightStrip = exp(-pow((x - 0.82) * 4.5, 2.0)) * smoothstep(-0.2, 0.75, y);
    env += vec3(0.5, 0.65, 0.95) * leftStrip * 0.5;
    env += vec3(0.6, 0.78, 1.0) * rightStrip * 0.6;
    
    // Ice white spot highlights
    float spot1 = exp(-pow(length(rd.xy - vec2(0.0, 0.45)) * 6.0, 2.0));
    float spot2 = exp(-pow(length(rd.xy - vec2(-0.3, 0.55)) * 7.0, 2.0));
    env += vec3(1.0, 1.0, 1.0) * spot1 * 1.5;
    env += vec3(0.85, 0.92, 1.0) * spot2 * 1.0;
    
    return env;
  }
  
  // =============================================
  // PBR METALLIC SHADING
  // =============================================
  
  // GGX Distribution
  float D_GGX(float NdotH, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float denom = NdotH * NdotH * (a2 - 1.0) + 1.0;
    return a2 / (PI * denom * denom);
  }
  
  // Fresnel Schlick
  vec3 F_Schlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
  }
  
  // Smith GGX Geometry
  float G_Smith(float NdotV, float NdotL, float roughness) {
    float r = roughness + 1.0;
    float k = (r * r) / 8.0;
    float gV = NdotV / (NdotV * (1.0 - k) + k);
    float gL = NdotL / (NdotL * (1.0 - k) + k);
    return gV * gL;
  }
  
  // PBR Specular BRDF
  vec3 pbrSpecular(vec3 N, vec3 V, vec3 L, vec3 lightColor, float roughness, vec3 F0) {
    vec3 H = normalize(V + L);
    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.001);
    float NdotH = max(dot(N, H), 0.0);
    float VdotH = max(dot(V, H), 0.0);
    
    float D = D_GGX(NdotH, roughness);
    vec3 F = F_Schlick(VdotH, F0);
    float G = G_Smith(NdotV, NdotL, roughness);
    
    vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
    return spec * lightColor * NdotL;
  }
  
  // Anisotropic GGX for elongated strip highlights
  float D_GGX_Aniso(float NdotH, float TdotH, float BdotH, float roughX, float roughY) {
    float ax = roughX * roughX;
    float ay = roughY * roughY;
    float denom = TdotH * TdotH / (ax * ax) + BdotH * BdotH / (ay * ay) + NdotH * NdotH;
    return 1.0 / (PI * ax * ay * denom * denom);
  }
  
  // Anisotropic specular for strip lights
  vec3 anisoSpecular(vec3 N, vec3 V, vec3 L, vec3 T, vec3 B, vec3 lightColor, float roughX, float roughY, vec3 F0) {
    vec3 H = normalize(V + L);
    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.001);
    float NdotH = max(dot(N, H), 0.0);
    float TdotH = dot(T, H);
    float BdotH = dot(B, H);
    float VdotH = max(dot(V, H), 0.0);
    
    float D = D_GGX_Aniso(NdotH, TdotH, BdotH, roughX, roughY);
    vec3 F = F_Schlick(VdotH, F0);
    float G = G_Smith(NdotV, NdotL, (roughX + roughY) * 0.5);
    
    vec3 spec = (D * F * G) / (4.0 * NdotV * NdotL + 0.001);
    return spec * lightColor * NdotL;
  }
  
  // =============================================
  // MAIN RENDER
  // =============================================
  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    
    // Aspect corrected coordinates
    vec2 uvA = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) + 0.5;
    vec2 mouseA = vec2((uMouse.x - 0.5) * aspect, uMouse.y - 0.5) + 0.5;
    
    float time = uTime;
    
    // PBR parameters - tighter roughness for sharper highlights
    float metalness = 1.0;
    float roughness = 0.035;
    
    // Cold chrome F0 (icy blue-silver reflectivity)
    vec3 F0 = vec3(0.92, 0.95, 0.98);
    
    // LAYER 1: Macro geometry height
    float height = macroGeometry(uvA, time);
    height += cursorBend(uvA, mouseA, uMouseActive, time);
    
    // LAYER 2: Surface normal (macro + micro shimmer)
    vec3 N = calcNormal(uvA, time, mouseA, uMouseActive);
    
    // View direction
    vec3 V = normalize(vec3(0.0, 0.0, 1.0));
    
    // LAYER 3: Environment reflection
    vec3 R = reflect(-V, N);
    vec3 envColor = environmentHDRI(R);
    
    // Fresnel-based reflection intensity
    float NdotV = max(dot(N, V), 0.0);
    vec3 fresnel = F_Schlick(NdotV, F0);
    vec3 reflection = envColor * fresnel;
    
    // ========================================
    // ENHANCED STUDIO LIGHTING SYSTEM
    // ========================================
    vec3 specTotal = vec3(0.0);
    
    // Tangent and bitangent for anisotropic highlights
    vec3 T = normalize(cross(N, vec3(0.0, 1.0, 0.0)));
    vec3 B = normalize(cross(N, T));
    
    // ========================================
    // PRIMARY DIRECTIONAL LIGHT - Upper Left (soft but strong)
    // ========================================
    vec3 keyLight = normalize(vec3(-0.6, 0.85, 0.45));
    specTotal += pbrSpecular(N, V, keyLight, vec3(1.0, 1.0, 1.0) * 6.5, roughness * 0.8, F0);
    
    // Key light shadow factor for directional occlusion
    float keyNdotL = max(dot(N, keyLight), 0.0);
    float keyShadow = smoothstep(0.0, 0.5, keyNdotL);
    
    // Secondary key - slightly offset
    vec3 L1 = normalize(vec3(0.3, 0.9, 0.35));
    specTotal += pbrSpecular(N, V, L1, vec3(0.95, 0.98, 1.0) * 3.5, roughness, F0);
    
    // Fill light - cold blue (reduced for contrast)
    vec3 L2 = normalize(vec3(-0.7, 0.4, 0.6));
    specTotal += pbrSpecular(N, V, L2, vec3(0.5, 0.7, 1.0) * 1.5, roughness * 1.2, F0);
    
    // ========================================
    // SECONDARY RIM LIGHT - Lower Right
    // ========================================
    vec3 rimLightLR = normalize(vec3(0.75, -0.5, 0.45));
    specTotal += pbrSpecular(N, V, rimLightLR, vec3(0.85, 0.92, 1.0) * 3.5, roughness * 0.7, F0);
    
    // Primary rim light - cold glow (upper)
    vec3 L3 = normalize(vec3(0.0, -0.3, 0.95));
    specTotal += pbrSpecular(N, V, L3, vec3(0.5, 0.65, 0.95) * 1.5, roughness, F0);
    
    // Accent light - ice
    vec3 L4 = normalize(vec3(-0.2, 0.95, 0.25));
    specTotal += pbrSpecular(N, V, L4, vec3(0.9, 0.95, 1.0) * 2.8, roughness, F0);
    
    // ========================================
    // ANISOTROPIC STRIP LIGHTS - elongated horizontal
    // ========================================
    float anisoRoughX = 0.02;
    float anisoRoughY = 0.15;
    
    vec3 SL1 = normalize(vec3(0.0, 0.85, 0.53));
    specTotal += anisoSpecular(N, V, SL1, T, B, vec3(1.0, 1.0, 1.0) * 5.0, anisoRoughX, anisoRoughY, F0);
    
    vec3 SL2 = normalize(vec3(0.15, 0.7, 0.7));
    specTotal += anisoSpecular(N, V, SL2, T, B, vec3(0.9, 0.95, 1.0) * 3.5, anisoRoughX * 1.2, anisoRoughY * 0.9, F0);
    
    vec3 SL3 = normalize(vec3(-0.1, 0.5, 0.86));
    specTotal += anisoSpecular(N, V, SL3, T, B, vec3(0.85, 0.92, 1.0) * 2.5, anisoRoughX * 1.5, anisoRoughY * 1.1, F0);
    
    // Edge rim strip lights
    vec3 L5 = normalize(vec3(-0.9, 0.1, 0.42));
    specTotal += pbrSpecular(N, V, L5, vec3(0.6, 0.8, 1.0) * 2.0, roughness * 0.8, F0);
    
    vec3 L6 = normalize(vec3(0.92, 0.15, 0.38));
    specTotal += pbrSpecular(N, V, L6, vec3(0.7, 0.85, 1.0) * 1.8, roughness * 0.8, F0);
    
    // ========================================
    // COMBINE WITH REDUCED AMBIENT
    // ========================================
    vec3 color = reflection * 0.65 + specTotal;  // Reduced reflection diffusion
    
    // Apply directional shadow influence
    color *= mix(0.7, 1.0, keyShadow);
    
    // ========================================
    // DEEP CAVITY SHADOWS (concave valleys)
    // ========================================
    float cavity = smoothstep(0.15, -1.2, height);  // Deeper threshold
    vec3 cavityColor = vec3(0.005, 0.01, 0.035);    // Near-black navy
    color = mix(color, cavityColor, cavity * 0.92);  // Stronger mix
    
    // Secondary cavity for mid-depths
    float midCavity = smoothstep(0.4, -0.3, height) * (1.0 - cavity);
    color = mix(color, vec3(0.02, 0.035, 0.08), midCavity * 0.5);
    
    // ========================================
    // BRIGHT CONVEX RIDGES
    // ========================================
    float ridge = smoothstep(0.35, 0.9, height) * smoothstep(1.6, 0.9, height);
    color += vec3(1.0, 1.0, 1.0) * ridge * 0.9;  // Brighter ridges
    
    // Additional ridge sharpness
    float sharpRidge = smoothstep(0.6, 1.0, height);
    color += vec3(0.95, 0.98, 1.0) * sharpRidge * 0.4;
    
    // ========================================
    // ENHANCED FRESNEL EDGE GLOW
    // ========================================
    float rim = pow(1.0 - NdotV, 4.5);
    color += vec3(0.4, 0.6, 0.95) * rim * 0.7;  // Stronger cold blue glow
    
    // Sharp fresnel edge accent
    float sharpRim = pow(1.0 - NdotV, 8.0);
    color += vec3(0.7, 0.85, 1.0) * sharpRim * 0.5;
    
    // ========================================
    // STRIP LIGHT BLOOM
    // ========================================
    vec3 stripBright = max(specTotal - vec3(0.45), vec3(0.0));
    color += stripBright * 0.7;
    
    // ========================================
    // STRONGER VIGNETTE
    // ========================================
    vec2 vUv2 = uv * (1.0 - uv);
    float vig = pow(clamp(vUv2.x * vUv2.y * 20.0, 0.0, 1.0), 0.5);  // Stronger falloff
    color *= vig;
    
    // ========================================
    // HIGH CONTRAST TONE MAPPING
    // ========================================
    color = color / (color + vec3(0.18));  // Tighter compression
    
    // Stronger S-curve contrast
    color = pow(color, vec3(0.72));
    
    // Cold blue-silver color grade
    color.r *= 0.86;
    color.g *= 0.93;
    color.b *= 1.14;
    
    // Gamma correction
    color = pow(color, vec3(1.0 / 2.2));
    
    // Clamp
    color = clamp(color, 0.0, 1.0);
    
    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl, vs, fs) {
  const prg = gl.createProgram()
  gl.attachShader(prg, vs)
  gl.attachShader(prg, fs)
  gl.linkProgram(prg)
  if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(prg))
    return null
  }
  return prg
}

function initWebGL() {
  gl = canvas.value.getContext('webgl', { alpha: false, antialias: true })
  if (!gl) return false
  
  const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  if (!vs || !fs) return false
  
  program = createProgram(gl, vs, fs)
  if (!program) return false
  
  const positions = new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1])
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
  
  const posLoc = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)
  
  return true
}

function resize() {
  if (!canvas.value || !container.value) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  canvas.value.width = w * dpr
  canvas.value.height = h * dpr
  canvas.value.style.width = w + 'px'
  canvas.value.style.height = h + 'px'
  if (gl) gl.viewport(0, 0, canvas.value.width, canvas.value.height)
}

function onMouseMove(e) {
  const rect = canvas.value.getBoundingClientRect()
  targetMouse.x = (e.clientX - rect.left) / rect.width
  targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height
  targetMouseActive = 1.0
}

function onMouseLeave() {
  targetMouseActive = 0.0
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    const t = e.touches[0]
    const rect = canvas.value.getBoundingClientRect()
    targetMouse.x = (t.clientX - rect.left) / rect.width
    targetMouse.y = 1.0 - (t.clientY - rect.top) / rect.height
    targetMouseActive = 1.0
  }
}

function onTouchEnd() {
  targetMouseActive = 0.0
}

function render(ts) {
  if (!gl || !program) { animationId = requestAnimationFrame(render); return }
  
  const time = (ts - startTime) / 1000
  
  // Smooth cursor follow
  mouse.x += (targetMouse.x - mouse.x) * 0.04
  mouse.y += (targetMouse.y - mouse.y) * 0.04
  mouseActive += (targetMouseActive - mouseActive) * 0.025
  
  gl.useProgram(program)
  gl.uniform1f(gl.getUniformLocation(program, 'uTime'), time)
  gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), canvas.value.width, canvas.value.height)
  gl.uniform2f(gl.getUniformLocation(program, 'uMouse'), mouse.x, mouse.y)
  gl.uniform1f(gl.getUniformLocation(program, 'uMouseActive'), mouseActive)
  
  gl.drawArrays(gl.TRIANGLES, 0, 6)
  animationId = requestAnimationFrame(render)
}

onMounted(() => {
  if (initWebGL()) {
    resize()
    startTime = performance.now()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    animationId = requestAnimationFrame(render)
  }
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
  if (gl && program) gl.deleteProgram(program)
})
</script>

<style scoped>
.liquid-chrome-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: #000408;
}
.liquid-chrome-hero canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.content-overlay {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.content-overlay > * {
  pointer-events: auto;
}
</style>
