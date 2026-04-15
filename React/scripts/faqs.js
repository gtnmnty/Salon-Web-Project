import { appointmentsBooking } from "../data/faqs/appointments-booking.js";
import { servicesPricing } from "../data/faqs/services-pricing.js";
import { productsAftercare } from "../data/faqs/products-aftercare.js";
import { ordersDelivery } from "../data/faqs/orders-delivery.js";
import { shippingReturns } from "../data/faqs/shipping-returns.js";
import { accountPayments } from "../data/faqs/account-payments.js";

const FAQ_CATEGORIES = [
  {
    id: "appointments-booking",
    title: "Appointments",
    em: "& Booking",
    items: appointmentsBooking
  },
  {
    id: "services-pricing",
    title: "Services",
    em: "& Pricing",
    items: servicesPricing
  },
  {
    id: "products-aftercare",
    title: "Products",
    em: "& Aftercare",
    items: productsAftercare
  },
  {
    id: "orders-delivery",
    title: "Orders",
    em: "& Delivery",
    items: ordersDelivery
  },
  {
    id: "shipping-returns",
    title: "Shipping",
    em: "& Returns",
    items: shippingReturns
  },
  {
    id: "account-payments",
    title: "Account",
    em: "& Payments",
    items: accountPayments
  }
];

class FaqCategory {
  constructor({ id, title, em, items }) {
    this.id = id;
    this.title = title;
    this.em = em;
    this.items = items || [];
  }

  render() {
    const section = document.createElement("div");
    section.className = "faq-category";
    section.dataset.cat = this.id;

    const header = document.createElement("div");
    header.className = "cat-header";

    const title = document.createElement("h2");
    title.className = "cat-title";
    title.innerHTML = `${this.title} <em>${this.em}</em>`;

    header.appendChild(title);
    section.appendChild(header);

    this.items.forEach(item => {
      section.appendChild(this.renderItem(item));
    });

    return section;
  }

  renderItem(item) {
    const wrap = document.createElement("div");
    wrap.className = "faq-item";

    const button = document.createElement("button");
    button.className = "faq-q";
    button.type = "button";
    button.innerHTML = `
      ${item.question}
      <span class="faq-icon"><svg viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="1" x2="7" y2="13" />
          <line x1="1" y1="7" x2="13" y2="7" />
        </svg></span>
    `;
    button.addEventListener("click", () => toggleFaq(button));

    const body = document.createElement("div");
    body.className = "faq-body";

    const inner = document.createElement("div");
    inner.className = "faq-inner";
    inner.textContent = item.answer;

    body.appendChild(inner);
    wrap.appendChild(button);
    wrap.appendChild(body);

    return wrap;
  }
}

function renderFaqs() {
  const container = document.getElementById("faqContainer");
  container.innerHTML = "";

  FAQ_CATEGORIES.forEach(category => {
    const section = new FaqCategory({
      ...category
    });
    container.appendChild(section.render());
  });
}

function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const body = item.querySelector(".faq-body");
  const inner = item.querySelector(".faq-inner");
  const isOpen = item.classList.contains("open");

  btn.closest(".faq-category").querySelectorAll(".faq-item").forEach(i => {
    i.classList.remove("open");
    i.querySelector(".faq-body").style.height = "0px";
  });

  if (!isOpen) {
    item.classList.add("open");
    body.style.height = inner.offsetHeight + "px";
  }
}

function doSearch() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const cat = document.getElementById("filterSelect").value;
  let found = 0;

  document.querySelectorAll(".faq-category").forEach(section => {
    const scat = section.dataset.cat;
    if (cat !== "all" && scat !== cat) {
      section.style.display = "none";
      return;
    }

    let sectionVisible = false;
    section.querySelectorAll(".faq-item").forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = !q || text.includes(q);
      item.style.display = match ? "" : "none";
      if (match) {
        sectionVisible = true;
        found++;
      }
    });

    section.style.display = sectionVisible ? "" : "none";
  });

  document.getElementById("noResults").style.display = found === 0 ? "block" : "none";
}

function setActivePill(cat) {
  document.querySelectorAll(".pill").forEach(p => {
    p.classList.toggle("active", p.dataset.cat === cat);
  });
}

renderFaqs();

document.getElementById("searchInput").addEventListener("input", doSearch);
document.getElementById("filterSelect").addEventListener("change", e => {
  setActivePill(e.target.value);
  doSearch();
});

document.getElementById("searchBtn").addEventListener("click", doSearch);

document.querySelectorAll(".pill").forEach(pill => {
  pill.addEventListener("click", () => {
    const cat = pill.dataset.cat;
    document.getElementById("filterSelect").value = cat;
    setActivePill(cat);
    doSearch();
  });
});
