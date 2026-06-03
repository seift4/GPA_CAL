
// ── State ──
let termCount = 0;
let subjectCount = 0;
let currentMode = 'sgpa';
let lang = 'en';
let theme = 'dark';

// Standard 4.0 Scale Grade Points Map
const gradePoints = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

const T = {
  en: {
    logo: '⬡ GPA Calc',
    tabCgpa: 'Cumulative GPA',
    tabSgpa: 'Semester GPA (Grades)',
    badgeCgpa: 'Cumulative GPA Calculator',
    badgeSgpa: 'Semester GPA Calculator',
    h1mainCgpa: 'Calculate Your',
    h1subCgpa: 'Cumulative GPA',
    h1mainSgpa: 'Calculate Your',
    h1subSgpa: 'Semester GPA',
    descCgpa: "Add each term's GPA and credit hours. The calculator uses weighted average to find your true cumulative GPA.",
    descSgpa: "Enter your semester subjects, select letter grades (A+, A, B...) and credit hours to instantly check your semester performance.",
    terms: 'TERMS',
    subjects: 'SUBJECTS',
    addTermBtn: '+ Add Term',
    addSubjBtn: '+ Add Subject',
    calcBtn: 'Calculate GPA',
    resetBtn: '✕ Reset',
    gpaLabel: 'GPA',
    hoursLabel: 'Credit Hours',
    termLabel: 'TERM',
    subjNameLabel: 'Subject Name',
    subjGradeLabel: 'Grade',
    subjPlaceholder: 'e.g. Math 1',
    resGpaCgpa: 'Cumulative GPA',
    resGpaSgpa: 'Semester GPA',
    resCountCgpa: 'Terms',
    resCountSgpa: 'Subjects',
    resHours: 'Total Hours',
    resGrade: 'Letter Grade',
    breakdown: 'CALCULATION BREAKDOWN',
    formulaLabel: 'HOW IT WORKS',
    formulaCgpa: 'Cumulative GPA = <span>Σ(GPA × Hours)</span> ÷ <span>Σ(Hours)</span><br>Each term is weighted by its credit hours.<br>More hours = more influence on your GPA.',
    formulaSgpa: 'Semester GPA = <span>Σ(Grade Points × Hours)</span> ÷ <span>Σ(Hours)</span><br>Each letter grade maps to specific standard scale points (+A/A=4.0, -A=3.7, +B=3.3...).',
    langBtn: 'عربي',
    themeLight: '☀ Light',
    themeDark: '☾ Dark',
    footerBy: 'Built by',
footerName: 'Eng. Seif Tarek'
  },
  ar: {
    logo: '⬡ حاسبة GPA',
    tabCgpa: 'المعدل التراكمي',
    tabSgpa: 'معدل الترم (بالتقديرات)',
    badgeCgpa: 'حاسبة المعدل التراكمي',
    badgeSgpa: 'حاسبة معدل الترم الحالي',
    h1mainCgpa: 'احسب',
    h1subCgpa: 'معدلك التراكمي',
    h1mainSgpa: 'احسب',
    h1subSgpa: 'معدل الترم',
    descCgpa: 'أدخل GPA وعدد الساعات لكل ترم. الحاسبة تستخدم المتوسط الموزون لحساب المعدل التراكمي الحقيقي.',
    descSgpa: 'أدخل مواد الترم الحالي، واختر التقدير الحرفي (+A, A, -B) وساعات كل مادة لحساب معدل الفصل الدراسي الإجمالي.',
    terms: 'الترمات',
    subjects: 'المواد الدراسية',
    addTermBtn: '+ إضافة ترم',
    addSubjBtn: '+ إضافة مادة',
    calcBtn: 'احسب المعدل',
    resetBtn: '✕ إعادة تعيين',
    gpaLabel: 'GPA الترم',
    hoursLabel: 'عدد الساعات',
    termLabel: 'ترم',
    subjNameLabel: 'اسم المادة',
    subjGradeLabel: 'التقدير',
    subjPlaceholder: 'مثال: رياضيات ١',
    resGpaCgpa: 'المعدل التراكمي',
    resGpaSgpa: 'معدل الترم',
    resCountCgpa: 'عدد الترمات',
    resCountSgpa: 'عدد المواد',
    resHours: 'مجموع الساعات',
    resGrade: 'التقدير الإجمالي',
    breakdown: 'تفاصيل الحساب',
    formulaLabel: 'طريقة الحساب',
    formulaCgpa: 'التراكمي = <span>مجموع (GPA × الساعات)</span> ÷ <span>مجموع الساعات</span><br>كل ترم بوزنه الإجمالي حسب عدد ساعاته.',
    formulaSgpa: 'معدل الترم = <span>مجموع (نقاط المادة × ساعاتها)</span> ÷ <span>مجموع الساعات الكلي</span><br>التقديرات تحول لنقاط (+A=4, -A=3.7, +B=3.3).',
    langBtn: 'English',
    themeLight: '☀ فاتح',
    themeDark: '☾ داكن',
    footerBy: 'تطوير وتصميم',
footerName: 'المستشار / سيف طارق'
  }
};

// ── Init ──
function init() {
  for(let i=0; i<3; i++) addTerm();
  for(let i=0; i<4; i++) addSubject();
  setupParticles();
  setupTilt();

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown')) {
      document.querySelectorAll('.custom-dropdown').forEach(d => d.classList.remove('open'));
    }
  });
}

// ── View Switching ──
function switchMode(mode) {
  currentMode = mode;
  document.getElementById('tab-cgpa').classList.toggle('active', mode === 'cgpa');
  document.getElementById('tab-sgpa').classList.toggle('active', mode === 'sgpa');
  
  document.getElementById('view-cgpa').classList.toggle('active', mode === 'cgpa');
  document.getElementById('view-sgpa').classList.toggle('active', mode === 'sgpa');

  document.getElementById('result-panel').classList.remove('visible');
  document.getElementById('breakdown').classList.remove('visible');

  applyTranslations();
}

// ── Add/Delete Term (Cumulative Mode) ──
function addTerm() {
  termCount++;
  const list = document.getElementById('terms-list');
  const t = T[lang];
  const row = document.createElement('div');
  row.className = 'term-row';
  row.id = `term-${termCount}`;
  row.style.animationDelay = `${(termCount-1)*0.05}s`;
  row.innerHTML = `
    <div class="term-label">${t.termLabel} ${termCount}</div>
    <div class="input-group">
      <div class="input-label">${t.gpaLabel}</div>
      <input type="number" id="gpa-${termCount}" min="0" max="4" step="0.01" placeholder="0.00 – 4.00">
    </div>
    <div class="input-group">
      <div class="input-label">${t.hoursLabel}</div>
      <input type="number" id="hrs-${termCount}" min="1" max="30" step="1" placeholder="e.g. 18">
    </div>
    <button class="delete-btn" onclick="deleteRow('term', ${termCount})" title="Delete">✕</button>
  `;
  list.appendChild(row);
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(`dropdown-${id}`);
  const currentRow = document.getElementById(`subject-${id}`); // بنجيب الصف الحالي للمادة
  
  // أولاً: بنقفل أي قوائم تانية مفتوحة ونرجع ترتيب صفوفها طبيعي
  document.querySelectorAll('.custom-dropdown').forEach(d => {
    if (d.id !== `dropdown-${id}`) {
      d.classList.remove('open');
      const rowId = d.id.split('-')[1];
      const otherRow = document.getElementById(`subject-${rowId}`);
      if(otherRow) otherRow.style.zIndex = "1"; 
    }
  });
  
  // ثانياً: بنفتح القائمة الحالية أو نقفلها ونغير الـ z-index بناءً على كده
  dropdown.classList.toggle('open');
  
  if (dropdown.classList.contains('open')) {
    currentRow.style.zIndex = "9999"; // بنرفع الصف كلو فوق كل الصفوف التانية
  } else {
    currentRow.style.zIndex = "1"; // بنرجعه طبيعي لما تقفل
  }
}
function selectOption(id, grade) {
  const dropdown = document.getElementById(`dropdown-${id}`);
  const triggerText = dropdown.querySelector('.dropdown-trigger-text');
  const hiddenInput = document.getElementById(`subj-grade-${id}`);
  
  hiddenInput.value = grade;
  triggerText.textContent = `${grade} (${gradePoints[grade].toFixed(1)})`;
  
  dropdown.querySelectorAll('.dropdown-option').forEach(opt => {
    opt.classList.toggle('selected', opt.getAttribute('data-value') === grade);
  });
  
  dropdown.classList.remove('open');
}

// ── Add/Delete Subject (Semester Mode) ──
function addSubject() {
  subjectCount++;
  const list = document.getElementById('subjects-list');
  const t = T[lang];
  const row = document.createElement('div');
  row.className = 'subject-row';
  row.id = `subject-${subjectCount}`;
  row.style.animationDelay = `${(subjectCount-1)*0.05}s`;
  
  let optionsHtml = Object.keys(gradePoints).map((g, idx) => `
    <div class="dropdown-option ${idx === 0 ? 'selected' : ''}" data-value="${g}" onclick="selectOption(${subjectCount}, '${g}')">
      <span>${g}</span>
      <span class="opt-points">${gradePoints[g].toFixed(1)}</span>
    </div>
  `).join('');

  row.innerHTML = `
    <div class="subject-label"># ${subjectCount}</div>
    <div class="input-group">
      <div class="input-label">${t.subjNameLabel}</div>
      <input type="text" id="subj-name-${subjectCount}" placeholder="${t.subjPlaceholder}">
    </div>
    <div class="input-group">
      <div class="input-label">${t.subjGradeLabel}</div>
      
      <div class="custom-dropdown" id="dropdown-${subjectCount}">
        <div class="dropdown-trigger" onclick="toggleDropdown(${subjectCount})">
          <span class="dropdown-trigger-text">A+ (4.0)</span>
        </div>
        <div class="dropdown-menu">
          ${optionsHtml}
        </div>
      </div>
      <input type="hidden" id="subj-grade-${subjectCount}" value="A+">

    </div>
    <div class="input-group">
      <div class="input-label">${t.hoursLabel}</div>
      <input type="number" id="subj-hrs-${subjectCount}" min="1" max="10" step="1" placeholder="3">
    </div>
    <button class="delete-btn" onclick="deleteRow('subject', ${subjectCount})" title="Delete">✕</button>
  `;
  list.appendChild(row);
}

function deleteRow(type, id) {
  const el = document.getElementById(`${type}-${id}`);
  if (el) {
    el.style.animation = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px) scale(0.95)';
    el.style.transition = 'all 0.2s ease';
    setTimeout(() => {
      el.remove();
      reindexLabels(type);
    }, 200);
  }
}

function reindexLabels(type) {
  const t = T[lang];
  if(type === 'term') {
    document.querySelectorAll('.term-row').forEach((row, idx) => {
      row.querySelector('.term-label').textContent = `${t.termLabel} ${idx + 1}`;
    });
  } else {
    document.querySelectorAll('.subject-row').forEach((row, idx) => {
      row.querySelector('.subject-label').textContent = `# ${idx + 1}`;
    });
  }
}

function resetAll() {
  document.getElementById('result-panel').classList.remove('visible');
  document.getElementById('breakdown').classList.remove('visible');
  if(currentMode === 'cgpa') {
    document.getElementById('terms-list').innerHTML = '';
    termCount = 0;
    setTimeout(() => { addTerm(); addTerm(); addTerm(); }, 50);
  } else {
    document.getElementById('subjects-list').innerHTML = '';
    subjectCount = 0;
    setTimeout(() => { addSubject(); addSubject(); addSubject(); addSubject(); }, 50);
  }
}

function calculate() {
  if (currentMode === 'cgpa') {
    calculateCumulative();
  } else {
    calculateSemester();
  }
}

function calculateCumulative() {
  const rows = document.querySelectorAll('.term-row');
  let totalWeighted = 0, totalHours = 0, validCount = 0;
  const breakdownData = [];

  rows.forEach(row => {
    const id = row.id.split('-')[1];
    const gpaEl = document.getElementById(`gpa-${id}`);
    const hrsEl = document.getElementById(`hrs-${id}`);
    if (!gpaEl || !hrsEl) return;
    const gpa = parseFloat(gpaEl.value);
    const hrs = parseFloat(hrsEl.value);
    
    if (!isNaN(gpa) && !isNaN(hrs) && hrs > 0 && gpa >= 0 && gpa <= 4) {
      totalWeighted += gpa * hrs;
      totalHours += hrs;
      validCount++;
      breakdownData.push({ label: `${T[lang].termLabel} ${validCount}`, gpa, hrs, weighted: gpa * hrs });
      gpaEl.style.borderColor = 'var(--accent3)';
      hrsEl.style.borderColor = 'var(--accent3)';
    } else if (gpaEl.value || hrsEl.value) {
      gpaEl.style.borderColor = 'var(--accent2)';
      hrsEl.style.borderColor = 'var(--accent2)';
    }
  });

  renderOutput(validCount, totalWeighted, totalHours, breakdownData);
}

function calculateSemester() {
  const rows = document.querySelectorAll('.subject-row');
  let totalWeighted = 0, totalHours = 0, validCount = 0;
  const breakdownData = [];

  rows.forEach(row => {
    const id = row.id.split('-')[1];
    const nameEl = document.getElementById(`subj-name-${id}`);
    const gradeEl = document.getElementById(`subj-grade-${id}`);
    const hrsEl = document.getElementById(`subj-hrs-${id}`);
    if (!gradeEl || !hrsEl) return;
    
    const gradeLetter = gradeEl.value;
    const gpa = gradePoints[gradeLetter];
    const hrs = parseFloat(hrsEl.value);
    const name = nameEl.value.trim() || `${T[lang].resCountSgpa.slice(0,-1)} ${validCount+1}`;

    if (!isNaN(hrs) && hrs > 0) {
      totalWeighted += gpa * hrs;
      totalHours += hrs;
      validCount++;
      breakdownData.push({ label: name, gpa, hrs, weighted: gpa * hrs, letter: gradeLetter });
      hrsEl.style.borderColor = 'var(--accent3)';
    } else if (hrsEl.value) {
      hrsEl.style.borderColor = 'var(--accent2)';
    }
  });

  renderOutput(validCount, totalWeighted, totalHours, breakdownData);
}

function renderOutput(validCount, totalWeighted, totalHours, breakdownData) {
  if (validCount === 0) { shakeCard(); return; }

  const finalGPA = totalHours > 0 ? totalWeighted / totalHours : 0;
  const letterGrade = getLetterGrade(finalGPA);

  animateValue('res-gpa', finalGPA.toFixed(2));
  animateValue('res-count', validCount);
  animateValue('res-hours', totalHours);
  document.getElementById('res-grade').textContent = letterGrade;

  const pct = Math.min((finalGPA / 4) * 100, 100);
  setTimeout(() => { document.getElementById('grade-fill').style.width = pct + '%'; }, 100);

  document.getElementById('result-panel').classList.add('visible');

  const br = document.getElementById('breakdown-rows');
  br.innerHTML = breakdownData.map(d => `
    <div class="breakdown-row">
      <span class="br-term">${d.label} ${d.letter ? `(${d.letter})` : ''}</span>
      <span class="br-calc">${d.gpa.toFixed(2)} × ${d.hrs} = ${d.weighted.toFixed(2)}</span>
      <span class="br-val">${d.gpa.toFixed(2)}</span>
    </div>
  `).join('') + `
    <div class="breakdown-row" style="border-top:1px solid var(--border);margin-top:0.5rem;padding-top:0.8rem;background:var(--surface3)">
      <span class="br-term" style="color:var(--text);font-weight:700">${T[lang][currentMode === 'cgpa' ? 'resGpaCgpa' : 'resGpaSgpa']}</span>
      <span class="br-calc">${totalWeighted.toFixed(2)} ÷ ${totalHours} = ${finalGPA.toFixed(4)}</span>
      <span class="br-val" style="color:var(--accent);font-size:1rem">${finalGPA.toFixed(2)}</span>
    </div>
  `;
  document.getElementById('breakdown').classList.add('visible');
}

function getLetterGrade(gpa) {
  if (gpa >= 3.85) return 'A+';
  if (gpa >= 3.65) return 'A';
  if (gpa >= 3.45) return 'A-';
  if (gpa >= 3.25) return 'B+';
  if (gpa >= 2.85) return 'B';
  if (gpa >= 2.45) return 'B-';
  if (gpa >= 2.15) return 'C+';
  if (gpa >= 1.85) return 'C';
  if (gpa >= 1.45) return 'C-';
  if (gpa >= 0.95) return 'D';
  return 'F';
}

// Animation
function animateValue(id, target) {
  const el = document.getElementById(id);
  const isFloat = String(target).includes('.');
  const end = parseFloat(target);
  const start = parseFloat(el.textContent) || 0;
  const duration = 500;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = start + (end - start) * ease;
    el.textContent = isFloat ? val.toFixed(2) : Math.round(val);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function shakeCard() {
  const card = document.getElementById('main-card');
  card.style.animation = 'none'; card.style.transform = 'translateX(-8px)';
  setTimeout(() => card.style.transform = 'translateX(8px)', 80);
  setTimeout(() => card.style.transform = 'translateX(-5px)', 160);
  setTimeout(() => card.style.transform = 'translateX(5px)', 240);
  setTimeout(() => card.style.transform = 'translateX(0)', 320);
}

// Language
function toggleLang() {
  lang = lang === 'en' ? 'ar' : 'en';
  document.documentElement.setAttribute('data-lang', lang);
  applyTranslations();
}

function applyTranslations() {
  const t = T[lang];
  document.getElementById('logo-text').textContent = t.logo;
  document.getElementById('lang-btn').textContent = t.langBtn;
  document.getElementById('tab-cgpa').textContent = t.tabCgpa;
  document.getElementById('tab-sgpa').textContent = t.tabSgpa;
  
  if (currentMode === 'cgpa') {
    document.getElementById('badge-text').textContent = t.badgeCgpa;
    document.getElementById('h1-main').textContent = t.h1mainCgpa;
    document.getElementById('h1-sub').textContent = t.h1subCgpa;
    document.getElementById('hero-desc').textContent = t.descCgpa;
    document.getElementById('res-gpa-label').textContent = t.resGpaCgpa;
    document.getElementById('res-count-label').textContent = t.resCountCgpa;
    document.getElementById('formula-text').innerHTML = t.formulaCgpa;
  } else {
    document.getElementById('badge-text').textContent = t.badgeSgpa;
    document.getElementById('h1-main').textContent = t.h1mainSgpa;
    document.getElementById('h1-sub').textContent = t.h1subSgpa;
    document.getElementById('hero-desc').textContent = t.descSgpa;
    document.getElementById('res-gpa-label').textContent = t.resGpaSgpa;
    document.getElementById('res-count-label').textContent = t.resCountSgpa;
    document.getElementById('formula-text').innerHTML = t.formulaSgpa;
  }

  document.getElementById('terms-label').textContent = t.terms;
  document.getElementById('subjects-label').textContent = t.subjects;
  document.getElementById('add-term-btn').textContent = t.addTermBtn;
  document.getElementById('add-subj-btn').textContent = t.addSubjBtn;
  document.getElementById('calc-label').textContent = t.calcBtn;
  document.getElementById('reset-btn').innerHTML = t.resetBtn;
  document.getElementById('res-hours-label').textContent = t.resHours;
  document.getElementById('res-grade-label').textContent = t.resGrade;
  document.getElementById('breakdown-label').textContent = t.breakdown;
  document.getElementById('formula-label').textContent = t.formulaLabel;

  reindexLabels('term');
  reindexLabels('subject');
}

function toggleTheme() {
  theme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-btn').textContent = theme === 'dark' ? T[lang].themeLight : T[lang].themeDark;
}

function setupTilt() {
  const card = document.getElementById('main-card');
  const wrapper = card.parentElement;
  wrapper.addEventListener('mousemove', e => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateX(${(-y / rect.height) * 5}deg) rotateY(${(x / rect.width) * 5}deg) translateZ(10px)`;
  });
  wrapper.addEventListener('mouseleave', () => card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)');
}

function setupParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    p.style.background = ['var(--accent)', 'var(--accent2)', 'var(--accent3)'][Math.floor(Math.random() * 3)];
    container.appendChild(p);
  }
}

window.addEventListener('DOMContentLoaded', init);