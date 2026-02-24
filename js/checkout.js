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

    // Persist selected plan for checkout pages
    try {
      localStorage.setItem('pending_plan', JSON.stringify(selectedPlan));
    } catch (e) {
      // ignore storage errors
    }

    // Try to use configured checkout URL if present
    const offer = selectedPlan.offer;
    const cycle = selectedPlan.cycle;
    const configured = (CHECKOUT.urls && CHECKOUT.urls[offer] && CHECKOUT.urls[offer][cycle]) || '';

    if (configured) {
      // In case different checkout for residents vs abroad is needed, this object may be extended.
      window.location.href = configured;
    } else {
      // Fallback: navigate to a generic checkout with query params (replace with real path if available)
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
    const btnAbroad = document.getElementById('btn-abroad');
    const overlay = document.getElementById('checkout-overlay');
    const closeBtn = document.getElementById('checkout-close');

    if (btnBrazil) btnBrazil.addEventListener('click', function () { proceed('br'); });
    if (btnAbroad) btnAbroad.addEventListener('click', function () { proceed('int'); });
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

