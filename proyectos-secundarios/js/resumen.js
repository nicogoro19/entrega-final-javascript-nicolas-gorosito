let cartStorage = JSON.parse(localStorage.getItem("cartAutos"))
let cartResume = document.getElementById("resumenSection")
let resumenTotal = document.getElementById("containerTotalresumenP")
let resumenTotalPrec = document.getElementById("containerTotalPrecResumentP")



function renderCarryto (cartItems){
    cartItems.forEach(product => {
        const cartProduct = document.createElement("div")
        cartProduct.classList.add("products-cart")
        cartProduct.innerHTML= `<div class="cart-container-img" ><img class="cart-img" src="../../imagenes/${product.img}"></img></div>
                                <div>
                                    <p>${product.modelo}</p>
                                    <h3>${product.nombre}</h3>
                                    <p> U$:${product.precio}</p>
                                </div>
                                <div class= "cart-contador">
                                    <span class="counter" id="${product.id}">${product.cantidad}</span>
                                </div>`
        cartResume.appendChild(cartProduct)
    })
    actualizarTotal()
}

function actualizarTotal() {
    let totalPrecio = 0
    let totalCantidad = 0
    
    cartStorage.forEach(product => {
        totalPrecio += product.precio * 1.21 * product.cantidad
        totalCantidad += product.cantidad
    });

    resumenTotal.textContent = `CANTIDAD DE PRODUCTOS ${totalCantidad}`
    resumenTotalPrec.textContent = `EL VALOR TOTAL DE TU COMPRA FUE DE $${(totalPrecio * 1.21 * 1200)}`
}

renderCarryto(cartStorage)