import { nailCareItems, skinCareItems, hairCareItems, makeupItems, products } from "../../data/products.js";
import { renderOverlayShell, initEvents, ProductOverlay } from "./product-overlay.js";

const productCategories = [
    { id: 1, title: "Nail Care", items: nailCareItems },
    { id: 2, title: "Skin Care", items: skinCareItems },
    { id: 3, title: "Hair Care", items: hairCareItems },
    { id: 4, title: "Make Up Care", items: makeupItems },
];

let activeCategory = 'all';
let overlay;
const CART_KEY = 'cart';

class ProductCategory {
    constructor({ id, title, items }) {
        this.id = id;
        this.title = title;
        this.items = items;
    }

    renderHTML() {
        const section = document.getElementById('products-grid');
        if(!section) return;

        const div = document.createElement('div');
        div.className = 'section-heading';
        div.innerHTML = `
            <div class="section-title">${this.title}</div>
            <div class="items-grid" id="grid-${this.id}"></div>
        `;

        section.appendChild(div);

        const grid = document.querySelector(`#grid-${this.id}`);

        this.items.forEach(item => {
            const card = this.createCard(item);
            grid.appendChild(card);
        });
    }

    createCard(item) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = item.id;

        card.innerHTML = `
            <div class="card-img" style="background-image:url('${item.imgs?.[0]}')">
                ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ''}
            </div>
            <div class="card-content">
                <div class="card-brand">${item.brand}</div>
                <div class="card-name">${item.name}</div>
                <div class="card-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-count">${item.reviews.length * 310 + 88} reviews</span>
                </div>
                <p class="card-desc">${item.desc}</p>
                <div class="card-footer">
                    <span class="card-price">${item.price}</span>
                    <div class="card-actions">
                        <button class="btn-cart" data-action="cart" type="button">Cart</button>
                        <button class="btn-buy" data-action="buy" type="button">Buy</button>
                    </div>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                overlay.open(item.id);
            }
        });

        return card;
    }
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addItemToCart(product, qty = 1) {
    if (!product) return;
    const cart = getCart();
    const id = String(product.id);
    const match = cart.find(i => i.id === id);

    if (match) {
        match.qty += qty;
    } else {
        cart.push({
            id,
            name: product.name,
            price: Number(product.priceNum),
            desc: product.desc,
            image: product.imgs?.[0] || '',
            qty,
            deliveryOptionId: 1
        });
    }

    saveCart(cart);
}

function filterCategory(btn, cat) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = cat;
    applyFilters();
}

function applyFilters() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const sortEl = document.getElementById('sortSelect');
    const sort = sortEl ? sortEl.value : 'default';
    let list = [...products];
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (q) list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
    if (sort === 'price-asc') list.sort((a, b) => a.priceNum - b.priceNum);
    if (sort === 'price-desc') list.sort((a, b) => b.priceNum - a.priceNum);
    renderProducts(list);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function renderProducts(list) {
    const container = document.getElementById('products-grid');
    if (!container) return;
    container.innerHTML = '';
    list.forEach(item => {
        const tempCat = new ProductCategory({ id: item.category, title: '', items: [item] });
        const card = tempCat.createCard(item);
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', renderOverlayShell());

    overlay = new ProductOverlay(products);

    // Render category sections
    const container = document.getElementById('products-grid');
    if (container) container.innerHTML = '';

    productCategories.forEach(data => {
        const cat = new ProductCategory(data);
        cat.renderHTML();
    });

    initEvents(overlay);
});
