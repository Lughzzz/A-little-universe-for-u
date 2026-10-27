import { C } from "./content.js";
import { initSparkles, initMusic } from "./effects.js";
import { init, onEnter } from "./interactions.js";
const $ = s => document.querySelector(s);
const chs = [...document.querySelectorAll(".chapter")];
let cur = 0, timer;

function toast(m) {
  const t = $("#toast"); t.textContent = m; t.classList.add("show");
  clearTimeout(timer); timer = setTimeout(() => t.classList.remove("show"), 2400);
}

function goTo(i) {
  if (i < 0 || i >= chs.length) return;
  cur = i;
  chs.forEach((c, n) => (c.hidden = n !== i));
  document.querySelectorAll("#dots button").forEach((b, n) => n === i ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current"));
  $("#prev").disabled = i === 0; $("#next").disabled = i === chs.length - 1;
  $("#pos").textContent = `${i + 1} / ${chs.length}`;
  scrollTo(0, 0); chs[i].querySelector("h2").focus({ preventScroll: true });
  onEnter(i);
}

document.querySelectorAll("[data-t]").forEach(el => el.textContent = el.dataset.t.split(".").reduce((a, k) => a?.[k], C));
$("#dots").innerHTML = chs.map((_, i) => `<button type="button" aria-label="Chapter ${i + 1}: ${C.chapters[i]}">${i + 1}</button>`).join("");
document.querySelectorAll("#dots button").forEach((b, i) => b.onclick = () => goTo(i));
$("#prev").onclick = () => goTo(cur - 1);
$("#next").onclick = () => goTo(cur + 1);
document.querySelectorAll("[data-go]").forEach(b => b.onclick = () => goTo(cur + 1));

init({ toast, first: () => goTo(0) });
initSparkles($("#bg"));
initMusic($("#music"), C.music, toast);
goTo(0);
