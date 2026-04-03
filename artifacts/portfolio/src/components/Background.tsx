import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Theme colour palettes ─────────────────────────────────────── */
const DARK = {
  dots:    [0x00a1e0, 0x9b8fff, 0x00d4ff, 0x34d399, 0x60a5fa],
  line:    0x00a1e0,
  dotOpacity:  0.78,
  lineOpacity: 0.13,
  blending: THREE.AdditiveBlending,   // glow-on-overlap in dark
};
const LIGHT = {
  dots:    [0x005c8a, 0x4c3d9e, 0x007a99, 0x0f766e, 0x1d4ed8],
  line:    0x005c8a,
  dotOpacity:  0.55,
  lineOpacity: 0.18,
  blending: THREE.NormalBlending,     // solid dots on white bg
};

function isDark() { return document.documentElement.classList.contains("dark"); }

/* ─── WebGL probe ────────────────────────────────────────────────── */
function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch { return false; }
}

export function Background() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasWebGL()) return;
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch { return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 600);
    camera.position.set(0, 0, 120);

    /* ── Particles ── */
    const COUNT    = 130;
    const HALF     = { x: 120, y: 80, z: 60 };
    const MAX_DIST = 30;
    const MAX_LINES = 550;

    /* per-particle data */
    const pts = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * HALF.x * 2,
      y: (Math.random() - 0.5) * HALF.y * 2,
      z: (Math.random() - 0.5) * HALF.z * 2,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
      vz: (Math.random() - 0.5) * 0.022,
      size: Math.random() * 1.2 + 0.7,          // per-particle size (used for colour only)
    }));

    /* buffers */
    const pPos  = new Float32Array(COUNT * 3);
    const pCol  = new Float32Array(COUNT * 3);
    const pSize = new Float32Array(COUNT);

    /* assign initial colours from current theme */
    const applyThemeColors = () => {
      const theme = isDark() ? DARK : LIGHT;
      for (let i = 0; i < COUNT; i++) {
        const hex = theme.dots[Math.floor(Math.random() * theme.dots.length)];
        const c   = new THREE.Color(hex);
        pCol[i * 3]     = c.r;
        pCol[i * 3 + 1] = c.g;
        pCol[i * 3 + 2] = c.b;
        pSize[i] = pts[i].size + (isDark() ? 0.6 : 0.1); // slightly bigger dots in dark
      }
      pGeo.attributes.color.needsUpdate = true;
      pGeo.attributes.size.needsUpdate  = true;
    };

    /* geometry */
    const pGeo = new THREE.BufferGeometry();
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3] = pts[i].x; pPos[i * 3 + 1] = pts[i].y; pPos[i * 3 + 2] = pts[i].z;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));
    pGeo.setAttribute("size",     new THREE.BufferAttribute(pSize, 1));

    /* material – uses a per-point size attribute via custom shader */
    const pMat = new THREE.ShaderMaterial({
      uniforms: {
        opacity:  { value: 0 },
        scale:    { value: window.innerHeight / 2 },
      },
      vertexShader: /* glsl */`
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */`
        uniform float opacity;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          // soft glow fall-off
          float a = smoothstep(1.0, 0.0, d) * opacity;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent:  true,
      depthWrite:   false,
      blending:     isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    applyThemeColors();  // now pCol is filled, set colors

    const pointsMesh = new THREE.Points(pGeo, pMat);

    /* ── Lines ── */
    const lPos = new Float32Array(MAX_LINES * 2 * 3);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    const lMat = new THREE.LineBasicMaterial({
      color:       DARK.line,
      transparent: true,
      opacity:     0,
      depthWrite:  false,
      blending:    isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const linesMesh = new THREE.LineSegments(lGeo, lMat);

    /* ── Group ── */
    const group = new THREE.Group();
    group.add(pointsMesh); group.add(linesMesh);
    scene.add(group);

    /* ── Mouse ── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    /* ── Resize ── */
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* ── Theme observer (live toggle) ── */
    const applyThemeMaterials = () => {
      const theme = isDark() ? DARK : LIGHT;
      pMat.blending = theme.blending;
      pMat.needsUpdate = true;
      lMat.color.set(theme.line);
      lMat.blending = theme.blending;
      lMat.needsUpdate = true;
      applyThemeColors();
    };

    const themeObserver = new MutationObserver(applyThemeMaterials);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* ── Animation ── */
    let rafId: number, time = 0, fadeOpacity = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      time += 0.0025;

      /* fade in */
      if (fadeOpacity < 1) fadeOpacity = Math.min(1, fadeOpacity + 0.007);
      const theme = isDark() ? DARK : LIGHT;
      pMat.uniforms.opacity.value = fadeOpacity * theme.dotOpacity;
      lMat.opacity = fadeOpacity * theme.lineOpacity;

      /* mouse parallax */
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;
      camera.position.x = mouse.x * 7;
      camera.position.y = -mouse.y * 5;
      camera.lookAt(0, 0, 0);

      /* gentle rotation */
      group.rotation.y = time * 0.07;
      group.rotation.x = Math.sin(time * 0.035) * 0.1;

      /* move particles */
      for (let i = 0; i < COUNT; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > HALF.x) p.vx *= -1;
        if (Math.abs(p.y) > HALF.y) p.vy *= -1;
        if (Math.abs(p.z) > HALF.z) p.vz *= -1;
        pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y; pPos[i * 3 + 2] = p.z;
      }
      pGeo.attributes.position.needsUpdate = true;

      /* connections */
      let li = 0;
      for (let i = 0; i < COUNT && li < MAX_LINES - 1; i++) {
        for (let j = i + 1; j < COUNT && li < MAX_LINES - 1; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
          if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) {
            lPos[li * 6]     = pts[i].x; lPos[li * 6 + 1] = pts[i].y; lPos[li * 6 + 2] = pts[i].z;
            lPos[li * 6 + 3] = pts[j].x; lPos[li * 6 + 4] = pts[j].y; lPos[li * 6 + 5] = pts[j].z;
            li++;
          }
        }
      }
      lGeo.setDrawRange(0, li * 2);
      lGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      pGeo.dispose(); pMat.dispose(); lGeo.dispose(); lMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {/* Three.js canvas */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Ambient gradient orbs – slightly different tint per theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full dark:opacity-100 opacity-40"
          style={{ width: 640, height: 640, top: "8%", left: "-12%",
            background: "radial-gradient(circle, rgba(0,161,224,0.09) 0%, transparent 70%)",
            animation: "float-orb 18s ease-in-out infinite" }} />
        <div className="absolute rounded-full dark:opacity-100 opacity-40"
          style={{ width: 520, height: 520, top: "48%", right: "-10%",
            background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
            animation: "float-orb 22s ease-in-out infinite reverse" }} />
        <div className="absolute rounded-full dark:opacity-100 opacity-30"
          style={{ width: 420, height: 420, bottom: "12%", left: "28%",
            background: "radial-gradient(circle, rgba(0,168,216,0.06) 0%, transparent 70%)",
            animation: "float-orb 28s ease-in-out infinite", animationDelay: "-6s" }} />
      </div>
    </>
  );
}
