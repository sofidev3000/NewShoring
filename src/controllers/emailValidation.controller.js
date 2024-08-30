/**
 * Valida los datos del formulario.
 * @param {HTMLFormElement} form - El formulario que contiene los campos a validar.
 * @returns {object} - Un objeto con los errores encontrados.
 */
function validateForm(form) {
    const email = form.querySelector('#email');
    const terms = form.querySelector('#terms');
    const errors = {};

    // Validar email con regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      errors.email = 'Por favor, ingresa un correo electrónico válido.';
    }

    // Validar checkbox
    if (!terms.checked) {
      errors.terms = 'Por favor, acepta los términos y condiciones.';
    }

    return errors;
  }

  /**
   * Maneja el evento blur para validar los campos del formulario.
   * @param {HTMLFormElement} form - El formulario que contiene los campos a validar.
   */
  function handleBlur(form) {
    const email = form.querySelector('#email');
    const terms = form.querySelector('#terms');
    const emailError = document.getElementById("email-error");
    const termsError = document.getElementById("terms-error");

    email.addEventListener('blur', function () {
      const errors = validateForm(form);
      emailError.textContent = errors.email || '';
      emailError.classList.toggle('hidden', !errors.email);
    });

    terms.addEventListener('blur', function () {
      const errors = validateForm(form);
      termsError.textContent = errors.terms || '';
      termsError.classList.toggle('hidden', !errors.terms);
    });
  }

  /**
   * Maneja el envío del formulario y muestra los mensajes de error.
   * @param {HTMLFormElement} form - El formulario que contiene los campos a validar.
   */
  function handleSubmit(form) {
    const emailError = document.getElementById("email-error");
    const termsError = document.getElementById("terms-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const errors = validateForm(form);

      // Mostrar errores
      emailError.textContent = errors.email || '';
      emailError.classList.toggle('hidden', !errors.email);
      termsError.textContent = errors.terms || '';
      termsError.classList.toggle('hidden', !errors.terms);

      if (Object.keys(errors).length === 0) {
        console.log('Email:', form.querySelector('#email').value);
        console.log('Terms Accepted:', form.querySelector('#terms').checked);


        form.submit();
      }
    });
  }

  // Exportar todas las funciones a la vez
  export { validateForm, handleBlur, handleSubmit };
