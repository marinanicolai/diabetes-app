/* ============================================================
   ADA-Clone – Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mega Menu ---- */
  const navItems = document.querySelectorAll('.nav-item[data-mega]');
  navItems.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const wasOpen = item.classList.contains('open');
      navItems.forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item[data-mega]')) {
      navItems.forEach(i => i.classList.remove('open'));
    }
  });

  /* ---- Mobile hamburger ---- */
  const hamburger = document.querySelector('.hamburger');
  const mainNav   = document.querySelector('.main-nav');
  hamburger?.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  /* ---- Accordion ---- */
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- Donate amount buttons ---- */
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.donate-amounts')?.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---- Smooth reveal on scroll ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.topic-card, .news-card, .recipe-card, .tool-card, .event-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });

  /* ---- Active nav link highlighting ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[href]').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.background = 'rgba(0,0,0,.2)';
    }
  });

  /* ---- Language switcher ---- */
  const isSpanish = currentPage.endsWith('-es.html');

  // Wire "En Español" / "En Inglés" text links
  document.querySelectorAll('a').forEach(a => {
    const text = a.textContent.trim();
    if (text === 'En Español') {
      a.href = isSpanish ? currentPage : currentPage.replace('.html', '-es.html');
    }
    if (text === 'En Inglés') {
      a.href = isSpanish ? currentPage.replace('-es.html', '.html') : currentPage;
    }
  });

  // Language select dropdown
  const langSelect = document.querySelector('.lang-select');
  if (langSelect) {
    langSelect.value = isSpanish ? 'Español' : 'English';
    langSelect.addEventListener('change', function () {
      if (this.value === 'Español' && !isSpanish) {
        window.location.href = currentPage.replace('.html', '-es.html');
      } else if (this.value === 'English' && isSpanish) {
        window.location.href = currentPage.replace('-es.html', '.html');
      }
    });
  }
});
