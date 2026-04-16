const profile = { name: 'Jon Snow', email: 'jdncanthtall8678@mail.com', phone: '09354334633', bday: '02-01-1500' };
let isLoggedIn = false;
let isEditing = false;

function navigate(page) {
	document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
	document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
	const el = document.getElementById('page-' + page);
	if (el) { el.classList.add('active'); }
	const navEl = document.getElementById('nav-' + page);
	if (navEl) navEl.classList.add('active');
}

function showPanel(id) {
	document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
	document.querySelectorAll('.sidebar-sub a').forEach(a => a.classList.remove('active'));
	document.querySelectorAll('.sidebar-label').forEach(l => l.classList.remove('active'));
	const panel = document.getElementById('panel-' + id);
	if (panel) panel.classList.add('active');
	document.querySelectorAll('.sidebar-sub a, .sidebar-label').forEach(el => {
		if (el.getAttribute('onclick') && el.getAttribute('onclick').includes("'" + id + "'")) el.classList.add('active');
	});
	if (id === 'appointments' || id === 'orders' || id === 'help') {
		document.querySelectorAll('.sidebar-label').forEach(l => {
			if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + id + "'")) l.classList.add('active');
		});
	}
}
function toggleGroup(el) { el.classList.toggle('active'); }

function toggleEdit() {
	if (!isEditing) startEdit(); else cancelEdit();
}
function startEdit() {
	isEditing = true;
	document.getElementById('account-content').classList.add('editing');
	document.getElementById('edit-btn').textContent = 'Cancel';
	document.getElementById('save-row').style.display = 'block';

	document.getElementById('inp-name').value = document.getElementById('val-name').textContent;
	document.getElementById('inp-email').value = document.getElementById('val-email').textContent;
	document.getElementById('inp-phone').value = document.getElementById('val-phone').textContent;
	document.getElementById('inp-bday').value = document.getElementById('val-bday').textContent;
	document.getElementById('inp-pass').value = '';
}
function cancelEdit() {
	isEditing = false;
	document.getElementById('account-content').classList.remove('editing');
	document.getElementById('edit-btn').textContent = 'Edit';
	document.getElementById('save-row').style.display = 'none';
}
function saveProfile() {
	const name = document.getElementById('inp-name').value.trim() || profile.name;
	const email = document.getElementById('inp-email').value.trim() || profile.email;
	const phone = document.getElementById('inp-phone').value.trim() || profile.phone;
	const bday = document.getElementById('inp-bday').value.trim() || profile.bday;

	document.getElementById('val-name').textContent = name;
	document.getElementById('val-email').textContent = email;
	document.getElementById('val-phone').textContent = phone;
	document.getElementById('val-bday').textContent = bday;
	document.getElementById('display-name').textContent = name;

	profile.name = name; profile.email = email; profile.phone = phone; profile.bday = bday;
	cancelEdit();
	showToast('Profile updated!');
}

/* ── Auth toggle ── */
function toggleAuth() {
	isLoggedIn = !isLoggedIn;
	document.getElementById('auth-btn').textContent = isLoggedIn ? 'Sign Out' : 'Sign In';
	showToast(isLoggedIn ? 'Signed in!' : 'Signed out.');
}

/* ── Delete modal ── */
function openDeleteModal() { document.getElementById('delete-modal').classList.add('open'); }
function closeDeleteModal() { document.getElementById('delete-modal').classList.remove('open'); }

/* ── Avatar upload ── */
document.getElementById('avatar-input').addEventListener('change', function () {
	const file = this.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = e => {
		const img = document.getElementById('avatar-img');
		img.src = e.target.result;
		img.style.display = 'block';
		img.previousElementSibling && (img.previousElementSibling.style.display = 'none');
		showToast('Profile photo updated!');
	};
	reader.readAsDataURL(file);
});

/* ── Preferences chips ── */
function toggleChip(chip) {
	const group = chip.dataset.single;
	if (group) {
		chip.closest('.pref-options').querySelectorAll('.pref-chip').forEach(c => c.classList.remove('selected'));
	}
	chip.classList.toggle('selected');
}
function savePreferences() { showToast('Preferences saved!'); }

/* ── Checkout: fill from account ── */
function fillShipping(cb) {
	if (cb.checked) {
		document.getElementById('sh-name').value = profile.name;
		document.getElementById('sh-email').value = profile.email;
		document.getElementById('sh-phone').value = profile.phone;
		document.getElementById('sh-addr').value = '123 Sample St, Quezon City';
	} else {
		['sh-name', 'sh-email', 'sh-phone', 'sh-addr'].forEach(id => document.getElementById(id).value = '');
	}
}
function fillBilling(cb) {
	if (cb.checked) {
		const biName = document.getElementById('bi-name');
		const biAddr = document.getElementById('bi-addr');
		if (biName) biName.value = profile.name;
		if (biAddr) biAddr.value = '123 Sample St, Quezon City';
	}
}

function selectPay(method, btn) {
	document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
	document.querySelectorAll('.pay-form').forEach(f => f.classList.remove('active'));
	btn.classList.add('active');
	const form = document.getElementById('pay-' + method);
	if (form) form.classList.add('active');
}

function formatCard(input) {
	let v = input.value.replace(/\D/g, '').substring(0, 16);
	input.value = v.replace(/(.{4})/g, '$1 ').trim();
}
function formatExp(input) {
	let v = input.value.replace(/\D/g, '');
	if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2, 4);
	input.value = v;
}

function placeOrder() { showToast('Order placed! Thank you.'); setTimeout(() => navigate('account'), 1500); }

function showToast(msg) {
	const t = document.getElementById('toast');
	t.textContent = msg;
	t.classList.add('show');
	setTimeout(() => t.classList.remove('show'), 2500);
}

document.getElementById('delete-modal').addEventListener('click', function (e) {
	if (e.target === this) closeDeleteModal();
});