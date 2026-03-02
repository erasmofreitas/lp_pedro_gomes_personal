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
  /** País detectado por IP: 'br' | 'us' | 'eu' | null */
  let detectedLocation = null;

  /** Lista de códigos de país considerados "Europa" para o checkout */
  var EUROPA_CODES = ['AD','AL','AT','BA','BE','BG','BY','CH','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MC','MD','ME','MK','MT','NL','NO','PL','PT','RO','RS','SE','SI','SK','SM','UA','VA','XK'];

  function countryToLocation(countryCode) {
    if (!countryCode || typeof countryCode !== 'string') return null;
    var c = countryCode.toUpperCase();
    if (c === 'BR') return 'br';
    if (c === 'US') return 'us';
    if (EUROPA_CODES.indexOf(c) !== -1) return 'eu';
    return null;
  }

  function fetchCountryByIP() {
    var url = 'https://ipapi.co/json/';
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var code = data && data.country_code;
        detectedLocation = countryToLocation(code);
      })
      .catch(function () {});
  }

  function openModal() {
    const overlay = document.getElementById('checkout-overlay');
    const modal = document.getElementById('checkout-modal');
    if (!overlay || !modal) return;
    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');

    // Pré-seleção visual pelo país detectado
    var btnBrazil = document.getElementById('btn-brazil');
    var btnUsa = document.getElementById('btn-usa');
    var btnEuropa = document.getElementById('btn-europa');
    [btnBrazil, btnUsa, btnEuropa].forEach(function (btn) {
      if (!btn) return;
      btn.classList.remove('checkout-country-detected');
      btn.removeAttribute('aria-describedby');
    });
    var hint = document.getElementById('checkout-detected-hint');
    if (hint) hint.remove();
    if (detectedLocation) {
      var detectedBtn = detectedLocation === 'br' ? btnBrazil : (detectedLocation === 'us' ? btnUsa : btnEuropa);
      if (detectedBtn) {
        detectedBtn.classList.add('checkout-country-detected');
        var span = document.createElement('span');
        span.id = 'checkout-detected-hint';
        span.className = 'checkout-detected-hint';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = ' (recomendado)';
        detectedBtn.appendChild(span);
      }
    }
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

  // Detecção de país por IP (ao carregar a página)
  fetchCountryByIP();

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

