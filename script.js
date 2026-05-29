let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmountElement = document.querySelector('.total-amount');
const cartCountElement = document.querySelector('.cart-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price} kr</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="changeQuantity(${item.id}, -1)"><i class="fas fa-minus"></i></button>
                    <span class="quantity-count">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="changeQuantity(${item.id}, 1)"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    totalAmountElement.textContent = `${total} kr`;
    if (cartCountElement) {
        cartCountElement.textContent = `(${totalItems})`;
    }
}

window.changeQuantity = function(id, direction) {
    const item = cart.find(product => product.id === id);
    if (item) {
        item.quantity += direction;
        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
        updateCartUI();
    }
};

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const menuItem = event.target.closest('.menu-item');
        const id = parseInt(menuItem.getAttribute('data-id'));
        const name = menuItem.getAttribute('data-name');
        const price = parseInt(menuItem.getAttribute('data-price'));
        const img = menuItem.querySelector('.item-img').getAttribute('src');

        const existingItem = cart.find(product => product.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }

        updateCartUI();
    });
});

document.querySelector('.clear-cart-btn').addEventListener('click', () => {
    cart = [];
    updateCartUI();
});

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) activeBtn.classList.remove('active');
        this.classList.add('active');

        const selectedCategory = this.textContent.toLowerCase().trim();

        menuItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (selectedCategory === 'alt') {
                item.style.display = 'flex';
            } else if (itemCategory === selectedCategory) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});