import { useEffect, useRef } from "react";
import * as THREE from "three";

/* 2-D fallback when WebGL is unavailable (e.g. headless environments) */
function Canvas2DBackground({ mountRef }: { mountRef: React.RefObject<HTMLDivElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 70, MAX_DIST = 140;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    let rafId: number, w = 0, h = 0;

    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++)
        particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.8 + 0.6, o: Math.random() * 0.5 + 0.15 });
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      const dot = dark ? "0,161,224" : "0,100,180";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot},${p.o})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${dot},${(1 - dist / MAX_DIST) * 0.15})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity: 0.8 }} />;
}

/* Check WebGL support without initialising a full renderer */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch { return false; }
}

export function Background() {
  const mountRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<boolean | null>(null);

  useEffect(() => {
    webglRef.current = hasWebGL();
    if (!webglRef.current) return;

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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 0, 110);

    /* ── Particle data ── */
    const COUNT = 120;
    const HALF = { x: 110, y: 75, z: 55 };
    const MAX_DIST = 28;
    const MAX_LINES = 500;

    const isDark = () => document.documentElement.classList.contains("dark");

    const pts = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * HALF.x * 2,
      y: (Math.random() - 0.5) * HALF.y * 2,
      z: (Math.random() - 0.5) * HALF.z * 2,
      vx: (Math.random() - 0.5) * 0.035,
      vy: (Math.random() - 0.5) * 0.035,
      vz: (Math.random() - 0.5) * 0.02,
    }));

    const pPos = new Float32Array(COUNT * 3);
    const pCol = new Float32Array(COUNT * 3);
    const palette = [new THREE.Color("#00A1E0"), new THREE.Color("#9B8FFF"), new THREE.Color("#00D4FF"), new THREE.Color("#34D399")];

    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3] = pts[i].x; pPos[i * 3 + 1] = pts[i].y; pPos[i * 3 + 2] = pts[i].z;
      const c = palette[Math.floor(Math.random() * palette.length)];
      pCol[i * 3] = c.r; pCol[i * 3 + 1] = c.g; pCol[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color",    new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({ size: 1.6, vertexColors: true, transparent: true, opacity: 0, sizeAttenuation: true });
    const pointsMesh = new THREE.Points(pGeo, pMat);

    const lPos = new Float32Array(MAX_LINES * 2 * 3);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    const lMat = new THREE.LineBasicMaterial({ color: "#00A1E0", transparent: true, opacity: 0 });
    const linesMesh = new THREE.LineSegments(lGeo, lMat);

    const group = new THREE.Group();
    group.add(pointsMesh); group.add(linesMesh);
    scene.add(group);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let opacity = 0;
    const T_DOTS = 0.75, T_LINES = 0.14;
    let rafId: number, time = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      time += 0.003;
      if (opacity < 1) opacity = Math.min(1, opacity + 0.008);

      const dark = isDark();
      pMat.opacity = opacity * (dark ? T_DOTS  : T_DOTS  * 0.55);
      lMat.opacity = opacity * (dark ? T_LINES : T_LINES * 0.55);

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      camera.position.x = mouse.x * 6;
      camera.position.y = -mouse.y * 4;
      camera.lookAt(0, 0, 0);

      group.rotation.y = time * 0.08;
      group.rotation.x = Math.sin(time * 0.04) * 0.12;

      for (let i = 0; i < COUNT; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > HALF.x) p.vx *= -1;
        if (Math.abs(p.y) > HALF.y) p.vy *= -1;
        if (Math.abs(p.z) > HALF.z) p.vz *= -1;
        pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y; pPos[i * 3 + 2] = p.z;
      }
      pGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let i = 0; i < COUNT && li < MAX_LINES - 1; i++) {
        for (let j = i + 1; j < COUNT && li < MAX_LINES - 1; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
          if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) {
            lPos[li * 6] = pts[i].x; lPos[li * 6 + 1] = pts[i].y; lPos[li * 6 + 2] = pts[i].z;
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      pGeo.dispose(); pMat.dispose(); lGeo.dispose(); lMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  const orbs = (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "10%", left: "-10%", background: "radial-gradient(circle, rgba(0,161,224,0.07) 0%, transparent 70%)", animation: "float-orb 18s ease-in-out infinite" }} />
      <div className="absolute rounded-full" style={{ width: 500, height: 500, top: "50%", right: "-8%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", animation: "float-orb 22s ease-in-out infinite reverse" }} />
      <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "15%", left: "30%", background: "radial-gradient(circle, rgba(0,168,216,0.05) 0%, transparent 70%)", animation: "float-orb 28s ease-in-out infinite", animationDelay: "-6s" }} />
    </div>
  );

  /* If WebGL was never checked (SSR/first pass) – render nothing extra */
  return (
    <>
      {/* 3-D Three.js mount (hidden when WebGL unavailable) */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      {orbs}
    </>
  );
}
