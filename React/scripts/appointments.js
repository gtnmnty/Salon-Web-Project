function setTab(el, status) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  const cards = document.querySelectorAll('.appt-card');
  let visible = 0;
  cards.forEach(c => {
    const s = c.dataset.status;
    const show = status === 'all' || s === status;
    c.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('emptyState').style.display = visible === 0 ? 'block' : 'none';
}