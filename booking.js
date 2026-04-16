function toggleFields() {
  const type = document.getElementById('serviceType').value;
  const walkin = document.getElementById('walkinSection');
  const address = document.getElementById('addressSection');

  if (type === 'home') {
    walkin.style.display = 'none';
    address.style.display = 'block';
  } else {
    walkin.style.display = 'block';
    address.style.display = 'none';
  }
}

document.getElementById('sameInfoCheck').addEventListener('change', function () {
  if (this.checked) {
    document.getElementById('fullName').value = "Jane Doe"; // Mock data
    document.getElementById('contactNo').value = "0917 123 4567";
    document.getElementById('street').value = "123 Aesthetic Blvd";
    document.getElementById('municipality').value = "Makati";
  }
});