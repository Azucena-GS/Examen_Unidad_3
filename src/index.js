import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './estilos.css';

const formulario = document.querySelector('#regex-form');
const campoExpresion = document.querySelector('#regex-input');
const campoTexto = document.querySelector('#text-input');
const resultado = document.querySelector('#result');

if (formulario && campoExpresion && campoTexto && resultado) {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const expresion = campoExpresion.value;
    const texto = campoTexto.value;

    resultado.classList.add('d-none');
    resultado.classList.remove('alert-success', 'alert-danger', 'alert-warning');

    if (expresion === '' || texto === '') {
      resultado.textContent = 'Ingresa la expresión regular y el texto que quieres comprobar.';
      resultado.classList.add('alert-warning');
      resultado.classList.remove('d-none');
      return;
    }

    let regla;

    try {
      regla = new RegExp(expresion);
    } catch (error) {
      if (!(error instanceof SyntaxError)) {
        throw error;
      }

      resultado.textContent = 'La expresión regular no es válida. Revísala e inténtalo de nuevo.';
      resultado.classList.add('alert-warning');
      resultado.classList.remove('d-none');
      return;
    }

    regla.lastIndex = 0;

    if (regla.test(texto)) {
      resultado.textContent = '¡Coincidencia! El texto cumple con la expresión regular.';
      resultado.classList.add('alert-success');
    } else {
      resultado.textContent = 'Sin coincidencia. El texto no cumple con la expresión regular.';
      resultado.classList.add('alert-danger');
    }

    resultado.classList.remove('d-none');
  });

  formulario.addEventListener('reset', function () {
    resultado.classList.add('d-none');
    resultado.classList.remove('alert-success', 'alert-danger', 'alert-warning');
    resultado.textContent = '';
  });
}
