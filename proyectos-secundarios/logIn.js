const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')
// estas expresiones sirven para poder validar el formulario 

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^.{4,12}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ 
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

// esta funcion itera entre todos los formularios y aplica la funcion para poder validar el formulario
function validarFormulario(e){
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario')
		break
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre')
		break
		case "password":
			validarCampo(expresiones.password, e.target, 'password')
			validarPassword2()
		break
		case "password2":
			validarPassword2()
		break
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo')
		break
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono')
		break
	}
}

// funcion para validar el formulario
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

// funcion para poder validar que coincidan las 2 contraseñas
function validarPassword2(){
	const inputPassword1 = document.getElementById("password")
	const inputPassword2 = document.getElementById("password2")

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto")
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto")
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo")
		campos['password'] = false
	} else {
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto")
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto")
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo")
		campos['password'] = true
	}
}
// este foreach es para que cada vez que apretamos una tecla con el keyup se vaya validando el formulario
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario)
	input.addEventListener('blur', validarFormulario)
})

