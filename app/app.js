const fechaInput = document.getElementById('pickUpDate');

const fechaActual = new Date();

fechaInput.min = fechaActual.toISOString().split('T')[0];

