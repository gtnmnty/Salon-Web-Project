/* ── Simulated account profile ── */
const profile = {
  name:  'Jon Snow',
  email: 'jdncanthtall8678@mail.com',
  phone: '09354334633',
  addr:  '123 Sample St, Quezon City, Metro Manila 1100'
};

/* ── Shipping autofill ── */
function fillShipping(cb) {
  const on = cb.checked;
  document.getElementById('sh-name').value  = on ? profile.name  : '';
  document.getElementById('sh-email').value = on ? profile.email : '';
  document.getElementById('sh-phone').value = on ? profile.phone : '';
  document.getElementById('sh-addr').value  = on ? profile.addr  : '';
}

/* ── Billing autofill (inside active pay panel) ── */
function fillBilling(cb) {
  const panel = cb.closest('.pay-panel');
  const on = cb.checked;
  const bn = panel.querySelector('.billing-name');
  const ba = panel.querySelector('.billing-addr');
  if (bn) bn.value = on ? profile.name : '';
  if (ba) ba.value = on ? (document.getElementById('sh-addr').value || profile.addr) : '';
}

/* ── Payment tabs ── */
function selectPay(method, btn) {
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('pay-' + method);
  if (panel) panel.classList.add('active');
}

/* ── Card number formatting ── */
function fmtCard(input) {
  let v = input.value.replace(/\D/g,'').slice(0,16);
  input.value = v.replace(/(.{4})/g,'$1 ').trim();
}
function fmtAmex(input) {
  let v = input.value.replace(/\D/g,'').slice(0,15);
  if (v.length > 10) v = v.slice(0,4)+' '+v.slice(4,10)+' '+v.slice(10);
  else if (v.length > 4) v = v.slice(0,4)+' '+v.slice(4);
  input.value = v;
}
function fmtExp(input) {
  let v = input.value.replace(/\D/g,'');
  if (v.length >= 2) v = v.slice(0,2)+' / '+v.slice(2,4);
  input.value = v;
}

/* ── Place Order ── */
function placeOrder() {
  showToast('🎉 Order placed! Thank you.');
}

/* ── Toast ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}