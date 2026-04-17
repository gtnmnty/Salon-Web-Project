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
    showToast('Thank you for your review! ✨'); // FIX #6: Fixed garbled emoji
  }
}

export function renderOverlayShell() {
  return `
    <div class="overlay" id="detailOverlay">
      <div class="overlay-box">
        <div class="overlay-top-bar">
          <button class="back-btn" id="backBtn">← Back to Products</button>
          <span class="overlay-top-title">Product Detail</span>
        </div>
        <div class="overlay-body">
          <div class="image-viewer">
            <div class="big-img" id="mainDetailImg">
              <span class="img-count-badge" id="imgCountBadge">1 / 4</span>
            </div>
            <div class="thumbnail-bar" id="thumbBar"></div>
          </div>
          <div class="info-pane">
            <div class="overlay-brand" id="itemBrand">Brand</div>
            <h2 class="overlay-name" id="itemName">Product Name</h2>
            <div class="overlay-rating">
              <span class="stars">★★★★★</span>
              <span id="ratingInfo">5.0 (Reviews)</span>
            </div>
            <div class="overlay-price" id="itemPrice">₱0</div>
            <div class="info-section">
              <h4>Product Highlights</h4>
              <div class="info-tags" id="infoTags"></div>
            </div>
            <div class="qty-row">
              <span class="qty-label">Qty</span>
              <input type="number" class="qty-input" id="qtyInput" value="1" min="1" max="10">
            </div>
            <div class="action-btns">
              <button class="btn-primary" id="addToCartBtn">Add to Cart</button>
              <button class="btn-secondary" id="buyNowBtn">Buy Now</button>
            </div>
          </div>
          <div class="review-area">
            <div class="review-header">
              <h3>Customer Reviews</h3>
              <span class="review-count-badge" id="reviewCountBadge">Showing top reviews</span>
            </div>
            <div class="reviews-list" id="reviewsList"></div>
            <div class="add-review">
              <h4>Write a Review</h4>
              <div class="review-form-grid">
                <input type="text" id="reviewerName" placeholder="Your name">
                <input type="text" id="reviewerDate" placeholder="Today's date (optional)">
              </div>
              <div class="star-picker" id="starPicker">
                <span data-stars="1">★</span>
                <span data-stars="2">★</span>
                <span data-stars="3">★</span>
                <span data-stars="4">★</span>
                <span data-stars="5">★</span>
              </div>
              <textarea id="reviewText" placeholder="What did you love about this product?"></textarea>
              <button class="submit-review-btn" id="submitReviewBtn">Submit Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initEvents(overlay) {
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
      showToast('Added to cart! 🛒'); // FIX #6: Fixed garbled emoji
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
    showToast('Added to cart! 🛒'); // FIX #6: Fixed garbled emoji
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
