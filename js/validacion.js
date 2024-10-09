document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('miFormulario');
    const inputs = form.querySelectorAll('input');
    

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(input.id) {
            case 'nombre':
            case 'apellido':
                isValid = value !== '';
                errorMessage = isValid ? '' : 'Este campo es requerido';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = isValid ? '' : 'Email inválido';
                break;
            case 'password1':
            case 'password2':
                isValid = value.length >= 6;
                errorMessage = isValid ? '' : 'La contraseña debe tener al menos 6 caracteres';
                if (input.id === 'password2' && isValid) {
                    const password1 = document.getElementById('password1');
                    isValid = value === password1.value;
                    errorMessage = isValid ? '' : 'Las contraseñas no coinciden';
                }
                break;
            case 'terminos':
                isValid = input.checked;
                errorMessage = isValid ? '' : 'Debes aceptar los términos';
                break;
        }

        setInputValidationState(input, isValid, errorMessage);
        return isValid;
    }

    function setInputValidationState(input, isValid, errorMessage) {
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }

        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('invalid-feedback')) {
            errorElement.textContent = errorMessage;
        } else if (!isValid) {
            const newErrorElement = document.createElement('div');
            newErrorElement.classList.add('invalid-feedback');
            newErrorElement.textContent = errorMessage;
            input.parentNode.insertBefore(newErrorElement, input.nextSibling);
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            console.log('Formulario válido, se puede enviar');
            // Aquí puedes agregar el código para enviar el formulario
        } else {
            console.log('Formulario inválido, corregir errores');
        }
    });
});