// Checkout helper (vanilla JS)
// Treino PRO ON: Brasil → MFIT; EUA e Europa → Kiwify
const CHECKOUT = {
  urls: {
    proon: {
      mfit: {
        mensal: 'https://pages.mfitpersonal.com.br/p/2gt9?checkout=true',
        trimestral: 'https://pages.mfitpersonal.com.br/p/2im0?checkout=true',
        semestral: 'https://pages.mfitpersonal.com.br/p/2im1?checkout=true',
        anual: 'https://pages.mfitpersonal.com.br/index?acao=page&tipo=1&page=117434&isCheckout=true'
      },
      kiwify: {
        mensal: 'https://pay.kiwify.com.br/5EzfNfs',
        trimestral: 'https://pay.kiwify.com.br/KxbLhxo',
        semestral: 'https://pay.kiwify.com.br/9aUY83q',
        anual: 'https://pay.kiwify.com.br/oiQRpQv'
      }
    },
    proon_dieta: {
      mfit: {
        mensal: 'https://pages.mfitpersonal.com.br/p/2im5?checkout=true',
        trimestral: 'https://pages.mfitpersonal.com.br/p/2im6',
        semestral: 'https://pages.mfitpersonal.com.br/p/2im7?checkout=true',
        anual: 'https://pages.mfitpersonal.com.br/p/2im8?checkout=true'
      },
      kiwify: {
        mensal: 'https://pay.kiwify.com.br/C8CuG45',
        trimestral: 'https://pay.kiwify.com.br/Bz3Mnpc',
        semestral: 'https://pay.kiwify.com.br/YTHsSvK',
        anual: 'https://pay.kiwify.com.br/H5XPaAS'
      }
    },
    premium: {
      mfit: 'https://pages.mfitpersonal.com.br/p/2imm?checkout=true',
      kiwify: 'https://pay.kiwify.com.br/In02VHV'
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

    // Consulta Premium: Brasil → MFIT; EUA e Europa → Kiwify
    if (offer === 'premium' && CHECKOUT.urls.premium) {
      const url = (location === 'br') ? CHECKOUT.urls.premium.mfit : CHECKOUT.urls.premium.kiwify;
      if (url) {
        closeModal();
        window.location.href = url;
        return;
      }
    }

    // Treino PRO ON: Brasil → MFIT; EUA e Europa → Kiwify
    if (offer === 'proon' && CHECKOUT.urls.proon) {
      const gateway = (location === 'br') ? CHECKOUT.urls.proon.mfit : CHECKOUT.urls.proon.kiwify;
      const url = gateway && gateway[cycle];
      if (url) {
        closeModal();
        window.location.href = url;
        return;
      }
    }

    // Treino + Dieta: Brasil → MFIT; EUA e Europa → Kiwify
    if (offer === 'proon_dieta' && CHECKOUT.urls.proon_dieta) {
      const gateway = (location === 'br') ? CHECKOUT.urls.proon_dieta.mfit : CHECKOUT.urls.proon_dieta.kiwify;
      const url = gateway && gateway[cycle];
      if (url) {
        closeModal();
        window.location.href = url;
        return;
      }
    }

    // Persist selected plan for checkout pages
    try {
      localStorage.setItem('pending_plan', JSON.stringify(selectedPlan));
    } catch (e) {
      // ignore storage errors
    }

    // Try to use configured checkout URL if present (outras ofertas)
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

