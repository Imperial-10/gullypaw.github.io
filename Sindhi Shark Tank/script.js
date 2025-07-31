// script.js for GullyPaw

// 📍 Autofill location in report form (if available)
window.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('location');
    if (locationInput && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
        locationInput.value = coords;
      });
    }
  
    initDarkModeToggle();
    initDogFilter();
    validateForm('loginForm');
    validateForm('adoptForm');
    validateForm('reportForm');
  });
  
  // ✅ Basic form validation for login, adopt, report
  function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.border = '2px solid red';
          valid = false;
        } else {
          field.style.border = '1px solid #ccc';
        }
      });
      if (!valid) {
        e.preventDefault();
        showToast('Please fill all required fields!');
      }
    });
  }
  
  // 🔔 Show toast alert
  function showToast(message) {
    let toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#4a7c59';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  
  // 🌙 Toggle dark mode
  function initDarkModeToggle() {
    const toggleBtn = document.getElementById('dark-toggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      showToast(document.body.classList.contains('dark') ? 'Dark Mode On' : 'Light Mode Off');
    });
  }
  
  // 🐶 Filter dog cards by dropdown (city/breed/age)
  function initDogFilter() {
    const filter = document.getElementById('dog-filter');
    const cards = document.querySelectorAll('.dog-card');
    if (!filter || !cards.length) return;
    filter.addEventListener('change', () => {
      const val = filter.value.toLowerCase();
      cards.forEach(card => {
        card.style.display = val === 'all' || card.dataset.filter.includes(val) ? 'block' : 'none';
      });
    });
  }
  
  