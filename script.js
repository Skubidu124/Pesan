let auto = true;
let autoLoveInterval;

let pesan = [
  "Hai. Ini random sih, tapi gue iseng bikin sesuatu dan kepikiran buat kirim ke lu",

  "Btw ini bukan confess atau hal serius. Santai aja bacanya, anggap aja nemu sesuatu yang gak biasa",

  "Semoga hari lu jalan smooth aja, gak harus perfect yang penting gak bikin pusing",

"Kalau lagi capek atau overthinking, take it slow aja. Gak harus selalu keliatan kuat terus",

  "Semoga hal-hal kecil hari ini cukup buat bikin mood lu tetep oke",

  "Dan semoga apa yang lagi lu jalanin sekarang pelan-pelan ngasih hasil yang bikin lu puas",
  
  "Sorry ya kalo jelek atau ngga jelas",
  
  "THANK YOUU UDAH MAU BACAAA",
  

];

let i = 0;
let isTyping = false;

/* START */
function start() {
  document.getElementById("awal").style.display = "none";
  document.getElementById("scene").style.display = "flex";

  i = 0;
  auto = true;

  render();
  startAutoLove();

  // PLAY MUSIC (FIX MOBILE)
  let m = document.getElementById("music");
  if (m) {
    m.currentTime = 135;

    let playPromise = m.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Autoplay diblok, tapi aman");
      });
    }
  }
}

/* RENDER */
function render() {
  let textEl = document.getElementById("text");
  let badgeEl = document.getElementById("badge");
  let progressEl = document.getElementById("progress");

  if (!textEl || !badgeEl || !progressEl) return;

  textEl.innerHTML = "";
  isTyping = true;

  typeWriter(pesan[i], 0, () => {
    isTyping = false;

    if (i === pesan.length - 1) {
  spawnConfetti(); // 🔥 TAMBAHAN
  endScene();
}
  });

  // badge
  badgeEl.innerHTML = `Pesan ${i + 1}/${pesan.length}`;

  // progress
  progressEl.innerHTML = "";
  for (let j = 0; j < pesan.length; j++) {
    let bar = document.createElement("div");
    bar.className = "bar" + (j <= i ? " active" : "");
    progressEl.appendChild(bar);
  }
}

/* TYPEWRITER (LEBIH SMOOTH) */
function typeWriter(text, index, callback) {
  if (index < text.length) {
    document.getElementById("text").innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1, callback), 50);
  } else {
    callback();
  }
}

/* NEXT / PREV */
function next() {
  auto = false;
  if (!isTyping && i < pesan.length - 1) {
    i++;
    render();
  }
}

function prev() {
  auto = false;
  if (!isTyping && i > 0) {
    i--;
    render();
  }
}

/* AUTO SLIDE (FIX HALUS) */
setInterval(() => {
  if (
    auto &&
    !isTyping &&
    document.getElementById("scene").style.display === "flex"
  ) {
    if (i < pesan.length - 1) {
      i++;
      render();
    }
  }
}, 3000);

/* CLICK CARD (AMAN) */
document.addEventListener("click", (e) => {
  if (e.target.closest(".card")) {
    if (!isTyping && i < pesan.length - 1) {
      auto = false;
      i++;
      render();
    }
  }
});

/* LOVE EFFECT */
function spawnLove() {
  let container = document.getElementById("scene");
  if (!container) return;

  let love = document.createElement("div");
  let emojis = ["✨","⭐","🌙","☁️"];

  love.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  love.className = "love-spawn";
  love.style.left = Math.random() * 100 + "%";

  container.appendChild(love);

  setTimeout(() => love.remove(), 3000);
}

function spawnConfetti() {
  let container = document.getElementById("scene");

  for (let i = 0; i < 30; i++) {
    let c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "%";
    c.style.background = `hsl(${Math.random()*360},70%,70%)`;
    c.style.animationDuration = (Math.random()*2 + 2) + "s";

    container.appendChild(c);

    setTimeout(() => c.remove(), 3000);
  }
}

function loveClick() {
  for (let j = 0; j < 20; j++) {
    spawnLove();
  }

  if (!isTyping) {
    next();
  }
}

/* AUTO LOVE LOOP */
function startAutoLove() {
  clearInterval(autoLoveInterval);

  autoLoveInterval = setInterval(() => {
    spawnLove();
  }, 700);
}

/* END SCENE (FIX CLEAN) */
function endScene() {
  setTimeout(() => {
    document.getElementById("scene").classList.add("fade-out");

    setTimeout(() => {
      document.getElementById("scene").style.display = "none";
      document.getElementById("awal").style.display = "block";
      document.getElementById("scene").classList.remove("fade-out");

      // 🔥 STOP MUSIC DI SINI
      let m = document.getElementById("music");
      if (m) {
        m.pause();
        m.currentTime = 0;
      }

      clearInterval(autoLoveInterval);
    }, 500);

  }, 2500);
}

/* TOOLS */
function copyText() {
  navigator.clipboard.writeText(pesan[i]);
  alert("Disalin!");
}

function shareText() {
  if (navigator.share) {
    navigator.share({ text: pesan[i] });
  } else {
    alert("Share tidak didukung di browser ini");
  }
}