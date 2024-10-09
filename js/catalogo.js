// Manejamos el flip y la adición al carrito
document.querySelectorAll('.box').forEach((box) => {
    // Añade un evento de clic a cada caja de producto
    box.addEventListener('click', function () {
        // Cambia la clase de la caja para aplicar el efecto de flip
        this.classList.toggle('flipped');
    });

    const addToCartBtn = box.querySelector('.add-to-cart'); // Obtiene el botón de añadir al carrito dentro de la caja
    // Añade un evento de clic al botón de añadir al carrito
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento de clic se propague al contenedor de la caja
        const productName = box.getAttribute('data-name'); // Obtiene el nombre del producto desde el atributo 'data-name'
        const productPrice = parseInt(box.getAttribute('data-price')); // Obtiene el precio del producto desde el atributo 'data-price' y lo convierte a un entero
        const productImg = box.getAttribute('data-img'); // Obtiene la URL de la imagen del producto desde el atributo 'data-img'

        // Llama a la función para añadir el producto al carrito con los datos obtenidos
        addToCart({ name: productName, price: productPrice, img: productImg });
    });
});

// Función para añadir un producto al carrito
function addToCart(product) {
    // Obtiene el carrito desde el almacenamiento local o inicializa uno vacío si no existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Añade el producto al carrito, estableciendo la cantidad inicial en 1
    cart.push({ ...product, quantity: 1 });
    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(cart));
    // Muestra un mensaje de alerta al usuario informando que el producto ha sido añadido al carrito
    alert(`${product.name} ha sido agregado al carrito.`);
}
