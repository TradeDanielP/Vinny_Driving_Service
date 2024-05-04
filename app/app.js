const fechaInput = document.getElementById('dateInput');

const fechaActual = new Date();

fechaInput.min = fechaActual.toISOString().split('T')[0];

