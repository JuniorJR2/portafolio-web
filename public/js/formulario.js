document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    submitButton.innerHTML = 'Enviando...';
    submitButton.disabled = true;

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Éxito: Muestra SweetAlert de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Mensaje Enviado!',
                    text: 'Te responderé lo antes posible.',
                    timer: 3000, // Se cierra automáticamente después de 3 segundos
                    showConfirmButton: false
                });
                form.reset();
            } else {
                throw new Error('Hubo un problema al enviar el formulario.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Error: Muestra SweetAlert de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.',
            });
        })
        .finally(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
});