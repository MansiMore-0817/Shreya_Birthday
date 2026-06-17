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
    msg: 'I wish your smile never fades, no matter what life brings, Shreya.'
  },
  {
    emoji: '✨',
    title: 'I waited for you',
    msg: 'I wish every dream you keep in your heart finds its way to reality.'
  },
  {
    emoji: '🌙',
    title: 'Close to my heart',
    msg: 'I wish you always find people who choose you, value you, and stay.'
  },
  {
    emoji: '🦋',
    title: 'Your new chapter',
    msg: 'I wish you never forget how wonderful and unforgettable you truly are.'
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
      ' Just remember this- ' +
      ' Somewhere in this world, there is a person whose day still gets better when he thinks about you. 🌸' +
      '<br><br>And that person is me. 💗'
  },
  low: {
    title: 'When you are feeling low 💗',
    text:
      'If today feels heavy, I want you to know this — <br><br>' +
      'You dont have to be strong all the time ' +
      'Rest, breathe and be gentle with yourself. The same heart that survived yesterday will survive today too! <br><br>' 
  },
  comfort: {
    title: 'When you need comfort 🌙',
    text:
      'Close your eyes for a moment. <br><br>' +
      'Imagine someone quietly reminding you that your are loved, appreciated, and more important than u realize. ' +
      'You were, and always will be, someone special to me.<br><br>' +
      '💕'
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
        Maybe people change.
        Maybe distances grow.
        Maybe stories end differently than we expected.
        But some feelings never really leave.
        No matter how much time passes, a part of me will always smile when I hear your name.
        Thank you for being one of the most beautiful chapters of my life.
        I'll always wish happiness for you, even from afar.
        Happy Birthday, Shreya.

        <br><br>
        
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

// ============================================================
//  BACKGROUND MUSIC — "Tum Ho Toh" (Saiyaara)
// ============================================================
const SONG_ID = '8SYPKQMW_2Q'; // Tum Ho Toh - Saiyaara
let ytPlayer      = null;
let musicReady    = false;
let musicPlaying  = false;
let userInteracted = false;

const musicBtn  = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

// YouTube IFrame API ready callback
window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('ytPlayer', {
    videoId: SONG_ID,
    playerVars: {
      autoplay: 0,
      loop:     1,
      playlist: SONG_ID,  // required for loop to work
      controls: 0,
      disablekb: 1,
      fs:       0,
      rel:      0,
      iv_load_policy: 3,
      modestbranding: 1,
      origin: window.location.origin
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

function onPlayerReady() {
  musicReady = true;
  ytPlayer.setVolume(60);
  // timer already running from page load — play as soon as ready + interacted + 10s passed
  if (userInteracted && Date.now() - pageLoadTime >= 10000) {
    tryPlay();
  }
}

function onPlayerStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    musicPlaying = true;
    musicBtn.classList.add('playing');
    musicIcon.textContent = '🎶';
  } else if (
    e.data === YT.PlayerState.PAUSED ||
    e.data === YT.PlayerState.ENDED
  ) {
    musicPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '🎵';
  }
}

function tryPlay() {
  if (ytPlayer && musicReady && !musicPlaying) {
    ytPlayer.playVideo();
  }
}

// Start 10s timer immediately on page load
const pageLoadTime = Date.now();
setTimeout(function () {
  // fires 10s after page load — play only if user has already interacted
  if (userInteracted) tryPlay();
}, 10000);

// First interaction — play immediately if 10s already passed, else wait
function handleFirstInteraction() {
  if (userInteracted) return;
  userInteracted = true;
  document.removeEventListener('click',      handleFirstInteraction);
  document.removeEventListener('touchstart', handleFirstInteraction);

  const elapsed = Date.now() - pageLoadTime;
  const remaining = Math.max(0, 10000 - elapsed);
  setTimeout(tryPlay, remaining);
}

document.addEventListener('click',      handleFirstInteraction, { passive: true });
document.addEventListener('touchstart', handleFirstInteraction, { passive: true });

// Manual toggle
musicBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  if (!ytPlayer || !musicReady) return;
  if (musicPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
});
