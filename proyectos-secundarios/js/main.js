// let autos= [
//     {
//         id:1,
//         modelo:"ferrari",
//         nombre:"purosangue",
//         precio:130.000,
//         img:"img1.jpg",
//         cantidad:1,
//         stock:7,
//     },
//     {
//         id:2,
//         modelo:"bmw",
//         nombre:"m4 competition",
//         precio:80.000,
//         img:"img2.jpeg",
//         cantidad:1,
//         stock:3,
//     },
//     {
//         id:3,
//         modelo:"mecedes",
//         nombre:"c63 amg",
//         precio:100.000,
//         img:"img3.webp",
//         cantidad:1,
//         stock:5,
//     },
//     {
//         id:4,
//         modelo:"alfa romeo",
//         nombre:"julieta",
//         precio:50.000,
//         img:"img4.jpg",
//         cantidad:1,
//         stock:8,
//     },
//     {
//         id:5,
//         modelo:"bmw",
//         nombre:"m3",
//         precio:80.000,
//         img:"img5.jpg",
//         cantidad:1,
//         stock:2,
//     },
//     {
//         id:6,
//         modelo:"lamborghini",
//         nombre:"veneno",
//         precio:170.000,
//         img:"img6.jpeg",
//         cantidad:1,
//         stock:1,

//     },
//     {
//         id:7,
//         modelo:"volkswagen",
//         nombre:"vento gli",
//         precio:30.000,
//         img:"img1.jpg",
//         cantidad:1,
//         stock:5,
//     },
//     {
//         id:8,
//         modelo:"mbw",
//         nombre:"X6M",
//         precio:75.000,
//         img:"img2.jpeg",
//         cantidad:1,
//         stock:7,
//     },
//     {
//         id:9,
//         modelo:"volkswagen",
//         nombre:"golf gti mk7.5",
//         precio:35.000,
//         img:"img3.webp",
//         cantidad:1,
//         stock:4,
//     }
// ]
// la ruta se piensa desde el html
let cartAutos = []
 
let cartelera = document.getElementById("cartelera")

fetch("./db/data.json")
    .then(Response =>Response.json())
    .then(data => {
        data.forEach(auto => {
            const card = document.createElement("div")
            card.classList.add("products-card")
            card.innerHTML = `
                            <div class="card-img-container">
                                <img class="card-img-auto" src="imagenes/${auto.img}" alt="imagen del auto"></img> 
                            </div>
                            <p class="card-modelo-auto"> marca:<span class="info-auto">${auto.modelo}</span></p> 
                            <p class="card-nombre-auto">modelo:<span class="info-auto">${auto.nombre}</span></p> 
                            <p class="card-precio-auto">precio:<span class="info-auto">u$:${auto.precio}</span></p> 
                            <button class="addToCartButton" id="${auto.id}">agregar al carrito</button>`
            cartelera.appendChild(card)
        });
    addToCart()

    function addToCart(){
        addButton = document.querySelectorAll(".addToCartButton")
        addButton.forEach(boton=>{
            boton.onclick = (e) => {
                const autoId = e.currentTarget.id
                const selectedauto = data.find(data=> data.id == autoId)

                const autoEnCart = cartAutos.find(auto => auto.id == autoId);

                if (autoEnCart) {
                    autoEnCart.cantidad += 1;
                } else {
                    cartAutos.push({ ...selectedauto, cantidad: 1 });
                }
                
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "se ha agregado correctamente al carrito",
                    showConfirmButton: false,
                    timer: 700
                  });
    
                localStorage.setItem("cartAutos",JSON.stringify(cartAutos))
    
            }
        })
    }

})
