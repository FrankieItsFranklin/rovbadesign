"use client";

import { useEffect, useRef } from "react";

// DESIGN.md §2. One full-screen fragment shader draws the whole room: a lattice of light on a triangular grid
// (0°, 60°, 120°, the sign's angles) on a floor, a ceiling and planes flying at the camera; or a warm fog with small
// glyphs flying through it. u_fog blends the two zones, u_flash is the soft white-out between them.
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_cam;
uniform float u_fog;
uniform float u_flash;
uniform vec2 u_look;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}
// Distance to the nearest line of each family of a triangular lattice (lattice units).
vec3 tri(vec2 p) {
  float d1 = abs(fract(p.y + 0.5) - 0.5);
  float d2 = abs(fract(dot(p, vec2(0.8660254, 0.5)) + 0.5) - 0.5);
  float d3 = abs(fract(dot(p, vec2(0.8660254, -0.5)) + 0.5) - 0.5);
  return vec3(d1, d2, d3);
}
// Light of the three line families: a thin core and a soft glow; where two lines cross, a brighter knot.
float lattice(vec2 p, float px) {
  vec3 d = tri(p);
  vec3 core = smoothstep(vec3(px * 1.2), vec3(0.0), d) * 0.85;
  vec3 glow = exp(-d / max(px * 7.0, 0.004)) * 0.2;
  vec3 l = core + glow;
  float sum = l.x + l.y + l.z;
  return sum + max(sum - 1.0, 0.0) * 1.2;
}
// Equilateral triangle, signed distance (for the glyphs).
float sdTri(vec2 p, float r) {
  const float k = 1.7320508;
  p.x = abs(p.x) - r;
  p.y = p.y + r / k;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * r, 0.0);
  return -length(p) * sign(p.y);
}

vec3 latticeZone(vec2 uv) {
  vec3 col = vec3(0.862, 0.858, 0.852);
  col = mix(col, vec3(0.985), clamp(0.75 - length(uv - vec2(0.15, 0.1)) * 0.7, 0.0, 1.0));
  float light = 0.0;
  // Floor and ceiling recede to a horizon; their lattice slides toward the camera.
  float h = uv.y < 0.0 ? 1.0 : 1.7;
  float t = h / max(abs(uv.y), 0.004);
  vec2 w = vec2(uv.x * t, t + u_cam) / 1.35;
  float fade = exp(-t * 0.16) * smoothstep(0.004, 0.06, abs(uv.y));
  light += lattice(w, t * 1.6 / u_res.y) * fade * (uv.y < 0.0 ? 0.8 : 0.45);
  // Free-floating lattice planes, each flying from the far distance through the camera.
  for (int i = 0; i < 4; i++) {
    float z = fract(u_cam * 0.12 + float(i) * 0.25);
    float s = mix(7.0, 0.7, z);
    vec2 p = uv * s + vec2(float(i) * 1.7, float(i) * 0.9);
    float a = sin(z * 3.14159);
    light += lattice(p, s * 1.6 / u_res.y) * a * a * 0.24;
  }
  return mix(col, vec3(1.0), clamp(light, 0.0, 1.0));
}

vec3 fogZone(vec2 uv) {
  float v = 0.0;
  float glyph = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float z = fract(u_cam * 0.09 + fi / 3.0);
    float s = mix(3.2, 0.45, z);
    float a = sin(z * 3.14159);
    vec2 p = uv * s + vec2(fi * 7.1, fi * 3.3);
    v += a * fbm(p);
    // Glyphs: a few cells hold a small triangle, a dash or a pair of dots, flying with the layer.
    vec2 g = p * 4.0;
    vec2 id = floor(g);
    vec2 f = fract(g) - 0.5;
    float r = hash(id + fi * 13.0);
    if (r > 0.94) {
      float kind = fract(r * 37.0);
      float d;
      if (kind < 0.4) d = sdTri(f, 0.12);
      else if (kind < 0.75) d = max(abs(f.y) - 0.025, abs(f.x) - 0.26);
      else d = min(length(f - vec2(-0.12, 0.0)), length(f - vec2(0.12, 0.0))) - 0.05;
      float flicker = 0.6 + 0.4 * sin(u_time * (1.0 + r * 3.0) + r * 40.0);
      glyph += smoothstep(0.02, 0.0, d) * a * flicker;
    }
  }
  v /= 1.5;
  vec3 col = mix(vec3(0.835, 0.845, 0.85), vec3(0.97, 0.966, 0.96), smoothstep(0.25, 0.75, v));
  return mix(col, vec3(1.0), clamp(glyph, 0.0, 1.0) * 0.9);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y + u_look * 0.06;
  vec3 col;
  if (u_fog < 0.01) col = latticeZone(uv);
  else if (u_fog > 0.99) col = fogZone(uv);
  else col = mix(latticeZone(uv), fogZone(uv), u_fog);
  col = mix(col, vec3(1.0), u_flash * 0.35);
  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";

/**
 * The flying room behind the page. Starts after the page has loaded and fades in over the static CSS room;
 * caps resolution and frame rate on touch devices, pauses in hidden tabs, draws one still frame for reduced motion.
 * Sections pick their zone with data-zone="lattice" | "fog" (default lattice).
 */
export function SpaceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) return;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("u_res"), uTime = u("u_time"), uCam = u("u_cam"), uFog = u("u_fog"), uFlash = u("u_flash"), uLook = u("u_look");

    const touch = matchMedia("(pointer: coarse)").matches;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scale = Math.min(devicePixelRatio, 1.25) * (touch ? 0.75 : 1);
    const resize = () => {
      canvas.width = Math.round(innerWidth * scale);
      canvas.height = Math.round(innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();

    // Zone of the section crossing the middle of the screen; a change starts the white-out.
    let zone = 0;
    let flashAt = -10;
    const zones = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => zones.set(e.target, e.isIntersecting ? ((e.target as HTMLElement).dataset.zone === "fog" ? 1 : 0) : -1));
        const current = [...zones.values()].find((z) => z >= 0) ?? 0;
        if (current !== zone) {
          zone = current;
          flashAt = performance.now() / 1000;
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-zone]").forEach((el) => io.observe(el));

    let lookX = 0, lookY = 0, aimX = 0, aimY = 0;
    const onMove = (e: PointerEvent) => {
      aimX = e.clientX / innerWidth - 0.5;
      aimY = 0.5 - e.clientY / innerHeight;
    };
    if (!touch && !still) addEventListener("pointermove", onMove, { passive: true });

    let fog = 0, cam = 0, last = performance.now() / 1000, raf = 0, shown = false;
    const frame = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(now - last, 0.1);
      // Touch devices draw every other frame (~30 fps).
      if (touch && dt < 1 / 32) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      const scrollCam = scrollY / innerHeight;
      cam += (now * 0.125 + scrollCam * 0.6 - cam) * Math.min(1, dt * 3);
      fog += (zone - fog) * Math.min(1, dt * 1.6);
      lookX += (aimX - lookX) * Math.min(1, dt * 2);
      lookY += (aimY - lookY) * Math.min(1, dt * 2);
      const f = Math.min(Math.max((now - flashAt) / 0.9, 0), 1);
      gl.uniform1f(uTime, now);
      gl.uniform1f(uCam, cam);
      gl.uniform1f(uFog, fog);
      gl.uniform1f(uFlash, Math.sin(f * Math.PI));
      gl.uniform2f(uLook, lookX, lookY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        canvas.dataset.on = "";
      }
      if (!still) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now() / 1000;
      cam = last * 0.125 + scrollY / innerHeight * 0.6;
      raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    const onResize = () => {
      resize();
      if (still) start();
    };

    // Starts once the page itself has loaded, so it never competes with the first render.
    const begin = () => {
      start();
      document.addEventListener("visibilitychange", onVisibility);
      addEventListener("resize", onResize);
    };
    if (document.readyState === "complete") begin();
    else addEventListener("load", begin, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("load", begin);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="space-canvas" aria-hidden="true" />;
}
