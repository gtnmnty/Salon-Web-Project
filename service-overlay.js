export class ServiceOverlay {
  constructor(items, onReviewUpdate) {
    this.items = items;
    this.onReviewUpdate = onReviewUpdate;
    this.currentItem = null;
    this.imgIdx = 0;
    this.autoTimer = null;
    this.selectedStars = 5;

    // Overlay elements
    this.detailOverlay   = document.getElementById('detailOverlay');
    this.itemBrand       = document.getElementById('itemBrand');
    this.itemName        = document.getElementById('itemName');
    this.itemDesc        = document.getElementById('itemDesc');
    this.itemPrice       = document.getElementById('itemPrice');
    this.ratingInfo      = document.getElementById('ratingInfo');
    this.infoTags        = document.getElementById('infoTags');
    this.qtyInput        = document.getElementById('qtyInput');
    this.mainDetailImg   = document.getElementById('mainDetailImg');
    this.imgCountBadge   = document.getElementById('imgCountBadge');
    this.thumbBar        = document.getElementById('thumbBar');
    this.reviewCountBadge = document.getElementById('reviewCountBadge');
    this.reviewsList     = document.getElementById('reviewsList');
    this.reviewerName    = document.getElementById('reviewerName');
    this.reviewerDate    = document.getElementById('reviewerDate');
    this.reviewText      = document.getElementById('reviewText');
    this.starPicker      = document.getElementById('starPicker');
    this.decBtn          = document.querySelector('.dec-btn');
    this.addBtn          = document.querySelector('.add-btn');

    this._injectArrows();
    this.setStars(5);
    this.initQtyEvents();
    this.initReviewsSwipe();
  }

  /* ── Inject arrow circles into .big-img ──────────────── */
  _injectArrows() {
    if (!this.mainDetailImg) return;

    this.arrowLeft  = this._makeArrow('left');
    this.arrowRight = this._makeArrow('right');

    this.mainDetailImg.appendChild(this.arrowLeft);
    this.mainDetailImg.appendChild(this.arrowRight);

    this.arrowLeft.addEventListener('click', (e) => {
      e.stopPropagation();
      this._stepImg(-1);
    });

    this.arrowRight.addEventListener('click', (e) => {
      e.stopPropagation();
      this._stepImg(1);
    });
  }

  _makeArrow(dir) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', dir === 'left' ? 'Previous image' : 'Next image');
    btn.className = `img-arrow img-arrow-${dir}`;

    // Inline SVG chevron
    const chevron = dir === 'left'
      ? `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>`
      : `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>`;

    btn.innerHTML = chevron;
    return btn;
  }

  /* ── Step image left (-1) or right (+1), wrapping ───── */
  _stepImg(direction) {
    if (!this.currentItem) return;
    const len = this.currentItem.imgs.length;
    this.imgIdx = (this.imgIdx + direction + len) % len;
    this.updateImg();
    // Reset auto-slide timer on manual nav
    this.startAutoSlide();
  }

  /* ── Qty +/- and UPDATE button ───────────────────────── */
  initQtyEvents() {
    if (this.decBtn) {
      this.decBtn.addEventListener('click', () => {
        this.qtyInput.value = Math.max(1, parseInt(this.qtyInput.value) - 1);
      });
    }

    if (this.addBtn) {
      this.addBtn.addEventListener('click', () => {
        const cur = parseInt(this.qtyInput.value) || 1;
        const max = parseInt(this.qtyInput.max) || 10;
        if (cur < max) this.qtyInput.value = cur + 1;
      });
    }

    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const guests = parseInt(this.qtyInput.value) || 1;
        this.showToast(`Guests updated to ${guests}`);
      });
    }
  }

  /* ── Smooth reviews swipe — mouse & touch ────────────── */
  initReviewsSwipe() {
    const el = this.reviewsList;
    if (!el) return;

    // Mouse drag
    let isDown = false, startX = 0, scrollLeft = 0;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
      el.style.cursor = 'grab';
      el.style.userSelect = '';
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
      el.style.cursor = 'grab';
      el.style.userSelect = '';
    });

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft - (x - startX) * 1.4;
    });

    // Mouse wheel — horizontal scroll
    el.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // already horizontal
      e.preventDefault();
      el.scrollLeft += e.deltaY * 1.2;
    }, { passive: false });

    // Touch — native smooth scrolling handles this via CSS,
    // but we add extra momentum feel for older browsers
    let touchStartX = 0, touchScrollLeft = 0;

    el.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollLeft = el.scrollLeft;
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      const diff = touchStartX - e.touches[0].clientX;
      el.scrollLeft = touchScrollLeft + diff;
    }, { passive: true });
  }

  /* ── Open overlay ────────────────────────────────────── */
  open(id) {
    this.currentItem = this.items.find((s) => s.id === id);
    if (!this.currentItem) return;

    // Pre-fill date
    if (this.reviewerDate) {
      const today = new Date();
      this.reviewerDate.value = today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    this.imgIdx = 0;

    this.itemBrand.textContent  = this.currentItem.category;
    this.itemName.textContent   = this.currentItem.name;
    this.itemDesc.textContent   = this.currentItem.desc;
    this.itemPrice.textContent  = this.currentItem.price;
    this.ratingInfo.textContent = `5.0 · ${this.currentItem.reviewCount} Reviews`;

    // Bullet-list highlights
    this.infoTags.innerHTML = `<ul class="info-bullets">${
      this.currentItem.info.map((item) => `<li>${item}</li>`).join('')
    }</ul>`;

    this.qtyInput.value = 1;
    this.renderReviews();
    this.updateImg();
    this.startAutoSlide();

    this.detailOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  /* ── Close overlay ───────────────────────────────────── */
  close() {
    clearInterval(this.autoTimer);
    this.detailOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  /* ── Update main image + badge + thumbnails ──────────── */
  updateImg() {
    if (!this.currentItem) return;

    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[this.imgIdx]}')`;
    this.imgCountBadge.textContent = `${this.imgIdx + 1} / ${this.currentItem.imgs.length}`;

    this.thumbBar.innerHTML = this.currentItem.imgs.map((img, i) => `
      <div class="thumb ${i === this.imgIdx ? 'active' : ''}"
        style="background-image:url('${img}')"
        data-index="${i}">
      </div>
    `).join('');

    // Rebind thumb click events
    this.thumbBar.querySelectorAll('.thumb').forEach((thumb) => {
      const idx = parseInt(thumb.dataset.index);
      thumb.addEventListener('click', () => this.setImg(idx));
      thumb.addEventListener('mouseenter', () => this.hoverImg(idx));
      thumb.addEventListener('mouseleave', () => this.unhoverImg());
    });
  }

  setImg(index) {
    this.imgIdx = index;
    this.updateImg();
    this.startAutoSlide();
  }

  hoverImg(index) {
    if (!this.currentItem) return;
    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[index]}')`;
    this.thumbBar.querySelectorAll('.thumb').forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  unhoverImg() {
    if (!this.currentItem) return;
    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[this.imgIdx]}')`;
    this.thumbBar.querySelectorAll('.thumb').forEach((t, i) => {
      t.classList.toggle('active', i === this.imgIdx);
    });
  }

  /* ── Auto-slide ──────────────────────────────────────── */
  startAutoSlide() {
    clearInterval(this.autoTimer);
    if (!this.currentItem) return;
    this.autoTimer = setInterval(() => {
      this.imgIdx = (this.imgIdx + 1) % this.currentItem.imgs.length;
      this.updateImg();
    }, 2000);
  }

  /* ── Reviews ─────────────────────────────────────────── */
  renderReviews() {
    const list = this.currentItem?.reviews || [];
    this.reviewCountBadge.textContent =
      `${this.currentItem.reviewCount} review${this.currentItem.reviewCount !== 1 ? 's' : ''}`;

    this.reviewsList.innerHTML = list.map((r) => `
      <div class="review-card">
        <div class="review-top">
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="review-date">${r.date}</div>
          </div>
          <span class="review-stars">${'&#9733;'.repeat(r.stars)}${'&#9734;'.repeat(5 - r.stars)}</span>
        </div>
        <p class="review-text">"${r.text}"</p>
      </div>
    `).join('');
  }

  /* ── Star picker ─────────────────────────────────────── */
  setStars(stars) {
    this.selectedStars = stars;
    this.starPicker.querySelectorAll('span').forEach((s, i) => {
      s.classList.toggle('lit', i < stars);
    });
  }

  /* ── Submit review ───────────────────────────────────── */
  submitReview(onMessage) {
    if (!this.currentItem) return;

    const name = this.reviewerName.value.trim();
    const text = this.reviewText.value.trim();
    const date = this.reviewerDate.value.trim() || 'Just now';

    if (!name || !text) {
      onMessage?.('Please fill in your name and review.');
      return;
    }

    this.currentItem.reviews.push({ name, stars: this.selectedStars, date, text });
    this.currentItem.reviewCount += 1;
    this.ratingInfo.textContent = `5.0 · ${this.currentItem.reviewCount} Reviews`;

    if (this.onReviewUpdate) {
      this.onReviewUpdate(this.currentItem.id, this.currentItem.reviewCount);
    }

    this.renderReviews();
    this.reviewerName.value = '';
    this.reviewerDate.value = '';
    this.reviewText.value   = '';
    this.setStars(5);

    // Smooth scroll to newest review (rightmost)
    setTimeout(() => {
      this.reviewsList.scrollTo({ left: this.reviewsList.scrollWidth, behavior: 'smooth' });
    }, 50);

    onMessage?.('Thank you for your review!');
  }

  /* ── Toast ───────────────────────────────────────────── */
  showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }
}
