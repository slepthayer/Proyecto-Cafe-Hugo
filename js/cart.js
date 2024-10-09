// Cargar productos del carrito
function loadCart() {
    // Obtiene el carrito desde el almacenamiento local
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items'); // Elemento donde se mostrarán los productos
    const cartTotalElement = document.getElementById('cart-total'); // Elemento donde se mostrará el total del carrito

    cartItemsContainer.innerHTML = ''; // Limpia el contenedor de los productos para evitar duplicados

    // Calcula el total y genera la visualización de cada producto en el carrito
    const total = cart.reduce((acc, product, index) => {
        // Añade una fila para cada producto en el carrito
        cartItemsContainer.appendChild(createCartRow(product, index));
        return acc + product.price * product.quantity; // Suma el precio total
    }, 0);

    // Actualiza el elemento del total con el valor calculado
    cartTotalElement.textContent = `₡${total}`;
    // Actualiza el enlace de WhatsApp con la información del carrito
    updateWhatsAppLink(cart, total);
}

// Función para obtener el carrito desde el almacenamiento local
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || []; // Devuelve el carrito o un arreglo vacío si no existe
}

// Función para crear una fila de producto en la tabla del carrito
function createCartRow(product, index) {
    const row = document.createElement('tr'); // Crea una nueva fila para el producto
    row.innerHTML = `
        <td><img src="${product.img}" alt="${product.name}" width="50"><br>${product.name}</td>
        <td>₡${product.price}</td>
        <td><input type="number" value="${product.quantity}" min="1" data-index="${index}" class="quantity-input"></td>
        <td>₡${product.price * product.quantity}</td>
        <td><button class="remove-btn" data-index="${index}">Eliminar</button></td>
    `;

    // Añade eventos a los botones y entradas de cantidad dentro de esta fila
    row.querySelector('.remove-btn').addEventListener('click', removeItem); // Evento para eliminar el producto
    row.querySelector('.quantity-input').addEventListener('change', updateQuantity); // Evento para actualizar la cantidad

    return row; // Retorna la fila creada
}

// Función para eliminar un producto del carrito
function removeItem(e) {
    const index = e.target.getAttribute('data-index'); // Obtiene el índice del producto a eliminar
    let cart = getCart(); // Obtiene el carrito actual
    cart.splice(index, 1); // Elimina el producto en el índice especificado
    saveCart(cart); // Guarda el carrito actualizado en el almacenamiento local
    loadCart(); // Recarga el carrito para reflejar los cambios
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(e) {
    const index = e.target.getAttribute('data-index'); // Obtiene el índice del producto
    const quantity = parseInt(e.target.value); // Obtiene la nueva cantidad desde la entrada
    let cart = getCart(); // Obtiene el carrito actual
    cart[index].quantity = quantity; // Actualiza la cantidad del producto en el carrito
    saveCart(cart); // Guarda el carrito actualizado en el almacenamiento local
    loadCart(); // Recarga el carrito para reflejar los cambios
}

// Función para guardar el carrito en el almacenamiento local
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Convierte el carrito a una cadena JSON y lo guarda
}

// Función para generar el enlace de WhatsApp con el pedido
function updateWhatsAppLink(cart, total) {
    const whatsappLink = document.getElementById('whatsapp-link'); // Obtiene el elemento del enlace de WhatsApp
    let message = 'Hola, me gustaría hacer el siguiente pedido:\n\n'; // Mensaje inicial
    
    // Genera un mensaje que resume los productos en el carrito
    cart.forEach((product) => {
        message += `- ${product.quantity}x ${product.name} (₡${product.price * product.quantity})\n`; // Añade cada producto al mensaje
    });

    message += `\nTotal: ₡${total}\nGracias.`; // Añade el total al mensaje final

    // Convierte el mensaje en una URL válida para WhatsApp
    const whatsappUrl = `https://wa.me/+50661435391?text=${encodeURIComponent(message)}`; 
    
    // Establece la URL en el botón de WhatsApp
    whatsappLink.href = whatsappUrl;
}

// Cargamos el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', loadCart); // Inicia la carga del carrito al cargar el DOM
