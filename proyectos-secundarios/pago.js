const formulario = document.getElementById('formularioaPago')
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	nombreTarjeta: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cvv: /[0-9]{16}/,
    Vencimiento:/^(0[1-9]|1[0-2])\/[0-9]{2}$/,
    Tarjeta: /[0-9]{16}/,
	nombreTarjeta: /^\d{7,14}$/ 
}

const campos = {
	nombreTarjeta: false,
	telefonoPago: false,
    cvv: false,
    Vencimiento:false,
    Tarjeta:false,
    email:false,
}

// funcion para validar formularios

function validarFormulario(e){
    switch(e.target.name){
		case "nombre":
			validarCampo(expresiones.nombreTarjeta, e.target, 'nombreTarjeta')
		break
		case "correo":
			validarCampo(expresiones.email, e.target, 'email')
		break
		case "telefono":
			validarCampo(expresiones.telefonoPago, e.target, 'telefonoPago')
		break
		case "cvv":
			validarCampo(expresiones.cvv, e.target, 'cvv')
		break
        case "vencimiento":
			validarCampo(expresiones.Vencimiento, e.target, 'vencimiento')
		break
        case "tarjeta":
			validarCampo(expresiones.tarjeta, e.target, 'tarjeta')
		break

    }
}

function validarCampo (expresion, input, campo){
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
		campos[campo] = true
	} else {
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto")
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto")
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo")
		campos[campo] = false
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})




