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
              <input type="number" class="qty-input" id="qtyInput" value="1" min="1" max="99">
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

document.body.insertAdjacentHTML('beforeend', renderOverlayShell());
overlay = new ProductOverlay(products);

