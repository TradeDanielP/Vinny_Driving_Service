document.addEventListener("DOMContentLoaded", function () {

    function configureMapElements() {
        const buttonsClear = document.querySelectorAll(".geocoder-pin-right button");
        buttonsClear.forEach(button => {
            button.type = 'button';
        });

        const buttonReverse = document.querySelector(".directions-icon-reverse");
        if (buttonReverse) {
            buttonReverse.type = 'button';
        }

        const pickUpAddressInput = document.querySelector('#mapbox-directions-origin-input input');
        if (pickUpAddressInput) {
            pickUpAddressInput.required = true;
        }

        const dropOffAddressInput = document.querySelector('#mapbox-directions-destination-input input');
        if (dropOffAddressInput) {
            dropOffAddressInput.required = true;
        }
    }

    // Observador de mutaciones para detectar cambios en el DOM
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                configureMapElements();
            }
        });
    });

    // Configuración del observador de mutaciones
    const config = { childList: true, subtree: true };
    observer.observe(document.getElementById('map'), config);

    document.querySelector("#reserveForm").addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        
        // Validar el formulario antes de continuar
        const form = document.getElementById('form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return; // Detener si el formulario no es válido
        }
        
        // Obtén los valores del formulario
        const pickUpAddress = document.querySelector('#mapbox-directions-origin-input input').value;
        const dropOffAddress = document.querySelector('#mapbox-directions-destination-input input').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;
        const pickUpDate = document.getElementById('pickUpDate').value;
        const pickUpTime = document.getElementById('pick-up-time').value;
        const selectPassengers = document.getElementById('selectPassengers').value;
        const additionalRemarks = document.getElementById('additionalRemarks').value;

        // Parámetros para enviar correo al cliente
        const paramsClient = {
            name: name,
            address1: pickUpAddress,
            address2: dropOffAddress,
            date: pickUpDate,
            time: pickUpTime,
            passengers: selectPassengers,
            email: email
        };

        // Parámetros para enviar correo a tu dirección de correo electrónico
        const paramsYours = {
            name: name,
            phone: tel,
            email: email,
            note: additionalRemarks,
            address1: pickUpAddress,
            address2: dropOffAddress,
            date: pickUpDate,
            time: pickUpTime,
            passengers: selectPassengers
        };
  
        // Llamar a la función de EmailJS para enviar el correo al cliente
        const sendClientEmail = emailjs.send('service_proof', 'template_clientConfirm', paramsClient);

        // Llamar a la función de EmailJS para enviar el correo a tu dirección de correo electrónico
        const sendYourEmail = emailjs.send('service_proof', 'template_reserve', paramsYours);

       // Promesa para enviar ambos correos
       Promise.all([sendClientEmail, sendYourEmail])
       .then(function (responses) {
           console.log('Correos enviados con éxito:', responses);
           Swal.fire({
               title: "Well done",
               text: "successfully booked trip",
               icon: "success",
               allowOutsideClick: false, // Evitar que el usuario cierre el modal haciendo clic fuera de él
               showCancelButton: false, // Ocultar el botón Cancelar
               confirmButtonText: "OK", // Personalizar el texto del botón de confirmación
           }).then(() => {
               resetForm(); // Reiniciar el formulario después de enviar los correos
               location.reload(); // Recargar la página
           });
       })
       .catch(function (errors) {
           console.error('Error al enviar los correos:', errors);
           Swal.fire({
               icon: "error",
               title: "Oops...",
               text: "Something went wrong! please try again.",
             });
       });
});
});

function resetForm() {
document.getElementById('form').reset(); // Restablece todos los campos del formulario
}