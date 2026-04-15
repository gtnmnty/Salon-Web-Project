import { ServiceOverlay } from './service-overlay.js';

const services = [
  {
    id: 1,
    name: 'Signature Haircut & Style',
    category: 'Hair Care',
    price: '\u20B11,200',
    priceNum: 1200,
    badge: 'Most Popular',
    desc: 'A bespoke cut tailored to your face shape, finished with a luxury blowout.',
    imgs: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop'
    ],
    info: ['Style Consultation', 'Luxury Scalp Wash', 'Precision Cut', 'Blowout & Finish'],
    reviews: [
      { name: 'Sofia R.', stars: 5, date: 'Mar 2025', text: 'Absolutely stunning result. My hair has never felt this healthy and the cut is perfection.' },
      { name: 'Andrea M.', stars: 5, date: 'Feb 2025', text: 'The stylist truly listened to what I wanted. I left feeling like a completely new person.' },
      { name: 'Camille D.', stars: 4, date: 'Jan 2025', text: 'Gorgeous blowout. The salon atmosphere is so calming, I nearly fell asleep in the chair.' }
    ]
  },
  {
    id: 2,
    name: 'Deep Hydration Facial',
    category: 'Skin Care',
    price: '\u20B12,500',
    priceNum: 2500,
    badge: 'Staff Pick',
    desc: 'A 60-minute ritual restoring luminosity with marine actives and oxygen infusion.',
    imgs: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop'
    ],
    info: ['Skin Analysis', 'Enzyme Exfoliation', 'Seaweed Mask', 'Oxygen Infusion', 'SPF Finish'],
    reviews: [
      { name: 'Elena V.', stars: 5, date: 'Mar 2025', text: 'The most relaxing hour of my week. My skin was literally glowing for days after.' },
      { name: 'Jasmine L.', stars: 5, date: 'Feb 2025', text: "I've tried facials at many places but this one is truly world-class. Worth every peso." }
    ]
  },
  {
    id: 3,
    name: 'Luxury Gel Manicure',
    category: 'Nail Care',
    price: '\u20B1850',
    priceNum: 850,
    badge: null,
    desc: 'Flawless nails that last up to three weeks, with premium gel polish and hand massage.',
    imgs: [
      'https://images.unsplash.com/photo-1604654894610-df490982580e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604655837204-e26aa499f4f9?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604655840975-f9c2f8e1d3c1?w=800&auto=format&fit=crop'
    ],
    info: ['Nail Shaping & File', 'Cuticle Care', 'Hydrating Hand Soak', 'Long-Wear Gel Polish', 'Hand Massage'],
    reviews: [
      { name: 'Marie T.', stars: 5, date: 'Mar 2025', text: 'Perfect application, no chips after two weeks! The hand massage alone is worth it.' },
      { name: 'Trisha A.', stars: 5, date: 'Mar 2025', text: 'Lovely technicians, so gentle and precise. My nails look absolutely immaculate.' },
      { name: 'Reese O.', stars: 4, date: 'Feb 2025', text: 'Great experience overall. The color selection is amazing and the gel lasts forever.' }
    ]
  },
  {
    id: 4,
    name: 'Bridal Make Up',
    category: 'Make Up',
    price: '\u20B15,500',
    priceNum: 5500,
    badge: 'Premium',
    desc: 'All-day glamour crafted for your most important day, with airbrush finish and lash application.',
    imgs: [
      'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412840181-f51793da6090?w=800&auto=format&fit=crop'
    ],
    info: ['Pre-Bridal Consultation', 'Skin Prep & Primer', 'Airbrush Foundation', 'Lash Application', 'Setting Spray', 'Touch-Up Kit'],
    reviews: [
      { name: 'Hannah G.', stars: 5, date: 'Feb 2025', text: 'I cried happy tears when I saw myself. The team understood my vision perfectly.' },
      { name: 'Nicole B.', stars: 5, date: 'Jan 2025', text: 'Flawless, long-lasting, and absolutely stunning. My photos are breathtaking.' }
    ]
  },
  {
    id: 5,
    name: 'Balayage & Toning',
    category: 'Hair Care',
    price: '\u20B13,800',
    priceNum: 3800,
    badge: 'Trending',
    desc: 'Sun-kissed dimension with hand-painted highlights and a custom gloss toning treatment.',
    imgs: [
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&auto=format&fit=crop'
    ],
    info: ['Hair Consultation', 'Balayage Painting', 'Toning Gloss', 'Deep Conditioning', 'Style Finish'],
    reviews: [
      { name: 'Luna P.', stars: 5, date: 'Mar 2025', text: "Best balayage I've ever had. The color looks so natural and the toning is spot on." },
      { name: 'Claire S.', stars: 5, date: 'Feb 2025', text: "I've been getting balayage for years and this is by far the best result." }
    ]
  },
  {
    id: 6,
    name: 'Pedicure & Foot Ritual',
    category: 'Nail Care',
    price: '\u20B1950',
    priceNum: 950,
    badge: null,
    desc: 'A restorative foot treatment with exfoliation, mask, and reflexology-inspired massage.',
    imgs: [
      'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570942872213-1242e82c6b20?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601740936369-2e6f7b8f5e3c?w=800&auto=format&fit=crop'
    ],
    info: ['Aromatic Foot Soak', 'Callus Removal', 'Sugar Scrub', 'Hydrating Mask', 'Foot Massage', 'Polish Finish'],
    reviews: [
      { name: 'Bianca R.', stars: 5, date: 'Mar 2025', text: 'My feet have never felt softer. The massage at the end is absolutely divine.' },
      { name: 'Katrina M.', stars: 5, date: 'Feb 2025', text: 'A true ritual, not just a pedicure. I leave feeling completely renewed every time.' }
    ]
  }
];

let activeCategory = 'all';
let overlay;
const SAVED_SERVICES_KEY = 'savedServices';

function getSavedServices() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_SERVICES_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSavedServices(items) {
  localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(items));
}

function saveService(service, qty = 1) {
  if (!service) return;

  const saved = getSavedServices();
  const id = String(service.id);
  const match = saved.find((item) => item.id === id);

  if (match) {
    match.qty += qty;
  } else {
    saved.push({
      id,
      name: service.name,
      category: service.category,
      price: service.price,
      image: service.imgs?.[0] || '',
      qty
    });
  }

  saveSavedServices(saved);
}

function renderServices(list) {
  const grid = document.getElementById('services-grid');
  grid.innerHTML = list.map((service) => `
    <div class="card" data-id="${service.id}">
      <div class="card-img" style="background-image:url('${service.imgs[0]}')">
        ${service.badge ? `<span class="card-badge">${service.badge}</span>` : ''}
      </div>
      <div class="card-content">
        <div class="card-brand">${service.category}</div>
        <div class="card-name">${service.name}</div>
        <div class="card-rating">
          <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span class="rating-count">${service.reviews.length * 310 + 88} reviews</span>
        </div>
        <p class="card-desc">${service.desc}</p>
        <div class="card-footer">
          <span class="card-price">${service.price}</span>
          <div class="card-actions">
            <button class="btn-cart" data-action="save" type="button">Save</button>
            <button class="btn-buy" data-action="book" type="button">Book</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCategory(button, category) {
  document.querySelectorAll('.pill').forEach((pill) => pill.classList.remove('active'));
  button.classList.add('active');
  activeCategory = category;
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSelect')?.value || 'default';
  let list = [...services];

  if (activeCategory !== 'all') {
    list = list.filter((service) => service.category === activeCategory);
  }

  if (query) {
    list = list.filter((service) =>
      service.name.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.desc.toLowerCase().includes(query)
    );
  }

  if (sort === 'price-asc') list.sort((a, b) => a.priceNum - b.priceNum);
  if (sort === 'price-desc') list.sort((a, b) => b.priceNum - a.priceNum);

  renderServices(list);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function goToBooking(service) {
  if (!service) return;

  sessionStorage.setItem('selectedService', service.name);
  sessionStorage.setItem('selectedServiceCategory', service.category);
  window.location.href = 'booking.html';
}

function initEvents() {
  const grid = document.getElementById('services-grid');
  const pills = document.querySelectorAll('.pill');
  const searchBtn = document.querySelector('.search-btn');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');
  const backBtn = document.getElementById('backBtn');
  const saveServiceBtn = document.getElementById('addToCartBtn');
  const bookNowBtn = document.getElementById('buyNowBtn');
  const submitReviewBtn = document.getElementById('submitReviewBtn');
  const starPicker = document.getElementById('starPicker');
  const thumbBar = document.getElementById('thumbBar');

  pills.forEach((button) => {
    button.addEventListener('click', () => filterCategory(button, button.dataset.category));
  });

  searchBtn?.addEventListener('click', applyFilters);
  searchInput?.addEventListener('keyup', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);

  grid?.addEventListener('click', (event) => {
    const actionButton = event.target.closest('button[data-action]');
    const card = event.target.closest('.card');
    if (!card) return;

    const id = Number(card.dataset.id);
    const service = services.find((item) => item.id === id);
    if (!service) return;

    if (actionButton?.dataset.action === 'save') {
      event.stopPropagation();
      saveService(service, 1);
      showToast('Service saved.');
      return;
    }

    if (actionButton?.dataset.action === 'book') {
      event.stopPropagation();
      overlay.open(id);
      return;
    }

    overlay.open(id);
  });

  backBtn?.addEventListener('click', () => overlay.close());

  saveServiceBtn?.addEventListener('click', () => {
    if (!overlay?.currentItem) return;
    const qty = Math.max(1, parseInt(overlay.qtyInput.value || '1', 10));
    saveService(overlay.currentItem, qty);
    showToast('Service saved.');
  });

  bookNowBtn?.addEventListener('click', () => {
    if (!overlay?.currentItem) return;
    goToBooking(overlay.currentItem);
  });

  submitReviewBtn?.addEventListener('click', () => {
    overlay.submitReview(showToast);
  });

  starPicker?.addEventListener('click', (event) => {
    const star = event.target.closest('span[data-stars]');
    if (!star) return;
    overlay.setStars(Number(star.dataset.stars));
  });

  thumbBar?.addEventListener('mouseover', (event) => {
    const thumb = event.target.closest('.thumb');
    if (!thumb) return;
    overlay.hoverImg(Number(thumb.dataset.index));
  });

  thumbBar?.addEventListener('mouseout', (event) => {
    const thumb = event.target.closest('.thumb');
    if (!thumb) return;
    overlay.unhoverImg();
  });

  thumbBar?.addEventListener('click', (event) => {
    const thumb = event.target.closest('.thumb');
    if (!thumb) return;
    overlay.setImg(Number(thumb.dataset.index));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  overlay = new ServiceOverlay(services);
  initEvents();
  renderServices(services);
});
