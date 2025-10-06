document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Muestra un estado de "cargando" en el botón
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
                // Éxito: Muestra un mensaje y limpia el formulario
                alert('¡Mensaje enviado con éxito! Te responderé pronto.');
                form.reset();
            } else {
                // Error del servidor
                throw new Error('Hubo un problema al enviar el formulario.');
            }
        })
        .catch(error => {
            // Error de red o JS
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        })
        .finally(() => {
            // Restaura el botón a su estado original, haya éxito o error
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
});