// Checkout helper (vanilla JS)
// CHECKOUT placeholder for real checkout URLs
const CHECKOUT = {
  // Example structure — replace with real URLs
  urls: {
    proon: {
      mensal: '',
      trimestral: '',
      semestral: '',
      anual: ''
    },
    proon_dieta: {
      mensal: '',
      trimestral: '',
      semestral: '',
      anual: ''
    }
  }
};

(function () {
  'use strict';

  let selectedPlan = null;

  function openModal() {
    const overlay = document.getElementById('checkout-overlay');
    const modal = document.getElementById('checkout-modal');
    if (!overlay || !modal) return;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const overlay = document.getElementById('checkout-overlay');
    const modal = document.getElementById('checkout-modal');
    if (!overlay || !modal) return;
    overlay.style.display = 'none';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  function proceed(location) {
    if (!selectedPlan) {
      closeModal();
      return;
    }

    const offer = selectedPlan.offer;
    const cycle = selectedPlan.cycle;

    // Consulta Premium: abre o diálogo de país e depois redireciona para WhatsApp
    if (offer === 'premium') {
      closeModal();
      const msg = encodeURIComponent('Olá, vim do site e gostaria de garantir minha vaga exclusiva na Consulta Premium PRO. Pode me explicar como funciona?');
      window.open('https://wa.me/5562992937723?text=' + msg, '_blank', 'noopener,noreferrer');
      return;
    }

    // Persist selected plan for checkout pages
    try {
      localStorage.setItem('pending_plan', JSON.stringify(selectedPlan));
    } catch (e) {
      // ignore storage errors
    }

    // Try to use configured checkout URL if present
    const configured = (CHECKOUT.urls && CHECKOUT.urls[offer] && CHECKOUT.urls[offer][cycle]) || '';

    if (configured) {
      window.location.href = configured;
    } else {
      const params = new URLSearchParams({
        offer: offer,
        cycle: cycle,
        location: location
      });
      window.location.href = '/checkout.html?' + params.toString();
    }
  }

  // Attach handlers after DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    // Open modal when clicking any "Assinar" button
    document.querySelectorAll('[data-offer][data-cycle]').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        selectedPlan = {
          offer: btn.getAttribute('data-offer'),
          cycle: btn.getAttribute('data-cycle')
        };
        openModal();
      });
    });

    // Modal buttons
    const btnBrazil = document.getElementById('btn-brazil');
    const btnUsa = document.getElementById('btn-usa');
    const btnEuropa = document.getElementById('btn-europa');
    const overlay = document.getElementById('checkout-overlay');
    const closeBtn = document.getElementById('checkout-close');

    if (btnBrazil) btnBrazil.addEventListener('click', function () { proceed('br'); });
    if (btnUsa) btnUsa.addEventListener('click', function () { proceed('us'); });
    if (btnEuropa) btnEuropa.addEventListener('click', function () { proceed('eu'); });
    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // ESC to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    });
  });
})();

