let cartContainer = document.getElementById("cartSection");
let cartSection = document.getElementById("cartSection");
let totalCartP = document.getElementById("totalcartP");
let totalCart$P = document.getElementById("total$CartP");
let totalCartContainer = document.getElementById("containerTotalcartP");
let totalCartContainerPrec = document.getElementById("containerTotalPrecCartP");

let cartStorage = JSON.parse(localStorage.getItem("cartAutos"))

// ----------------------funcion para renderizar el carrito------------------
function renderCarrito(cartItems) {    
    
    cartContainer.innerHTML = ""
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <h3 class="carritoVacio">No hay productos en el carrito</h3>
            <div class="containerVolverMenuCart">
                <a class="container" href="../../index.html">volver al menu principal</a>
            </div>`
        return
    }

    cartItems.forEach(product => {
        const cartProduct = document.createElement("div")
        cartProduct.classList.add("products-cart")
        cartProduct.innerHTML = `
            <div class="cart-container-img">
                <img class="cart-img" src="../../imagenes/${product.img}" alt="${product.nombre}">
            </div>
            <div>
                <p>${product.modelo}</p>
                <h3>${product.nombre}</h3>
                <p>U$: ${product.precio}</p>
            </div>
            <div class="cart-contador">
                <button class="plusButton" data-id="${product.id}" type="button">+</button>
                <span class="counter">${product.cantidad}</span>
                <button class="minusButton" data-id="${product.id}" type="button">-</button>
                <button class="eliminarDelCarrito" data-id="${product.id}" type="button">eliminar del carrito</button>
            </div>`

        cartContainer.appendChild(cartProduct)


// -------------------botones de suma, resta y borrar del carrito------------------------


        const btnSuma = cartProduct.querySelector(`.plusButton[data-id="${product.id}"]`)
        const btnResta = cartProduct.querySelector(`.minusButton[data-id="${product.id}"]`)
        const btnBorrar = cartProduct.querySelector(`.eliminarDelCarrito[data-id="${product.id}"]`)
// ---------------- boton para sumar ----------------
        btnSuma.onclick = function() {
            const prodId = this.getAttribute('data-id')
            const producto = cartStorage.find(item => String(item.id) === String(prodId))
            
            producto.cantidad++
            localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
            actualizarTotal()
            
        };
// ---------------- boton para restar ----------------
// restamos la cantidad de elementos del carrito y si el valor es menor a 1 lo eliminamos del carrito
        btnResta.onclick = function() {
            const prodId = this.getAttribute('data-id')
            const producto = cartStorage.find(item => String(item.id) === String(prodId))

            if (producto.cantidad > 1) {
                producto.cantidad--
                localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
                renderCarrito(cartStorage)
                actualizarTotal()
            } else {
                cartStorage = cartStorage.filter(item => String(item.id) !== String(prodId))
                localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
                renderCarrito(cartStorage)
                actualizarTotal()
            }
        }
// ---------------- boton para borrar ----------------
        btnBorrar.onclick = function() {
            const prodId = this.getAttribute('data-id')
            cartStorage = cartStorage.filter(item => String(item.id) !== String(prodId))
            localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
            renderCarrito(cartStorage)
            actualizarTotal()
        }
    })

    actualizarTotal()
}


// ---------------------funcion que actualiza el total----------------


function actualizarTotal() {
    let totalPrecio = 0
    let totalCantidad = 0
    
    cartStorage.forEach(producto => {
        totalPrecio += producto.precio * 1.21 * producto.cantidad
        totalCantidad += producto.cantidad
    });

    totalCartP.textContent = `CANTIDAD DE PRODUCTOS: ${totalCantidad}`
    totalCart$P.textContent = `PRECIO FINAL DEL CARRITO EN PESOS: $${(totalPrecio * 1.21 * 1200)}`
}

// ----------------- boton de vaciar el carrito------------------------


const vaciarCarrito = document.getElementById("vaciarCartButton")
if (vaciarCarrito) {
    vaciarCarrito.onclick = () => {
        Swal.fire({
            title: "¿Quieres vaciar tu carrito?",
            showDenyButton: true,
            confirmButtonText: "¡Sí!",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                cartStorage = []
                localStorage.setItem("cartAutos", JSON.stringify(cartStorage))
                renderCarrito(cartStorage)
                Swal.fire("no hay ningun elemento en el carrito", "", "success")
            }
        })
    }
}

renderCarrito(cartStorage);


