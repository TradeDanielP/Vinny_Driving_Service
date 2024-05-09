document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".submit-btn").addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Obtén los valores del formulario
        const pickUpLocation = document.getElementById('pickup-location-input').value;
        const dropOffLocation = document.getElementById('dropoff-location-input').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;
        const pickUpDate = document.getElementById('pickUpDate').value;
        const pickUpTime = document.getElementById('pick-up-time').value;
        const selectPassengers = document.getElementById('selectPassengers').value;
        const additionalRemarks = document.getElementById('additionalRemarks').value;
        
        // Parámetros para enviar correo al cliente
        const paramsCliente = {
            to_name: name,
            message: `
            Hola ${name}, gracias por reservar con nosotros. Su reserva ha sido confirmada.
            La fecha y hora de la reserva son: ${pickUpDate} y ${pickUpTime}.
            Tu lugar de recogida: ${pickUpLocation}.
            Lugar de destino: ${dropOffLocation}.
            Recuerda que solo pueden abordar: ${selectPassengers} pasajeros.
            `,
            from_name: 'Vinny Driving Professional Service',
            to_email: email
        };

        // Parámetros para enviar correo a tu dirección de correo electrónico
        const paramsTuyo = {
            from_name: 'Vinny Driving Professional Service',
            to_name: name,
            message: `
            Se ha realizado una nueva reserva en tu sitio web. 
            Nombre: ${name}, Correo electrónico: ${email}, Teléfono: ${tel},
            Dirección de recogida: ${pickUpLocation}, Dirección de Destino: ${dropOffLocation},
            Fecha de Recogida: ${pickUpDate}, Hora de Recogida: ${pickUpTime},
            Cantidad de Pasajeros: ${selectPassengers},
            Notas adicionales: ${additionalRemarks}
            `
        };

        // Llamar a la función de EmailJS para enviar el correo al cliente
        emailjs.send('service_proof', 'template_clientConfirm', paramsCliente)
            .then(function (response) {
                console.log('Correo al cliente enviado con éxito:', response);
                alert(`Se ha enviado un correo a su correo ingresado: ${email}`);
            }, function (error) {
                console.error('Error al enviar el correo al cliente:', error);
            });

        // Llamar a la función de EmailJS para enviar el correo a tu dirección de correo electrónico
        emailjs.send('service_proof', 'template_reserve', paramsTuyo)
            .then(function (response) {
                console.log('Correo a tu dirección enviado con éxito:', response);
                resetForm(); // Reiniciar el formulario después de enviar los correos
            }, function (error) {
                console.error('Error al enviar el correo a tu dirección:', error);
            });
    });
});

function resetForm() {
    document.getElementById("pickup-location-input").value = "";
    document.getElementById("dropoff-location-input").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("pickUpDate").value = "";
    document.getElementById("pick-up-time").value = "";
    document.getElementById("additionalRemarks").value = "";
}