const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const typers = new WeakMap();
export function cancelType(el, skipBtn) {
  const t = typers.get(el); if (t) { clearTimeout(t.id); el.onclick = null; typers.delete(el); }
  el.style.minHeight = ""; if (skipBtn) skipBtn.hidden = true;
}
// Mengetik huruf demi huruf; tinggi kartu dikunci dulu supaya layout tidak loncat.
export function typeText(el, text, skipBtn, done) {
  cancelType(el, skipBtn);
  el.textContent = text;
  if (calm()) { done?.(); return; }
  el.style.minHeight = el.offsetHeight + "px";
  el.textContent = "";
  let i = 0;
  const finish = () => { cancelType(el, skipBtn); el.textContent = text; done?.(); };
  const step = () => {
    i++; el.textContent = text.slice(0, i);
    if (i >= text.length) return finish();
    const ch = text[i - 1];
    const wait = /[.!?\n]/.test(ch) ? 260 : ch === "," ? 120 : 24;
    typers.set(el, { id: setTimeout(step, wait) });
  };
  if (skipBtn) { skipBtn.hidden = false; skipBtn.onclick = finish; }
  el.onclick = finish;
  step();
}

export function confetti() {
  if (calm()) return;
  const cv = document.getElementById("confetti"), g = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const cols = ["#F8DDE8", "#DCD6F7", "#F5C7A9", "#B85C7A", "#FFB347"];
  const ps = Array.from({ length: 70 }, () => ({ x: Math.random() * cv.width, y: -10 - Math.random() * 80, vx: Math.random() * 2 - 1, vy: 2 + Math.random() * 3, s: 5 + Math.random() * 5, c: cols[(Math.random() * cols.length) | 0], r: Math.random() * 6 }));
  let f = 0;
  (function tick() {
    g.clearRect(0, 0, cv.width, cv.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.r += .1; g.fillStyle = p.c; g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); g.restore(); });
    if (++f < 150) requestAnimationFrame(tick); else g.clearRect(0, 0, cv.width, cv.height);
  })();
}

export function initSparkles(box) {
  if (calm()) return;
  const sym = ["♡", "✦", "✧", "·"];
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("span");
    s.className = "fl"; s.textContent = sym[i % 4];
    s.style.cssText = `left:${Math.random() * 100}%;font-size:${12 + Math.random() * 14}px;color:#B85C7A;animation-duration:${12 + Math.random() * 10}s;animation-delay:${-Math.random() * 15}s`;
    box.appendChild(s);
  }
}

export function initMusic(btn, src, toast) {
  const VOL = 0.45, FADE = 1800;
  const audio = new Audio(src); audio.loop = true; audio.volume = 0; audio.preload = "auto";
  let fadeId, userOff = false;
  const set = on => { btn.setAttribute("aria-pressed", on); btn.textContent = on ? "♪ Music: on" : "♪ Music: off"; };
  const fade = (to, done) => {
    clearInterval(fadeId);
    const from = audio.volume, t0 = performance.now();
    fadeId = setInterval(() => {
      const k = Math.min((performance.now() - t0) / FADE, 1);
      audio.volume = from + (to - from) * k;
      if (k === 1) { clearInterval(fadeId); done?.(); }
    }, 50);
  };
  const play = async () => {
    try { await audio.play(); set(true); fade(VOL); return true; }
    catch { set(false); toast("Music file not found. See assets/audio/README.txt ♪"); return false; }
  };
  const stop = () => { set(false); fade(0, () => audio.pause()); };
  btn.onclick = () => {
    if (!audio.paused && audio.volume > 0 && btn.getAttribute("aria-pressed") === "true") { userOff = true; stop(); }
    else { userOff = false; play(); }
  };
  // Mulai pelan-pelan saat sentuhan pertama (browser butuh interaksi dulu), kecuali sudah dimatikan manual
  const first = e => {
    if (e.target.closest("#music")) return;
    document.removeEventListener("pointerdown", first);
    if (!userOff && audio.paused) play();
  };
  document.addEventListener("pointerdown", first);
  // Jeda saat tab disembunyikan, lanjut lagi saat kembali
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (!audio.paused) audio.pause(); }
    else if (btn.getAttribute("aria-pressed") === "true") audio.play().catch(() => {});
  });
}
