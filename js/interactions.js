import { C } from "./content.js";
import { confetti, typeText, cancelType } from "./effects.js";
const $ = s => document.querySelector(s);
let ctx, q = 0, score = 0, opened = new Set(), done = {}, revealed = false;

function openEnvelope() {
  $("#env").classList.add("open"); $("#env").setAttribute("aria-expanded", "true");
  $("#letter").hidden = false; $("#openLetter").disabled = true;
  typeText($("#letter"), C.letter, $("#skip1"), () => { $("#next1").hidden = false; });
}

function daysToBirthday() {
  const n = new Date(), t = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  let b = new Date(t.getFullYear(), C.birthday.month - 1, C.birthday.day);
  if (b < t) b = new Date(t.getFullYear() + 1, b.getMonth(), b.getDate());
  return Math.round((b - t) / 864e5);
}

function renderQuiz() {
  const box = $("#quiz"), Q = C.quiz.questions;
  if (q >= Q.length) {
    box.innerHTML = `<p>${C.quiz.done.replace("{s}", score).replace("{n}", Q.length)}</p><button id="qr" type="button">Try again</button>`;
    $("#qr").onclick = () => { q = 0; score = 0; $("#next4").hidden = true; renderQuiz(); };
    $("#next4").hidden = false; done.quiz = true; return;
  }
  const it = Q[q];
  box.innerHTML = `<p class="small">Question ${q + 1} of ${Q.length}</p><h3>${it.q}</h3>
    <div class="opts">${it.options.map((o, i) => `<button type="button" data-i="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join("")}</div>
    <p id="fb" aria-live="polite"></p>`;
  box.querySelectorAll(".opts button").forEach(b => b.onclick = () => {
    const i = +b.dataset.i, ok = i === it.correct;
    if (ok) score++;
    box.querySelectorAll(".opts button").forEach(x => x.disabled = true);
    b.classList.add("picked");
    $("#fb").textContent = (ok ? "✓ " : "♡ ") + (ok ? it.right : it.other);
    box.insertAdjacentHTML("beforeend", `<button id="qn" type="button">${q + 1 === Q.length ? "See result" : "Continue"}</button>`);
    $("#qn").onclick = () => { q++; renderQuiz(); };
  });
}

function buildGifts() {
  opened = new Set(); $("#surprise").hidden = true;
  $("#gifts").innerHTML = C.gifts.map((g, i) => `<button class="gift" type="button" data-i="${i}"><span class="front">${g.title}<br><small>Tap to open</small></span><span class="back"><b>${g.title}</b> ✓ Opened<br>${g.text}</span></button>`).join("");
  $("#gifts").querySelectorAll(".gift").forEach(b => b.onclick = () => {
    b.classList.add("open"); opened.add(b.dataset.i);
    if (opened.size === C.gifts.length) { done.gifts = true; $("#surprise").textContent = C.surprise; $("#surprise").hidden = false; confetti(); }
  });
}

function buildGame() {
  const pairs = [...C.game.cards, ...C.game.cards].sort(() => Math.random() - .5);
  let first = null, lock = false, moves = 0, matched = 0;
  $("#game").innerHTML = pairs.map((c, i) => `<button class="mcard" type="button" data-i="${i}" aria-label="Card ${i + 1}, face down"><span class="face">${c.s}</span></button>`).join("");
  $("#moves").textContent = `${C.game.moves}: 0`; $("#gameMsg").hidden = true; $("#gameAgain").hidden = true;
  const btns = [...$("#game").querySelectorAll(".mcard")];
  btns.forEach((b, i) => b.onclick = () => {
    if (lock || b.classList.contains("flip")) return;
    b.classList.add("flip"); b.setAttribute("aria-label", `Card ${i + 1}, ${pairs[i].n}`);
    if (first === null) { first = i; return; }
    moves++; $("#moves").textContent = `${C.game.moves}: ${moves}`;
    const a = first; first = null;
    if (pairs[a].n === pairs[i].n) {
      btns[a].classList.add("done"); b.classList.add("done"); matched++;
      if (matched === C.game.cards.length) {
        done.game = true; confetti();
        $("#gameMsg").textContent = C.game.win.replace("{m}", moves); $("#gameMsg").hidden = false; $("#gameAgain").hidden = false;
      }
    } else {
      lock = true;
      setTimeout(() => { [btns[a], b].forEach((x, n) => { x.classList.remove("flip"); x.setAttribute("aria-label", `Card ${(n ? i : a) + 1}, face down`); }); lock = false; }, 800);
    }
  });
}

function refreshSecret() {
  const R = C.secret.reqs, all = Object.keys(R).every(k => done[k]);
  $("#reqs").innerHTML = Object.keys(R).map(k => `<li class="${done[k] ? "ok" : ""}">${done[k] ? "✓" : "○"} ${R[k]}</li>`).join("");
  if (!all) return;
  $("#lockBox").hidden = true; $("#secret").hidden = false;
  if (!revealed) { revealed = true; confetti(); typeText($("#secret"), C.secret.msg, $("#skip7")); }
}

function buildGallery() {
  $("#gallery").innerHTML = C.photos.map((p, i) => `<button class="photo" type="button" data-i="${i}" aria-label="Open photo: ${p.caption}"><span class="frame"><span class="ph">${p.placeholder}</span><img src="${p.src}" alt="${p.alt}"></span><span class="cap">${p.caption}</span></button>`).join("");
  $("#gallery").querySelectorAll("img").forEach(im => { im.onerror = () => im.remove(); if (im.complete && !im.naturalWidth) im.remove(); });
  $("#gallery").querySelectorAll(".photo").forEach(b => b.onclick = () => {
    $("#lbBody").innerHTML = b.querySelector(".frame").outerHTML + `<p class="hand">${b.querySelector(".cap").textContent}</p>`;
    $("#lbBody img")?.addEventListener("error", e => e.target.remove());
    $("#lb").showModal();
  });
}

export function reset() {
  $("#env").classList.remove("open"); $("#env").setAttribute("aria-expanded", "false");
  cancelType($("#letter"), $("#skip1")); cancelType($("#last"), $("#skip8")); cancelType($("#secret"), $("#skip7"));
  $("#letter").textContent = ""; $("#last").textContent = ""; $("#secret").textContent = "";
  done = {}; revealed = false; $("#lockBox").hidden = false; $("#secret").hidden = true; refreshSecret(); buildGame();
  $("#letter").hidden = true; $("#next1").hidden = true; $("#openLetter").disabled = false;
  $("#cake").classList.remove("out"); $("#wishMsg").hidden = true; $("#next2").hidden = true; $("#wish").textContent = C.cake.btn;
  q = 0; score = 0; $("#next4").hidden = true; renderQuiz();
  buildGifts(); $("#last").hidden = true; $("#openLast").disabled = false;
  if ($("#lb").open) $("#lb").close();
}

export function onEnter(i) { if (i === 6) refreshSecret(); if (i === 1) $("#bdate").textContent = `${C.birthday.label} · ${C.cake.soon(daysToBirthday())}`; }

export function init(c) {
  ctx = c;
  $("#wishMsg").textContent = C.cake.msg; $("#gameAgain").onclick = buildGame;
  $("#env").onclick = $("#openLetter").onclick = openEnvelope;
  $("#wish").onclick = () => {
    const out = $("#cake").classList.toggle("out");
    $("#wishMsg").hidden = !out; $("#next2").hidden = !out;
    $("#wish").textContent = out ? C.cake.again : C.cake.btn;
    if (out) { confetti(); ctx.toast("Your wish is on its way ✨"); }
  };
  buildGallery();
  $("#lbClose").onclick = () => $("#lb").close();
  $("#lb").onclick = e => { if (e.target === $("#lb")) $("#lb").close(); };
  $("#openLast").onclick = () => { $("#last").hidden = false; $("#openLast").disabled = true; confetti(); typeText($("#last"), C.last.letter, $("#skip8")); };
  $("#replay").onclick = () => { reset(); ctx.first(); ctx.toast("Starting over ♡"); };
  $("#back").onclick = () => ctx.first();
  reset();
}
