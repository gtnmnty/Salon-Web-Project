export class ServiceOverlay {
  constructor(items) {
    this.items = items;
    this.currentItem = null;
    this.imgIdx = 0;
    this.autoTimer = null;
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
    this.currentItem = this.items.find((service) => service.id === id);
    if (!this.currentItem) return;

    this.imgIdx = 0;
    this.itemBrand.textContent = this.currentItem.category;
    this.itemName.textContent = this.currentItem.name;
    this.itemPrice.textContent = this.currentItem.price;
    this.ratingInfo.textContent = `5.0 (${this.currentItem.reviews.length * 310 + 88} Reviews)`;
    this.infoTags.innerHTML = this.currentItem.info.map((item) => `<span class="info-tag">${item}</span>`).join('');
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
    this.thumbBar.innerHTML = this.currentItem.imgs.map((img, index) => `
      <div class="thumb ${index === this.imgIdx ? 'active' : ''}"
        style="background-image:url('${img}')"
        data-index="${index}">
      </div>
    `).join('');
  }

  setImg(index) {
    this.imgIdx = index;
    this.updateImg();
  }

  hoverImg(index) {
    if (!this.currentItem) return;

    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[index]}')`;
    this.thumbBar.querySelectorAll('.thumb').forEach((thumb, thumbIndex) => {
      thumb.classList.toggle('active', thumbIndex === index);
    });
  }

  unhoverImg() {
    if (!this.currentItem) return;

    this.mainDetailImg.style.backgroundImage = `url('${this.currentItem.imgs[this.imgIdx]}')`;
    this.thumbBar.querySelectorAll('.thumb').forEach((thumb, thumbIndex) => {
      thumb.classList.toggle('active', thumbIndex === this.imgIdx);
    });
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
    this.reviewsList.innerHTML = list.map((review) => `
      <div class="review-card">
        <div class="review-top">
          <div>
            <div class="reviewer-name">${review.name}</div>
            <div class="review-date">${review.date}</div>
          </div>
          <span class="review-stars">${'&#9733;'.repeat(review.stars)}${'&#9734;'.repeat(5 - review.stars)}</span>
        </div>
        <p class="review-text">"${review.text}"</p>
      </div>
    `).join('');
  }

  setStars(stars) {
    this.selectedStars = stars;
    this.starPicker.querySelectorAll('span').forEach((star, index) => {
      star.classList.toggle('lit', index < stars);
    });
  }

  submitReview(onMessage) {
    if (!this.currentItem) return;

    const name = this.reviewerName.value.trim();
    const text = this.reviewText.value.trim();
    const date = this.reviewerDate.value.trim() || 'Just now';
    if (!name || !text) {
      onMessage?.('Please fill in your name and review.');
      return;
    }

    this.currentItem.reviews.unshift({
      name,
      stars: this.selectedStars,
      date,
      text
    });
    this.renderReviews();
    this.reviewerName.value = '';
    this.reviewerDate.value = '';
    this.reviewText.value = '';
    this.setStars(5);
    onMessage?.('Thank you for your review!');
  }
}
