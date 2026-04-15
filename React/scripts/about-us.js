import { accordions } from "../data/about-us/accordion.js";
import { reviews } from "../data/about-us/reviews.js";

function renderAccordion(listId, items) {
  const list = document.getElementById(listId);
  if (!list) return;

  list.innerHTML = items.map(item => (
    '<div class=\"accordion-item\">' +
    '<button class=\"accordion-header\" aria-expanded=\"false\">' +
    '<span class=\"accordion-title\">' + item.title + '</span>' +
    '<span class=\"accordion-icon\">' +
    '<svg viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">' +
    '<line x1=\"7\" y1=\"1\" x2=\"7\" y2=\"13\" />' +
    '<line x1=\"1\" y1=\"7\" x2=\"13\" y2=\"7\" />' +
    '</svg>' +
    '</span>' +
    '</button>' +
    '<div class=\"accordion-body\">' +
    '<div class=\"accordion-inner\">' +
    '<p>' + item.html + '</p>' +
    '</div>' +
    '</div>' +
    '</div>'
  )).join('');
}

class Accordion {
  constructor(selector) {
    this.items = Array.from(document.querySelectorAll(selector));
    this.items.forEach(item => {
      item.querySelector('.accordion-header')
        .addEventListener('click', () => this.toggle(item));
    });
  }

  toggle(target) {
    const wasOpen = target.classList.contains('open');
    this.items.forEach(i => this._close(i));
    if (!wasOpen) this._open(target);
  }

  _open(item) {
    const body = item.querySelector('.accordion-body');
    const inner = item.querySelector('.accordion-inner');
    item.classList.add('open');
    item.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
    body.style.height = inner.offsetHeight + 'px';
  }

  _close(item) {
    const body = item.querySelector('.accordion-body');
    if (!item.classList.contains('open')) return;
    body.style.height = body.offsetHeight + 'px';
    item.classList.remove('open');
    item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      body.style.height = '0px';
    }));
  }
}

class Testimonial {
  constructor({ initial, name, stars, text }) {
    this.initial = initial;
    this.name = name;
    this.stars = stars;
    this.text = text;
  }

  render() {
    const el = document.createElement('div');
    el.className = 'testimonial-card';
    el.innerHTML =
      '<div class="testimonial-header">' +
      '<div class="testimonial-avatar">' + this.initial + '</div>' +
      '<div class="testimonial-meta">' +
      '<p class="testimonial-name">' + this.name + '</p>' +
      '<p class="testimonial-stars">' + '&#9733;'.repeat(this.stars) + '&#9734;'.repeat(5 - this.stars) + '</p>' +
      '</div>' +
      '</div>' +
      '<p class="testimonial-text">' + this.text + '</p>';
    return el;
  }
}

class TestimonialsCarousel {
  constructor(trackId, dotsId, data) {
    this.track = document.getElementById(trackId);
    this.dotsEl = document.getElementById(dotsId);
    this.items = data.map(d => new Testimonial(d));
    this.current = 0;
    this.dotStart = 0;
    this.perPage = this._calcPerPage();

    this._renderCards();
    this._renderDots();
    this._go(0);

    window.addEventListener('resize', () => {
      const pp = this._calcPerPage();
      if (pp !== this.perPage) {
        this.perPage = pp;
        this.current = 0;
        this._renderDots();
        this._go(0);
      }
    });
  }

  _calcPerPage() {
    if (window.innerWidth <= 580) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  _pages() { return Math.ceil(this.items.length / this.perPage); }

  _renderCards() {
    this.track.innerHTML = '';
    this.items.forEach(t => this.track.appendChild(t.render()));
  }

  _dotMap() {
    const pages = this._pages();
    const count = Math.min(5, pages);
    return Array.from({ length: count }, (_, i) => this.dotStart + i);
  }

  _ensureDotWindow() {
    const pages = this._pages();

    if (pages <= 5) {
      this.dotStart = 0;
      return;
    }

    if (this.current < this.dotStart) this.dotStart = this.current;
    if (this.current > this.dotStart + 4) this.dotStart = this.current - 4;
    this.dotStart = Math.max(0, Math.min(this.dotStart, pages - 5));
  }

  _renderDots() {
    this.dotsEl.innerHTML = '';
    this._ensureDotWindow();
    const count = Math.min(5, this._pages());

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.addEventListener('click', () => this._go(this.dotStart + i));
      this.dotsEl.appendChild(dot);
    }

    this._updateDots();
  }

  _updateDots() {
    this._ensureDotWindow();
    this.dotMap = this._dotMap();

    Array.from(this.dotsEl.children).forEach((dot, i) => {
      dot.classList.toggle('active', this.dotMap[i] === this.current);
      dot.setAttribute('aria-label', 'Page ' + (this.dotMap[i] + 1));
    });
  }

  _go(page) {
    this.current = Math.max(0, Math.min(page, this._pages() - 1));
    const card = this.track.children[0];
    const w = card ? card.offsetWidth : 0;
    const offset = this.current * this.perPage * (w + 24);
    this.track.style.transform = 'translateX(-' + offset + 'px)';
    this._updateDots();
  }
}

class ScrollReveal {
  constructor(selector) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .6s ' + (i * 0.05) + 's ease, transform .6s ' + (i * 0.05) + 's ease';
      obs.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderAccordion('accordionList', accordions);
  new Accordion('#accordionList .accordion-item');
  new TestimonialsCarousel('testimonialsTrack', 'testimonialsDots', reviews);
  new ScrollReveal('#accordionList .accordion-item, .contact-btn');
});