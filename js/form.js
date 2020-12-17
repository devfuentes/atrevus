// self executing function here
(function () {
  var persona = null;
  var cards = document.getElementsByClassName("form-card");
  var formulario = document.getElementById("form");

  var inputs = document.querySelectorAll("#form input");
  const API =
    "https://atrevuscreditdev.sgawebservices.net/SimuladorClienteJson/";
  var btnEnviar = document.getElementById("formSubmit");
  var expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    monto: /^\d+$/, // 1 a 3 numeros.
  };

  var campos = {
    credito: false,
    nombre: false,
    monto: false,
    plazo: false,
  };

  // AGREGANDO LISTENER AL BOTON DE TIPO CARD
  function activateCard() {
    let activeCard = document.querySelector(".form-card--active");
    activeCard.classList.remove("form-card--active");
    // Agregando clase
    this.classList.add("form-card--active");
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", activateCard, false);
  }

  function validateSelect() {
    var select = document.getElementById("plazo");
    if (select.value) {
      campos.plazo = true;
    }
  }

  function validarCampo(expresion, input, campo, mensaje1, mensaje2) {
    if (expresion.test(input.value)) {
      document
        .getElementById(`grupo__${campo}`)
        .classList.remove("formulario__container--incorrecto");
      //eliminando mensaje de error
      document.querySelector(`#grupo__${campo} .form__error`).innerHTML = "";
      campos[campo] = true;
    } else {
      document
        .getElementById(`grupo__${campo}`)
        .classList.add("formulario__container--incorrecto");
      campos[campo] = false;
      if (input.value.length <= 0) {
        //mostrar mensaje para llenar campo
        document.querySelector(
          `#grupo__${campo} .form__error`
        ).innerHTML = mensaje1;
      } else {
        //Mostra mensaje diciendo al usuaro que solo se pueden ingresar letras
        document.querySelector(
          `#grupo__${campo} .form__error`
        ).innerHTML = mensaje2;
      }
    }
  }

  function validarFormulario(e) {
    switch (e.target.name) {
      case "nombre":
        validarCampo(
          expresiones.nombre,
          e.target,
          "nombre",
          "Ingresa tu nombre.",
          "El nombre solo puede contener letras."
        );
        break;

      case "monto":
        validarCampo(
          expresiones.monto,
          e.target,
          "monto",
          "Ingresa el monto.",
          "El monto solo puede contener numeros"
        );
        break;

      default:
        break;
    }
  }

  inputs.forEach(function (input) {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var radioPersonal = document.getElementById("radioPersonal");
    var radioEmpresarial = document.getElementById("radioEmpresarial");
    var radioButton = false;
    // Validando que el radio button haya sido seleccionado

    if (radioPersonal.checked) {
      persona = 1;
      radioButton = true;
      campos.credito = true;
    } else if (radioEmpresarial.checked) {
      persona = 3;
      radioButton = true;
      campos.credito = true;
    } else {
      radioButton = false;
      persona = false;
      campos.credito = false;
    }
    function validateData() {
      console.log(this.responseText);
    }
    // Funcion para enviar datos
    function sendData(formulario) {
      formData = new FormData(formulario);

      let producto = formData.get("tipoCredito");
      let nombre = formData.get("nombre");
      let monto = formData.get("monto");
      let plazo = formData.get("plazo");

      console.log(`producto: ${producto}`);
      console.log(`producto: ${nombre}`);
      console.log(`producto: ${monto}`);
      console.log(`producto: ${plazo}`);

      var http = new XMLHttpRequest();

      http.addEventListener("load", validateData);
      http.open(
        "GET",
        `${API}${persona}/${producto}/${nombre}/${monto}/${plazo}`
      );

      http.send();
    }

    // Validando que se haya seleccionado un plazo
    validateSelect();
    if (campos.nombre && campos.monto && campos.plazo && radioButton) {
      // ENVIAR DATOS
      btnEnviar.value = "Enviando ...";
      btnEnviar.classList.add("form__input-submit--loading");
      document.getElementById("error-general").innerHTML = "";
      sendData(formulario);

      // ENVIADO DATOS A LA URL DE PRUEBA
    } else {
      //MANDAR MENSAJE DE ERROR
      document.getElementById("error-general").innerHTML =
        "Completa los campos obligatorios *";
    }
  });
})();
