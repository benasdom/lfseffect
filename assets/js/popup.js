// ─────────────────────────────────────────
//  REVIEW POPUP  —  paste at bottom of main.js
// ─────────────────────────────────────────

(function () {
  const overlay  = document.getElementById('reviewOverlay');
  const closeBtn = document.getElementById('reviewClose');
  const submitBtn= document.getElementById('rvSubmitBtn');

  const ratingHints = {
    1: 'Poor ★',
    2: 'Fair ★★',
    3: 'Good ★★★',
    4: 'Very Good ★★★★',
    5: 'Exceptional! ★★★★★'
  };

  // ── OPEN / CLOSE ──
  function openReview() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Reset to form view each time
    document.getElementById('reviewFormContent').style.display = '';
    document.getElementById('reviewSuccess').classList.remove('visible');
  }

  function closeReview() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeReview);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeReview();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeReview();
  });

  // ── HASH TRIGGER  (#feedback opens popup) ──
  function checkHash() {
    if (window.location.hash === '#feedback') openReview();
  }
  window.addEventListener('load', function () {
    setTimeout(checkHash, 400);
  });
  window.addEventListener('hashchange', checkHash);

  // ── STAR RATING ──
  let selectedRating = 0;
  const stars = document.querySelectorAll('#starRating .star');
  const ratingHint = document.getElementById('ratingHint');

  stars.forEach(function (star, idx) {
    star.addEventListener('mouseenter', function () {
      stars.forEach(function (s, i) {
        s.classList.toggle('active', i <= idx);
      });
      ratingHint.textContent = ratingHints[idx + 1];
    });
    star.addEventListener('mouseleave', function () {
      stars.forEach(function (s, i) {
        s.classList.toggle('active', i < selectedRating);
      });
      ratingHint.textContent = selectedRating ? ratingHints[selectedRating] : '';
    });
    star.addEventListener('click', function () {
      selectedRating = idx + 1;
      stars.forEach(function (s, i) {
        s.classList.toggle('active', i < selectedRating);
      });
      ratingHint.textContent = ratingHints[selectedRating];
    });
  });

  // ── SERVICE CHIPS ──
  document.querySelectorAll('.rc-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.classList.toggle('selected');
    });
  });

  // ── COMPLAINT SELECT ──
  document.getElementById('complaintSelect').addEventListener('change', function () {
    var box = document.getElementById('complaintOtherBox');
    box.style.display = this.value === 'other_complaint' ? 'block' : 'none';
  });

  // ── COMPLIMENT SELECT ──
  document.getElementById('complimentSelect').addEventListener('change', function () {
    var box = document.getElementById('complimentOtherBox');
    box.style.display = this.value === 'other_compliment' ? 'block' : 'none';
  });

  // ── SUBMIT ──
  submitBtn.addEventListener('click', function () {
    document.getElementById('reviewFormContent').style.display = 'none';
    document.getElementById('reviewSuccess').classList.add('visible');
    // Optionally send data to a backend or Google Form here
  });

  // ── EXPOSE openReview globally so nav/CTA buttons can call it ──
  window.openReviewPopup = openReview;

  // ── CURSOR hover support for new elements ──
  document.querySelectorAll('.rv-submit-btn, .review-close, .rc-chip, .star').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  });
})();