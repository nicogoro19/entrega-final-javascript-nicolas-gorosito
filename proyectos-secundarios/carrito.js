let cartContainer = document.getElementById("cartSection")
let cartSection = document.getElementById("cartSection")
let totalCartP = document.getElementById("totalcartP")
let totalCart$P = document.getElementById("total$CartP")
let totalCartContainer = document.getElementById("containerTotalcartP")
let totalCartContainerPrec = document.getElementById("containerTotalPrecCartP")


let cartStorage = localStorage.getItem("cartAutos")
cartStorage = JSON.parse(cartStorage)


function renderCarryto (cartItems){
    cartItems.forEach(product => {
        const cartProduct = document.createElement("div")
        cartProduct.classList.add("products-cart")
        cartProduct.innerHTML= `<div class="cart-container-img" ><img class="cart-img" src="../imagenes/${product.img}"></img></div>
                                <div>
                                    <p>${product.modelo}</p>
                                    <h3>${product.nombre}</h3>
                                    <p> U$:${product.precio}</p>
                                </div>
                                <div class= "cart-contador">
                                    <button class="plusButton" id="${product.id}">+</button>
                                    <span class="counter" id="${product.id}">${product.cantidad}</span>
                                    <button class="minusButton" id="${product.id}">-</button>
                                    <button class="eliminarDelCarrito" id="${product.id}">eliminar
                                    del carrito</button>
                                </div>`
        cartContainer.appendChild(cartProduct)
    })
}
renderCarryto(cartStorage)


const btnEliminar = document.querySelectorAll(".eliminarDelCarrito")

const btnSumar = document.querySelectorAll(".plusButton");
const btnRestar = document.querySelectorAll(".minusButton");
const counters = document.querySelectorAll(".counter");

const vaciaCarrito = document.getElementById("vaciarCartButton")
const pagoButton = document.getElementById("pagarCart")
let contador = 1



//-------------------- vaciar el carrito-------------------
vaciaCarrito.onclick = ()=>{
    Swal.fire({
        title: "quieres vaciar tu carrito?",
        showDenyButton: true,
        confirmButtonText: "si!",
        denyButtonText: `cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("se ha vaciado el carrito correctamente", "", "success");
            cartStorage = []
            localStorage.setItem("cartAutos",JSON.stringify[cartStorage])
            cartContainer.innerHTML=`<h3 class="carritoVacio" >actualmente no hay ningun producto agregado al carrito</h3>
                                     <div class="containerVolverMenuCart"><a class="container" href="../index.html">volver al menu principal</a></div>`
            pagoButton.remove()
            vaciaCarrito.remove()
            totalCartP.remove()
            totalCart$P.remove()
            totalCartContainer.remove()
            totalCartContainerPrec.remove()
        }
    });
}

// actualiza el total de la suma de los productos en el carrito
// actualiza a cantidad de productos que hay en el carrito


// elimina los elementos del carrito al tocar el boton eliminar de dicho elemento
btnEliminar.forEach(boton => {
    boton.onclick = (e) => {
        const prodId = e.currentTarget.id
        // filtramos la lista con los elementos que sean diferentes al que seleccionamos y gardamos en el storage
        cartStorage = cartStorage.filter(auto => auto.id !== prodId)
        localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
        
        // borramos el prodcto del dom
        const productoAremover = e.currentTarget.closest('.products-cart')
        productoAremover.remove()
    }

})

function actualizarTotal() {
    let totalPrecio = 0
    let totalCantidad = 0
    
    cartStorage.forEach(producto => {
        totalPrecio += producto.precio * producto.cantidad
        totalCantidad += producto.cantidad
    })

    // Actualizar el total, pasandolo a pesos (1200) y agregamos el iva (1.21)
    totalCart$P.textContent = `PRECIO FINAL DEL CARRITO EN PESOS: $${totalPrecio*1.21*1200}`
    // lo multiplico por 1170 ya que es el precio del dolar oficial
    // Actualizar la cantidad total de productos
    totalCartP.textContent = `CANTIDAD DE PRODUCTOS: ${totalCantidad}`
}actualizarTotal()



plusButton.forEach(boton => {
    boton.onclick = (e) => {
        const prodCant = e.currentTarget.id
        product = cartStorage.find(auto => auto.id === prodCant)

        product.cantidad++
        
        const counter = document.querySelectoral(`.counter[id="${prodId}"]`)
        counter.textContent = product.cantidad

        localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
        actualizarTotal()
    }
})


// para hacer el boton de sumar y restar lo que tengo que hacer es, al tocar el boton, se selecciona el id del boton, despues busco si esta en elcarrito


