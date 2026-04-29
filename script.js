/* ============================================================
   LE CINQ — script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Header scroll ── */
  var header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
    // trigger on load
    header.classList.toggle('scrolled', window.scrollY > 30);
  }

  /* ── Hamburger ── */
  var burger   = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Scroll reveal ── */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    revealEls.forEach(function(el){ el.classList.add('pre'); });
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){
            e.target.classList.remove('pre');
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.06 });
      revealEls.forEach(function(el){ obs.observe(el); });
    }
    // Immediate reveal for items already in viewport
    setTimeout(function(){
      document.querySelectorAll('.reveal.pre').forEach(function(el){
        if (el.getBoundingClientRect().top < window.innerHeight + 60){
          el.classList.remove('pre');
          el.classList.add('in');
        }
      });
    }, 200);
  }

  /* ── Ripple on .btn-gold ── */
  document.querySelectorAll('.btn-gold').forEach(function(btn){
    btn.addEventListener('click', function(e){
      var r = document.createElement('span');
      var rect = this.getBoundingClientRect();
      r.style.cssText = 'position:absolute;width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.3);pointer-events:none;transform:translate(-50%,-50%) scale(0);animation:ripple .6s ease-out forwards;';
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top  = (e.clientY - rect.top)  + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(r);
      setTimeout(function(){ r.remove(); }, 700);
    });
  });

  /* ── Contact form ── */
  var form = document.querySelector('.contact-form-el');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = '✓ Message envoyé';
      btn.style.borderColor = '#6fcf97';
      btn.style.color = '#6fcf97';
      setTimeout(function(){
        btn.textContent = orig;
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }
});

/* ============================================================
   loadModel(posterEl)
   Called when user clicks the poster overlay.
   Sets data-src → src on model-viewer and hides the poster.
============================================================ */
function loadModel(posterEl) {
  var wrap = posterEl.closest('.dish-3d');
  if (!wrap) return;
  var mv = wrap.querySelector('model-viewer');
  if (mv && !mv.getAttribute('src')) {
    var glb = mv.getAttribute('data-src');
    if (glb) mv.setAttribute('src', glb);
  }
  posterEl.classList.add('hidden');
}

/* Add ripple keyframe */
(function(){
  var s = document.createElement('style');
  s.textContent = '@keyframes ripple{to{transform:translate(-50%,-50%) scale(60);opacity:0;}}';
  document.head.appendChild(s);
})();
