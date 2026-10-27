/* ============================================================
   MY PHOTO STYLER — main.js
   All interactive functionality for the full website
   ============================================================ */

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ===== SINGLE-PAGE APP NAVIGATION ===== */
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  var page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.remove('active');
  });
  var navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initBaSliders, 100);
  return false;
}

/* Navigate to a service section within the services page */
function showService(sectionId) {
  showPage('services');
  setTimeout(function() {
    var el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    initBaSliders();
  }, 80);
  return false;
}

/* ===== BEFORE/AFTER SLIDERS ===== */
function initBaSliders() {
  document.querySelectorAll('.ba-wrap').forEach(function(wrap) {
    if (wrap._baInit) return;
    wrap._baInit = true;

    var before = wrap.querySelector('.ba-before');
    var handle = wrap.querySelector('.ba-handle');
    if (!before || !handle) return;

    var dragging = false;

    function setPos(pct) {
      pct = Math.max(5, Math.min(95, pct));
      before.style.width = pct + '%';
      handle.style.left  = pct + '%';
    }

    function getPct(e, el) {
      var rect = el.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return (x / rect.width) * 100;
    }

    handle.addEventListener('mousedown',  function(e) { dragging = true; e.preventDefault(); });
    handle.addEventListener('touchstart', function()  { dragging = true; }, { passive: true });
    wrap.addEventListener('mousemove',  function(e) { if (dragging) setPos(getPct(e, wrap)); });
    wrap.addEventListener('touchmove',  function(e) { if (dragging) setPos(getPct(e, wrap)); }, { passive: true });
    document.addEventListener('mouseup',  function() { dragging = false; });
    document.addEventListener('touchend', function() { dragging = false; });
    wrap.addEventListener('click', function(e) { setPos(getPct(e, wrap)); });
  });
}

/* ===== FAQ ACCORDION ===== */
function toggleFaq(el) {
  var item = el.parentElement;
  item.classList.toggle('open');
}

/* ===== PORTFOLIO FILTER ===== */
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.querySelectorAll('#portfolioGrid .portfolio-item').forEach(function(item) {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
  });
}

/* ===== PRICING TOGGLE (Photo / Video) ===== */
function togglePricing() {
  var track   = document.getElementById('pricingToggle');
  var photo   = document.getElementById('photoPricing');
  var video   = document.getElementById('videoPricing');
  if (!track) return;
  track.classList.toggle('on');
  var isVideo = track.classList.contains('on');
  if (photo) photo.style.display = isVideo ? 'none' : 'block';
  if (video) video.style.display = isVideo ? 'block' : 'none';
}

/* ===== ORDER FLOW ===== */
var currentStep       = 1;
var selectedService   = '';
var uploadedFileCount = 0;

function goToStep(n) {
  var prev = document.getElementById('orderStep' + currentStep);
  var next = document.getElementById('orderStep' + n);
  var prevDot = document.getElementById('ostep' + currentStep);
  var nextDot = document.getElementById('ostep' + n);

  if (prev) prev.style.display = 'none';
  if (prevDot) {
    prevDot.classList.remove('active');
    if (n > currentStep) prevDot.classList.add('done');
  }
  currentStep = n;
  if (next) next.style.display = 'block';
  if (nextDot) nextDot.classList.add('active');

  if (n === 4) {
    var sf = document.getElementById('summaryFiles');
    var ss = document.getElementById('summaryService');
    if (sf) sf.textContent = uploadedFileCount + ' file(s)';
    if (ss) ss.textContent = selectedService || 'Not selected';
  }
}

function selectService(el, name) {
  document.querySelectorAll('.service-option').forEach(function(o) {
    o.classList.remove('selected');
  });
  el.classList.add('selected');
  selectedService = name;
}

function handleFileSelect(e) {
  renderFiles(Array.from(e.target.files));
}

function handleFileDrop(e) {
  e.preventDefault();
  var box = document.getElementById('uploadBox');
  if (box) box.classList.remove('active');
  renderFiles(Array.from(e.dataTransfer.files));
}

function renderFiles(files) {
  var container = document.getElementById('uploadedFiles');
  if (!container) return;
  uploadedFileCount = files.length;
  container.innerHTML = files.map(function(f) {
    return '<div class="file-item">' +
      '<div class="file-ext">' + f.name.split('.').pop().toUpperCase().slice(0, 4) + '</div>' +
      '<div class="file-name">' + f.name + '</div>' +
      '<div class="file-size">' + (f.size / 1024 / 1024).toFixed(1) + ' MB</div>' +
      '<button class="file-remove" onclick="this.parentElement.remove();uploadedFileCount--">✕</button>' +
    '</div>';
  }).join('');
}

function submitOrder() {
  var step4 = document.getElementById('orderStep4');
  if (!step4) return;
  step4.innerHTML =
    '<div style="text-align:center;padding:48px 0">' +
    '<div style="font-size:72px;margin-bottom:16px">✅</div>' +
    '<h3 style="font-family:\'Syne\',sans-serif;font-size:1.5rem;font-weight:800;margin-bottom:10px;color:var(--green)">Order Submitted!</h3>' +
    '<p style="color:var(--muted);font-size:15px;max-width:400px;margin:0 auto 28px;line-height:1.7">We\'ve received your files. Expect a confirmation email and quote within 12 hours.</p>' +
    '<button class="btn-lg btn-blue" onclick="showPage(\'home\')" style="margin:0 auto">← Back to Home</button>' +
    '</div>';
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', function() {
  initBaSliders();
});
