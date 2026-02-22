// ─── TAB SWITCHING ──────────────────────────────────────────────
function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── DARK MODE ───────────────────────────────────────────────────
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('dk-icon').textContent  = isDark ? '🌙' : '☀️';
  document.getElementById('dk-label').textContent = isDark ? 'Dark Mode' : 'Light Mode';
  localStorage.setItem('pathready-theme', isDark ? 'light' : 'dark');
}

// Load saved theme on page load
(function initTheme() {
  const saved = localStorage.getItem('pathready-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('dk-icon').textContent  = '☀️';
    document.getElementById('dk-label').textContent = 'Light Mode';
  }
})();

// ─── GRADE FILTER ────────────────────────────────────────────────
function filterGrade(grade, btn) {
  document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.grade-section').forEach(s => {
    if (grade === 'all' || s.dataset.grade === grade) {
      s.classList.add('visible');
    } else {
      s.classList.remove('visible');
    }
  });
}

// ─── CHECKLIST PERSISTENCE ───────────────────────────────────────
function saveChecklist() {
  const boxes = document.querySelectorAll('.checklist input[type="checkbox"]:not([disabled])');
  const state = {};
  boxes.forEach(box => {
    if (box.id) state[box.id] = box.checked;
  });
  localStorage.setItem('pathready-checks', JSON.stringify(state));
}

function loadChecklist() {
  const saved = JSON.parse(localStorage.getItem('pathready-checks') || '{}');
  Object.entries(saved).forEach(([id, checked]) => {
    const el = document.getElementById(id);
    if (el) {
      el.checked = checked;
      if (checked) el.closest('li')?.classList.add('checked');
    }
  });
}

// Attach change listeners to all interactive checkboxes
document.querySelectorAll('.checklist input[type="checkbox"]:not([disabled])').forEach(box => {
  box.addEventListener('change', function () {
    const li = this.closest('li');
    if (this.checked) li?.classList.add('checked');
    else li?.classList.remove('checked');
    saveChecklist();
  });
});

loadChecklist();
