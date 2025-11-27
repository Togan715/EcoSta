// Basic interactivity and demo gamification
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });

  // Add-to-order demo (adds item and grants points)
  const addButtons = document.querySelectorAll('.add-order');
  const orderList = document.getElementById('order-list');
  const pointsDisplay = document.getElementById('points-display');
  const ecoPointsEl = document.getElementById('eco-points');
  const carbonSavedEl = document.getElementById('carbon-saved');
  const mealsSupportedEl = document.getElementById('meals-supported');

  let points = 0;
  let carbonSaved = 0;
  let meals = 0;
  let orderItems = [];

  function updateDashboard(){
    pointsDisplay.textContent = points;
    ecoPointsEl.querySelector('strong').textContent = points;
    carbonSavedEl.querySelector('strong').textContent = carbonSaved + ' kg';
    mealsSupportedEl.textContent = meals;
  }

  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      orderItems.push(item);
      // Add item to order list UI
      if(orderList.firstElementChild && orderList.firstElementChild.textContent === 'No items yet'){
        orderList.innerHTML = '';
      }
      const li = document.createElement('li');
      li.textContent = item;
      orderList.appendChild(li);
      // Gamified reward: points and carbon saved demo
      points += 10; // each eco-friendly dish = 10 points
      carbonSaved += 0.5; // demo: 0.5 kg saved per item
      meals += 1;
      updateDashboard();
    });
  });

  document.getElementById('checkout').addEventListener('click', () => {
    alert('Demo checkout: Thank you! Your eco-points have been updated.');
  });

  // Reservation form demo (no back-end)
  document.getElementById('reserve-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    alert(`Reservation confirmed for ${name}. A confirmation email (demo) will be sent.`);
    e.target.reset();
  });

  // Cookie consent handlers
  const cookieBanner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  // Simple localStorage to remember consent
  if(localStorage.getItem('eco_cookie_consent') === 'accepted') {
    cookieBanner.style.display = 'none';
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('eco_cookie_consent','accepted');
    cookieBanner.style.display = 'none';
  });
  declineBtn.addEventListener('click', () => {
    localStorage.setItem('eco_cookie_consent','declined');
    cookieBanner.style.display = 'none';
  });
});
