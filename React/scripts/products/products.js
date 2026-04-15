import { products } from "../../data/products.js";

let activeCategory = 'all';
let overlay;
const CART_KEY = 'cart';

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

export class ProductOverlay {
  constructor(items) {
    this.items = items;
    this.currentItem;
    this.imgIdx = 0;
    this.autoTimer;
    this.selectedStars = 5;

    this.detailOverlay = document.getElementById('detailOverlay');
    this.itemBrand = document.getElementById('itemBrand');
    this.itemName = document.getElementById('itemName');
    this.itemPrice = document.getElementById('itemPrice');
    this.ratingInfo = document.getElementById('ratingInfo');
    this.infoTags = document.getElementById('infoTags');
    this.qtyInput = document.getElementById('qtyInput');
    this.mainDetailImg = document.getElementById('mainDetailImg');
    this.imgCountBadge = document.getElementById('imgCountBadge');
    this.thumbBar = document.getElementById('thumbBar');
    this.reviewCountBadge = document.getElementById('reviewCountBadge');
    this.reviewsList = document.getElementById('reviewsList');
    this.reviewerName = document.getElementById('reviewerName');
    this.reviewerDate = document.getElementById('reviewerDate');
    this.reviewText = document.getElementById('reviewText');
    this.starPicker = document.getElementById('starPicker');

    this.setStars(5);
  }

  open(id) {
    this.currentItem = this.items.find(p => p.id === id);
    if (!this.currentItem) return;
    this.imgIdx = 0;
    this.itemBrand.textContent = this.currentItem.brand;
    this.itemName.textContent = this.currentItem.name;
    this.itemPrice.textContent = this.currentItem.price;
    this.ratingInfo.textContent = `5.0 (${this.currentItem.reviews.length * 310 + 88} Reviews)`;
    this.infoTags.innerHTML = this.currentItem.info.map(i => `<span class="info-tag">${i}</span>`).join('');
    this.qtyInput.value = 1;
    this.renderReviews();
    this.updateImg();
    this.startAutoSlide();
    this.detailOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close() {
    clearInterval(this.autoTimer);
    this.detailOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  updateImg() {
    if (!this.currentItem) return;
    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[this.imgIdx]}')`;
    this.imgCountBadge.textContent = `${this.imgIdx + 1} / ${this.currentItem.imgs.length}`;
    this.thumbBar.innerHTML = this.currentItem.imgs.map((img, i) =>
      `<div class="thumb ${i === this.imgIdx ? 'active' : ''}"
            style="background-image:url('${img}')"
            data-index="${i}"
          ></div>`
    ).join('');
  }

  setImg(i) { this.imgIdx = i; this.updateImg(); }

  hoverImg(i) {
    if (!this.currentItem) return;
    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[i]}')`;
    this.thumbBar.querySelectorAll('.thumb').forEach((t, idx) => t.classList.toggle('active', idx === i));
  }

  unhoverImg() {
    if (!this.currentItem) return;
    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[this.imgIdx]}')`;
    this.thumbBar.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === this.imgIdx));
  }

  startAutoSlide() {
    clearInterval(this.autoTimer);
    if (!this.currentItem) return;
    this.autoTimer = setInterval(() => {
      this.imgIdx = (this.imgIdx + 1) % this.currentItem.imgs.length;
      this.updateImg();
    }, 2000);
  }

  renderReviews() {
    const list = this.currentItem?.reviews || [];
    this.reviewCountBadge.textContent = `${list.length} review${list.length !== 1 ? 's' : ''}`;
    this.reviewsList.innerHTML = list.map(r => `
      <div class="review-card">
        <div class="review-top">
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="review-date">${r.date}</div>
          </div>
          <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
        </div>
        <p class="review-text">"${r.text}"</p>
      </div>
    `).join('');
  }

  setStars(n) {
    this.selectedStars = n;
    this.starPicker.querySelectorAll('span').forEach((s, i) => s.classList.toggle('lit', i < n));
  }

  submitReview() {
    if (!this.currentItem) return;
    const name = this.reviewerName.value.trim();
    const text = this.reviewText.value.trim();
    if (!name || !text) { showToast('Please fill in your name and review.'); return; }
    this.currentItem.reviews.unshift({ name, stars: this.selectedStars, date: 'Just now', text });
    this.renderReviews();
    this.reviewerName.value = '';
    this.reviewerDate.value = '';
    this.reviewText.value = '';
    this.setStars(5);
    showToast('Thank you for your review! âœ¨');
  }
}

function renderProducts(list) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = list.map(p => `
    <div class="card" data-id="${p.id}">
      <div class="card-img" style="background-image:url('${p.imgs[0]}')">
        ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
      </div>
      <div class="card-content">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-count">${p.reviews.length * 310 + 88} reviews</span>
        </div>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="card-price">${p.price}</span>
          <div class="card-actions">
            <button class="btn-cart" data-action="cart" type="button">Cart</button>
            <button class="btn-buy" data-action="buy" type="button">Buy</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
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
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
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

function initEvents() {
  const grid = document.getElementById('products-grid');
  const pills = document.querySelectorAll('.pill');
  const searchBtn = document.querySelector('.search-btn');
  const sortSelect = document.getElementById('sortSelect');
  const backBtn = document.getElementById('backBtn');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');
  const starPicker = document.getElementById('starPicker');
  const thumbBar = document.getElementById('thumbBar');

  pills.forEach(btn => {
    btn.addEventListener('click', () => filterCategory(btn, btn.dataset.category));
  });

  if (searchBtn) searchBtn.addEventListener('click', applyFilters);
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('keyup', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);

  if (grid) grid.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('button[data-action]');
    const card = e.target.closest('.card');
    if (!card) return;
    const id = Number(card.dataset.id);

    if (actionBtn?.dataset.action === 'cart') {
      e.stopPropagation();
      const product = products.find(p => p.id === id);
      addItemToCart(product, 1);
      showToast('Added to cart! ðŸ›’');
      return;
    }
    if (actionBtn?.dataset.action === 'buy') {
      e.stopPropagation();
      overlay.open(id);
      return;
    }
    overlay.open(id);
  });

  if (backBtn) backBtn.addEventListener('click', () => overlay.close());
  if (addToCartBtn) addToCartBtn.addEventListener('click', () => {
    if (!overlay?.currentItem) return;
    const qty = Math.max(1, parseInt(overlay.qtyInput.value || '1', 10));
    addItemToCart(overlay.currentItem, qty);
    showToast('Added to cart! ðŸ›’');
  });
  if (buyNowBtn) buyNowBtn.addEventListener('click', () => showToast('Proceeding to checkout...'));
  const submitReviewBtn = document.getElementById('submitReviewBtn');
  if (submitReviewBtn) submitReviewBtn.addEventListener('click', () => overlay.submitReview());

  if (starPicker) starPicker.addEventListener('click', (e) => {
    const span = e.target.closest('span[data-stars]');
    if (!span) return;
    overlay.setStars(Number(span.dataset.stars));
  });

  if (thumbBar) thumbBar.addEventListener('mouseover', (e) => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    overlay.hoverImg(Number(thumb.dataset.index));
  });
  if (thumbBar) thumbBar.addEventListener('mouseout', (e) => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    overlay.unhoverImg();
  });
  if (thumbBar) thumbBar.addEventListener('click', (e) => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    overlay.setImg(Number(thumb.dataset.index));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  overlay = new ProductOverlay(products);
  initEvents();
  renderProducts(products);
});


