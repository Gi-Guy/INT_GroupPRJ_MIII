const STORAGE_KEY = 'workoutDates';
let dates: Set<string> = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

const iso = (d: Date) => d.toISOString().slice(0, 10);

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  renderMonth();
  renderYear();

  document.getElementById('markWorkout')!.addEventListener('click', () => {
    const today = iso(new Date());
    dates.add(today);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(dates)));
    renderMonth();
    renderYear();
  });
});

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === btn.getAttribute('data-tab')));
    });
  });
}

function renderMonth() {
  const container = document.querySelector('.month-grid')!;
  container.innerHTML = '';

  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();

  for (let i = 0; i < first; i++) container.append(document.createElement('div'));
  for (let d = 1; d <= days; d++) {
    const el = document.createElement('div');
    const ds = iso(new Date(y, m, d));
    el.textContent = String(d);
    el.classList.add('day');
    if (ds === iso(new Date())) el.classList.add('today');
    if (dates.has(ds)) el.classList.add('marked');
    container.append(el);
  }
}

function renderYear() {
  const year = new Date().getFullYear();
  const wrap = document.querySelector('.year-grid')!;
  wrap.innerHTML = '';

  for (let m = 0; m < 12; m++) {
    const block = document.createElement('div');
    block.className = 'month-block';

    const title = document.createElement('h4');
    title.textContent = new Date(year, m).toLocaleString('default', { month: 'long' });
    block.append(title);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid month-grid';

    const first = new Date(year, m, 1).getDay();
    const days = new Date(year, m + 1, 0).getDate();
    for (let i = 0; i < first; i++) grid.append(document.createElement('div'));
    for (let d = 1; d <= days; d++) {
      const el = document.createElement('div');
      const ds = iso(new Date(year, m, d));
      el.textContent = String(d);
      el.classList.add('day');
      if (dates.has(ds)) el.classList.add('marked');
      grid.append(el);
    }

    block.append(grid);
    wrap.append(block);
  }
}
