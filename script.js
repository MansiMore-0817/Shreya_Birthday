// ============================================================
//  CUSTOM CURSOR
// ============================================================
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();

document.querySelectorAll('button, .polaroid, .env-card, .wish-star, .nav-dot').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.2)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});

// ============================================================
//  FLOATING PETALS
// ============================================================
const petalEmojis = ['🌸', '🌷', '🌹', '✿', '❀', '🌺'];
const petalsLayer = document.getElementById('petalsLayer');

function spawnPetal() {
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  const size = Math.random() * 14 + 12;
  p.style.cssText = `
    left: ${Math.random() * 100}vw;
    font-size: ${size}px;
    animation-duration: ${Math.random() * 8 + 7}s;
    animation-delay: ${Math.random() * 3}s;
    opacity: ${Math.random() * 0.5 + 0.3};
  `;
  petalsLayer.appendChild(p);
  setTimeout(() => p.remove(), 16000);
}
setInterval(spawnPetal, 700);
for (let i = 0; i < 8; i++) setTimeout(spawnPetal, i * 200);


// ============================================================
//  SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
//  NAV DOTS
// ============================================================
const sections = document.querySelectorAll('[data-sec]');
const navDots   = document.querySelectorAll('.nav-dot');

function updateNavDots() {
  let current = 0;
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2) current = i;
  });
  navDots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}

window.addEventListener('scroll', updateNavDots, { passive: true });

navDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const target = document.querySelector(`[data-sec="${i}"]`) || document.getElementById(`sec-${i}`);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// hero section dot
document.querySelector('[data-section="0"]') &&
  document.querySelector('[data-section="0"]').addEventListener('click', () =>
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' }));

// ============================================================
//  SCROLL TO LETTER  (original)
// ============================================================
function goLetter() {
  document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
//  SKY WISHES  (original content preserved)
// ============================================================
const skyWishes = [
  {
    emoji: '🌷',
    title: 'A wish for you',
    msg: 'May this year bring you more of those moments that make your eyes light up — the ones only you know the reason behind. You deserve every bit of that happiness, Shreya.'
  },
  {
    emoji: '✨',
    title: 'I waited for you',
    msg: 'Every single day, I waited for your message. And every single time, it made me smile more than you will ever know. That feeling was real, and it always will be.'
  },
  {
    emoji: '🌙',
    title: 'Close to my heart',
    msg: 'No matter how distant we have become, those memories live in a part of my heart that no one else can reach. I hope you know that.'
  },
  {
    emoji: '🦋',
    title: 'Your new chapter',
    msg: 'May this birthday be the start of something beautiful for you — peaceful days, warm moments, and everything your heart quietly wishes for. You deserve it all.'
  }
];

function showWish(index) {
  const wish = skyWishes[index];
  document.getElementById('wishPopup').style.display = 'flex';
  document.getElementById('wishEmoji').innerHTML   = wish.emoji;
  document.getElementById('wishTitle').innerHTML   = wish.title;
  document.getElementById('wishMessage').innerHTML = wish.msg;
  spawnPopupHearts('wishHeartsContainer');
}

function closeWishPopup() {
  document.getElementById('wishPopup').style.display = 'none';
}


// ============================================================
//  OPEN WHEN LETTERS  (original content preserved)
// ============================================================
const letters = {
  smile: {
    title: 'When you need a smile 🤍',
    text:
      'Hey Shreya 🌷<br><br>' +
      'Remember those days when you used to secretly look at your phone and smile? ' +
      'Your family would ask, <em>"Why are you smiling so much?"</em> — and only we knew the answer.<br><br>' +
      'That smile of yours was genuinely one of the most beautiful things I ever got to witness. ' +
      'Never let anyone take that away from you. ✨'
  },
  low: {
    title: 'When you are feeling low 💗',
    text:
      'If today feels heavy, I want you to know this — <br><br>' +
      'You are not alone. Even from a distance, someone is still thinking about you, ' +
      'still hoping you are okay, still cheering for you quietly.<br><br>' +
      'Be gentle with yourself. You are stronger than you think, and you are loved more than you know. 🤍'
  },
  comfort: {
    title: 'When you need comfort 🌙',
    text:
      'I know things between us are not the same right now. And I know you are hurt.<br><br>' +
      'But I want you to know — nothing that happened takes away from how precious every moment with you was. ' +
      'You were, and always will be, someone special to me.<br><br>' +
      'May your heart find peace, warmth, and all the softness it deserves. 💕'
  }
};

function openLetter(type) {
  const data = letters[type];
  document.getElementById('letterPopup').style.display  = 'flex';
  document.getElementById('popupTitle').innerHTML = data.title;
  document.getElementById('popupText').innerHTML  = data.text;
  spawnPopupHearts('popupHeartsContainer');
}

function closeLetter() {
  document.getElementById('letterPopup').style.display = 'none';
}

// Close popups on backdrop click
document.getElementById('letterPopup').addEventListener('click', function(e) {
  if (e.target === this) closeLetter();
});
document.getElementById('wishPopup').addEventListener('click', function(e) {
  if (e.target === this) closeWishPopup();
});

// ============================================================
//  POPUP HEART PARTICLES
// ============================================================
function spawnPopupHearts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const heartEmojis = ['💗', '💕', '🌹', '✨', '🌷'];
  for (let i = 0; i < 10; i++) {
    const h = document.createElement('span');
    h.className = 'popup-heart';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.cssText = `
      left: ${Math.random() * 90 + 5}%;
      font-size: ${Math.random() * 14 + 10}px;
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${Math.random() * 1.5 + 1.5}s;
    `;
    container.appendChild(h);
  }
}

// ============================================================
//  FINAL SURPRISE  (original content preserved)
// ============================================================
function surprise() {
  const box = document.createElement('div');
  box.className = 'surprise-box';
  box.innerHTML = `
    <div class="surprise-card">
      <button class="close-btn">×</button>
      <div class="popup-hearts" id="surpriseHeartsContainer"></div>
      <div class="big-heart">❤️</div>
      <h1>I could never forget you</h1>
      <p>
        I could never let your birthday pass without saying this —<br><br>
        Thank you, Shreya. For every secret conversation, every smile,
        every moment on the hills, and every memory we made together.
        <br><br>
        Those moments will always stay close to my heart.
        No matter what, you will always have a special place there. 🤍
        <br><br>
        <strong style="font-family:'Great Vibes',cursive; font-size:28px; color:#c9184a;">
          Love you — Rohit ❤️
        </strong>
      </p>
      <div class="mini-hearts">💗 💕 💗</div>
    </div>
  `;
  document.body.appendChild(box);
  box.style.display = 'flex';

  setTimeout(() => spawnPopupHearts('surpriseHeartsContainer'), 50);
  startConfetti();

  box.querySelector('.close-btn').onclick = () => {
    box.remove();
    stopConfetti();
  };
  box.addEventListener('click', function(e) {
    if (e.target === this) {
      box.remove();
      stopConfetti();
    }
  });
}

// ============================================================
//  CONFETTI
// ============================================================
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;
let confettiRAF = null;

const confettiColors = ['#c9184a','#f4a0b0','#d4788a','#f7e7ce','#ffffff','#8b0000','#ffd6e0'];

function resizeConfetti() {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function createParticle() {
  return {
    x:      Math.random() * confettiCanvas.width,
    y:      Math.random() * confettiCanvas.height - confettiCanvas.height,
    r:      Math.random() * 7 + 3,
    color:  confettiColors[Math.floor(Math.random() * confettiColors.length)],
    speed:  Math.random() * 3 + 1.5,
    drift:  (Math.random() - 0.5) * 1.5,
    spin:   Math.random() * 0.2 - 0.1,
    angle:  Math.random() * Math.PI * 2,
    shape:  Math.random() > 0.5 ? 'circle' : 'rect'
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.85;
    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
    }
    ctx.restore();

    p.y     += p.speed;
    p.x     += p.drift;
    p.angle += p.spin;

    if (p.y > confettiCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * confettiCanvas.width;
    }
  });

  if (confettiRunning) confettiRAF = requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  confettiCanvas.style.display = 'block';
  confettiParticles = Array.from({ length: 120 }, createParticle);
  confettiRunning = true;
  drawConfetti();
}

function stopConfetti() {
  confettiRunning = false;
  if (confettiRAF) cancelAnimationFrame(confettiRAF);
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiCanvas.style.display = 'none';
  confettiParticles = [];
}
