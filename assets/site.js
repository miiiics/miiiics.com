/* Shared behaviour for every page on miiiics.com.
   Load at the end of <body>, before posts.js. */

/* ── Site root ──
   Derived from this script's own URL rather than from location.pathname, so it is
   correct at any page depth (/home/, /projects/<slug>/) and under both deployments
   (miiiics.com/ and localhost/miiiics/). Ends with a trailing slash. */
window.SITE_BASE = (function () {
  var s = document.currentScript;
  if (!s) {
    var all = document.getElementsByTagName('script');
    s = all[all.length - 1];
  }
  return s.src.replace(/assets\/site\.js(?:\?.*)?$/, '');
}());

/* ── Drifting particle backdrop ── */
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  const COUNT = 55;
  const particles = [];
  let t = 0;
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', function() { setTimeout(resize, 50); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
  resize();
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1.5,
      speed: Math.random() * 0.3 + 0.1,
      drift: (Math.random() - 0.5) * 0.2,
      baseOpacity: Math.random() * 0.35 + 0.25,
      baseBlur: Math.random() * 16 + 22,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.012 + 0.006
    });
  }
  const siteHeader = document.querySelector('.site-header');
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 1;
    const topClip = siteHeader ? Math.max(0, siteHeader.getBoundingClientRect().bottom) : 0;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, topClip, canvas.width, canvas.height);
    ctx.clip();
    for (const p of particles) {
      const pulse = Math.sin(t * p.pulseSpeed + p.phase);
      const opacity = p.baseOpacity + pulse * 0.15;
      const blur = p.baseBlur + pulse * 10;
      ctx.shadowColor = 'rgba(56, 210, 56, 0.85)';
      ctx.shadowBlur = blur;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 200, 56, ${Math.max(0.08, opacity)})`;
      ctx.fill();
      ctx.shadowBlur = 0;
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y + p.r < 0) { p.y = canvas.height + p.r; p.x = Math.random() * canvas.width; }
      if (p.x < -p.r) p.x = canvas.width + p.r;
      if (p.x > canvas.width + p.r) p.x = -p.r;
    }
    ctx.restore();
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Header collapse (FLIP so nav items slide rather than teleport) ── */
(function () {
  var hdr = document.querySelector('.site-header');
  if (!hdr) return;
  var navAs = Array.from(hdr.querySelectorAll('.site-nav a'));
  var title = hdr.querySelector('.site-title');
  var tagline = hdr.querySelector('.site-tagline');
  var cooling = false;
  function flipNav(compact) {
    cooling = true;
    hdr.style.overflow = 'hidden';
    if (tagline) {
      tagline.style.transition = 'none';
      tagline.style.opacity = '0';
      tagline.style.maxHeight = '0';
      tagline.style.margin = '0';
      tagline.style.flex = '0 0 0';
      tagline.style.minWidth = '0';
    }
    navAs.forEach(function(a) { a.style.transition = 'none'; a.style.transform = ''; });
    if (title) { title.style.transition = 'none'; title.style.transform = ''; }
    var firsts = navAs.map(function(a) { return a.getBoundingClientRect(); });
    var tFirst = title ? title.getBoundingClientRect() : null;
    hdr.classList.toggle('header-compact', compact);
    navAs.forEach(function(a, i) {
      var vw = window.innerWidth || document.documentElement.clientWidth;
      var raw = firsts[i].left - a.getBoundingClientRect().left;
      var clamped = Math.max(-vw, Math.min(vw, raw));
      a.style.transform = 'translateX(' + clamped.toFixed(1) + 'px)';
    });
    if (title && tFirst) {
      var tLast = title.getBoundingClientRect();
      title.style.transform = 'translateX(' + (tFirst.left - tLast.left).toFixed(1) + 'px) translateY(' + (tFirst.top - tLast.top).toFixed(1) + 'px)';
    }
    if (navAs.length) navAs[0].offsetHeight; else if (title) title.offsetHeight;
    var ease = '0.4s cubic-bezier(0.42, 0, 0.58, 1)';
    navAs.forEach(function(a) { a.style.transition = 'transform ' + ease; a.style.transform = ''; });
    if (title) { title.style.transition = 'transform ' + ease; title.style.transform = ''; }
    var done = false;
    function cleanup() {
      if (done) return; done = true;
      hdr.style.overflow = '';
      navAs.forEach(function(a) { a.style.transition = ''; a.style.transform = ''; });
      if (title) { title.style.transition = ''; title.style.transform = ''; }
      if (tagline) {
        tagline.style.transition = '';
        tagline.style.flex = '';
        tagline.style.minWidth = '';
        if (!compact) {
          requestAnimationFrame(function() {
            tagline.style.opacity = '';
            tagline.style.maxHeight = '';
            tagline.style.margin = '';
          });
        } else {
          tagline.style.opacity = '';
          tagline.style.maxHeight = '';
          tagline.style.margin = '';
        }
      }
      cooling = false;
    }
    if (navAs.length) {
      navAs[0].addEventListener('transitionend', function h() {
        navAs[0].removeEventListener('transitionend', h);
        cleanup();
      });
    }
    setTimeout(cleanup, 500);
  }
  window.addEventListener('scroll', function () {
    if (cooling) return;
    var c = window.scrollY > 10;
    if (hdr.classList.contains('header-compact') !== c) flipNav(c);
  }, { passive: true });
  if (window.scrollY > 10) hdr.classList.add('header-compact');
}());

/* ── Header blip sweep ── */
(function () {
  var hdr = document.querySelector('.site-header');
  if (!hdr) return;
  var CYCLE = 10000, IDLE = 0.425, FADE = 0.05;
  function ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }
  function tick(ts) {
    var p = (ts % CYCLE) / CYCLE, tx, alpha, spread;
    if (p <= IDLE || p >= 1 - IDLE) {
      tx = p <= IDLE ? -100 : 900;
      alpha = 0; spread = 20;
    } else {
      var t = (p - IDLE) / (1 - 2 * IDLE);
      tx = -100 + ease(t) * 1000;
      alpha = t < FADE ? t / FADE : t > 1 - FADE ? (1 - t) / FADE : 1;
      var vel = (t < 0.5 ? 4*t : 4 - 4*t) / 2;
      spread = 22 + vel * 50;
    }
    hdr.style.setProperty('--blip-tx', tx.toFixed(1));
    hdr.style.setProperty('--blip-alpha', alpha.toFixed(3));
    hdr.style.setProperty('--blip-pct', (0.12 * tx + 6).toFixed(1) + '%');
    hdr.style.setProperty('--blip-spread', spread.toFixed(1) + '%');
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ── Nav edge fades + rubber-band bounce ── */
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;
  function updateFades() {
    var left = nav.scrollLeft;
    var max = nav.scrollWidth - nav.clientWidth;
    nav.style.setProperty('--fade-l', (max > 0 && left > 2) ? '7%' : '0%');
    nav.style.setProperty('--fade-r', (max > 0 && left < max - 2) ? '7%' : '0%');
  }
  window.addEventListener('resize', function() { requestAnimationFrame(updateFades); });
  requestAnimationFrame(updateFades);
  var rubber = 0, bouncing = false;
  var prevLeft = nav.scrollLeft, vel = 0;
  function doSpring(amount) {
    bouncing = true;
    nav.style.transition = 'none';
    nav.style.transform = 'translateX(' + amount.toFixed(1) + 'px)';
    requestAnimationFrame(function() {
      nav.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      nav.style.transform = '';
      setTimeout(function() { bouncing = false; nav.style.transition = ''; }, 560);
    });
  }
  function release() {
    if (rubber === 0) return;
    rubber = 0;
    nav.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    nav.style.transform = '';
    setTimeout(function() { nav.style.transition = ''; }, 560);
  }
  nav.addEventListener('scroll', function() {
    var left = nav.scrollLeft;
    var max = nav.scrollWidth - nav.clientWidth;
    var delta = left - prevLeft;
    vel = vel * 0.4 + delta * 0.6;
    if (!bouncing && rubber === 0) {
      if (left <= 0 && prevLeft > 1 && vel < -4) {
        doSpring(Math.min(-vel * 0.55, 28));
      } else if (max > 0 && left >= max - 1 && prevLeft < max - 1 && vel > 4) {
        doSpring(Math.max(-vel * 0.55, -28));
      }
    }
    prevLeft = left;
    updateFades();
  }, { passive: true });
  nav.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaX) < 1) return;
    var max = nav.scrollWidth - nav.clientWidth;
    if (max <= 0) return;
    var atStart = nav.scrollLeft <= 0;
    var atEnd = nav.scrollLeft >= max - 1;
    if ((atStart && e.deltaX < 0) || (atEnd && e.deltaX > 0)) {
      e.preventDefault();
      rubber -= e.deltaX * 0.25;
      rubber = Math.max(-28, Math.min(28, rubber));
      nav.style.transition = 'none';
      nav.style.transform = 'translateX(' + rubber.toFixed(1) + 'px)';
    } else {
      release();
    }
  }, { passive: false });
  nav.addEventListener('mouseleave', release);
}());
