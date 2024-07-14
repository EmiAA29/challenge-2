document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');

    // Función para crear un nuevo elemento de producto
    const createProductCard = (name, price, imageSrc) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${imageSrc}" alt="${name}">
            <div class="product-info">
                <h3>${name}</h3>
                <p>$${price}</p>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        // Agregar evento para eliminar producto
        productCard.querySelector('.delete-btn').addEventListener('click', () => {
            productList.removeChild(productCard);
        });

        return productCard;
    };

    // Función para mostrar una vista previa de la imagen seleccionada
    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image Preview">`;
        };
        reader.readAsDataURL(file);
    };

    // Manejar el cambio en el campo de imagen para mostrar la vista previa
    productImage.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            previewImage(file);
        } else {
            imagePreview.innerHTML = '';
        }
    });

    // Manejar el evento de enviar formulario
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtener los valores del formulario
        const name = productName.value;
        const price = productPrice.value;
        const imageFile = productImage.files[0];

        // Crear una nueva tarjeta de producto y agregarla a la lista
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newProductCard = createProductCard(name, price, e.target.result);
                productList.appendChild(newProductCard);
            };
            reader.readAsDataURL(imageFile);
        }

        // Limpiar el formulario y la vista previa de la imagen
        productForm.reset();
        imagePreview.innerHTML = '';
    });
});
