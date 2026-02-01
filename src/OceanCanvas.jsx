import { useEffect, useRef } from "react";

function OceanCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0, h = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const surfaceYRatio = 0.48; // görseldeki gibi ortalara yakın
    const waves = [
      { amp: 10, len: 280, speed: 0.7, phase: 0.0 },
      { amp: 18, len: 420, speed: 0.45, phase: 1.2 },
      { amp: 6, len: 160, speed: 1.1, phase: 2.1 },
    ];

    // sabit “ışın” kolonları (god rays) - performans için önceden üret
    const rayCount = 28;
    const rays = Array.from({ length: rayCount }, (_, i) => ({
      x: (i + 0.5) / rayCount,
      w: 0.025 + Math.random() * 0.03,
      a: 0.06 + Math.random() * 0.08,
      sp: 0.15 + Math.random() * 0.25,
      ph: Math.random() * Math.PI * 2,
    }));

    let rafId = 0;
    let t0 = performance.now();

    const draw = (t) => {
      const dt = (t - t0) / 1000;
      t0 = t;

      waves.forEach((wv) => (wv.phase += dt * wv.speed));

      ctx.clearRect(0, 0, w, h);

      const baseY = Math.floor(h * surfaceYRatio);

      // --- SKY (üst)
      const sky = ctx.createLinearGradient(0, 0, 0, baseY + 80);
      sky.addColorStop(0, "#bfe6ff");
      sky.addColorStop(0.55, "#7fc3ee");
      sky.addColorStop(1, "#3a91c7");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, baseY + 80);

      // güneş parlaması
      const sun = ctx.createRadialGradient(w * 0.68, h * 0.22, 0, w * 0.68, h * 0.22, Math.max(w, h) * 0.55);
      sun.addColorStop(0, "rgba(255,255,255,0.55)");
      sun.addColorStop(0.25, "rgba(255,255,255,0.22)");
      sun.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sun;
      ctx.fillRect(0, 0, w, baseY + 120);

      // --- WATER BODY (alt)
      const water = ctx.createLinearGradient(0, baseY - 30, 0, h);
      water.addColorStop(0, "rgba(75,190,220,0.55)");
      water.addColorStop(0.25, "rgba(35,150,195,0.70)");
      water.addColorStop(0.6, "rgba(12,85,135,0.85)");
      water.addColorStop(1, "rgba(4,20,35,0.95)");
      ctx.fillStyle = water;
      ctx.fillRect(0, baseY - 40, w, h - (baseY - 40));

      // --- WAVE PATH (su yüzeyi)
      const waveY = (x) => {
        let y = baseY;
        for (const wv of waves) {
          y += Math.sin((x / wv.len) * Math.PI * 2 + wv.phase) * wv.amp;
        }
        return y;
      };

      // su yüzeyi üstündeki ince köpük çizgisi + highlight
      ctx.beginPath();
      ctx.moveTo(0, waveY(0));
      for (let x = 0; x <= w; x += 8) ctx.lineTo(x, waveY(x));
      ctx.strokeStyle = "rgba(255,255,255,0.65)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // yüzeyin hemen altına hafif ışıklı şerit
      ctx.beginPath();
      ctx.moveTo(0, waveY(0));
      for (let x = 0; x <= w; x += 8) ctx.lineTo(x, waveY(x));
      ctx.lineTo(w, baseY + 160);
      ctx.lineTo(0, baseY + 160);
      ctx.closePath();
      const surfGlow = ctx.createLinearGradient(0, baseY - 10, 0, baseY + 160);
      surfGlow.addColorStop(0, "rgba(255,255,255,0.18)");
      surfGlow.addColorStop(0.2, "rgba(255,255,255,0.10)");
      surfGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = surfGlow;
      ctx.fill();

      // --- UNDERWATER LIGHT RAYS (god rays)
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const r of rays) {
        const x = r.x * w;
        const wobble = Math.sin(t * 0.001 * (0.8 + r.sp) + r.ph) * (w * 0.015);
        const rw = r.w * w * (0.9 + 0.2 * Math.sin(t * 0.001 + r.ph));
        const topY = baseY + 10;
        const bottomY = h;

        const g = ctx.createLinearGradient(x + wobble, topY, x + wobble, bottomY);
        g.addColorStop(0, `rgba(255,255,255,${r.a})`);
        g.addColorStop(0.35, `rgba(255,255,255,${r.a * 0.55})`);
        g.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = g;
        ctx.fillRect(x + wobble - rw / 2, topY, rw, bottomY - topY);
      }
      ctx.restore();

      // --- SURFACE SPARKLES (üstte su parıltıları)
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 40; i++) {
        const x = (i / 40) * w + Math.sin(t * 0.0016 + i) * 18;
        const y = baseY - 28 + Math.sin(t * 0.0022 + i * 1.8) * 10;
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(x, y, 34, 1);
      }
      ctx.restore();

      // --- PARTICLES (su altı tozu)
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "rgba(255,255,255,1)";
      const count = 120;
      for (let i = 0; i < count; i++) {
        const px = ((i * 97) % w) + Math.sin(t * 0.0007 + i) * 12;
        const py = baseY + 40 + (((i * 131) % (h - baseY)) * 0.98);
        if (py > h) continue;
        ctx.fillRect(px, py, 1, 1);
      }
      ctx.restore();

      // --- VIGNETTE (derinlik hissi)
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.55, Math.min(w, h) * 0.15, w * 0.5, h * 0.65, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="oceanCanvas" />;
}

export default OceanCanvas;
export { OceanCanvas };
