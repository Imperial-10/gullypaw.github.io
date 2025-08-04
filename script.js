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
  initLanguageSwitcher();
  validateForm('loginForm');
  validateForm('adoptForm');
  validateForm('reportForm');
});

// ✅ Basic form validation for login or adopt
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

// // 🌙 Dark mode toggle setup
// function initDarkModeToggle() {
//   const toggleBtn = document.getElementById('dark-toggle');
//   function toggleDark() {
//     document.body.classList.toggle('dark');
//     showToast(document.body.classList.contains('dark') ? 'Dark Mode On' : 'Light Mode Off');
//   }
//   if (toggleBtn) toggleBtn.addEventListener('click', toggleDark);
// }

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

// 🌐 Language switcher
function initLanguageSwitcher() {
  const langSelector = document.getElementById('language-selector');
  if (!langSelector) return;

  langSelector.addEventListener('change', () => {
    const selectedLang = langSelector.value;
    const textMap = strings[selectedLang];
    if (textMap) {
      for (const key in textMap) {
        const el = document.querySelector(`[data-text='${key}']`);
        if (el) el.innerText = textMap[key];
      }
    }
  });
}

// 🌍 Translations
const strings = {
  en: {
    appName: "GullyPaw",
    navHome: "Home",
    navAbout: "About",
    navFeatures: "Features",
    navImpact: "Impact",
    navAdopt: "Adopt",
    navFeed: "Feed",
    navReport: "Report",
    navLogin: "Login",
    darkToggle: "Toggle Dark Mode",
    heroTitle: "Snap. Tag. Save a Life.",
    heroDesc: "GullyPaw is your street dog rescue assistant...",
    reportBtn: "Report a Dog",
    footerText: "© 2025 GullyPaw. Every tag makes a difference.",
    dashboardTitle: "Your GullyPaw Profile",
    profileDesc: "Here’s how you’ve helped our furry friends so far.",
    dogsReported: "Total Dogs Reported: 12",
    dogsFed: "Dogs Fed: 8",
    dogsAdopted: "Dogs Adopted: 2",
    pawPoints: "PawPoints Earned: 85",
    badges: "Badges: 🥇 Street Saviour, 🐾 Loyal Rescuer"
  },
  hi: {
    appName: "गलीपॉ",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navFeatures: "विशेषताएँ",
    navImpact: "प्रभाव",
    navAdopt: "गोद लें",
    navFeed: "खिलाएं",
    navReport: "रिपोर्ट करें",
    navLogin: "लॉगिन",
    darkToggle: "डार्क मोड",
    heroTitle: "तस्वीर लें। टैग करें। जीवन बचाएं।",
    heroDesc: "गलीपॉ आपका स्ट्रीट डॉग रेस्क्यू सहायक है...",
    reportBtn: "कुत्ते की रिपोर्ट करें",
    footerText: "© 2025 गलीपॉ. हर टैग एक फर्क लाता है।",
    dashboardTitle: "आपकी गलीपॉ प्रोफ़ाइल",
    profileDesc: "यहाँ देखें आपने अब तक कितना मदद किया है।",
    dogsReported: "कुल रिपोर्ट किए गए कुत्ते: 12",
    dogsFed: "खिलाए गए कुत्ते: 8",
    dogsAdopted: "गोद लिए गए कुत्ते: 2",
    pawPoints: "कमाए गए पॉवपॉइंट्स: 85",
    badges: "बैज: 🥇 स्ट्रीट सेवियर, 🐾 लॉयल रेस्क्युअर"
  },
  kn: {
    appName: "ಗುಲ್ಲಿಪಾ",
    navHome: "ಮುಖಪುಟ",
    navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
    navFeatures: "ಲಕ್ಷಣಗಳು",
    navImpact: "ಪ್ರಭಾವ",
    navAdopt: "ದತ್ತು",
    navFeed: "ಆಹಾರ",
    navReport: "ವರದಿ ಮಾಡಿ",
    navLogin: "ಲಾಗಿನ್",
    darkToggle: "ಡಾರ್ಕ್ ಮೋಡ್",
    heroTitle: "ಕ್ಲಿಕ್ ಮಾಡಿ. ಟ್ಯಾಗ್ ಮಾಡಿ. ಪ್ರಾಣ ಉಳಿಸಿ.",
    heroDesc: "ಗುಲ್ಲಿಪಾ ನಿಮ್ಮ ಬೀದಿ ನಾಯಿಗಳ ರಕ್ಷಣೆ ಸಹಾಯಗಾರ.",
    reportBtn: "ನಾಯಿ ವರದಿ ಮಾಡಿ",
    footerText: "© 2025 ಗುಲ್ಲಿಪಾ. ಪ್ರತಿಯೊಂದು ಟ್ಯಾಗ್‌ಗೆ ಅರ್ಥವಿದೆ.",
    dashboardTitle: "ನಿಮ್ಮ ಗಲ್ಲಿಪಾ ಪ್ರೊಫೈಲ್",
    profileDesc: "ನೀವು ಇದುವರೆಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಿದ್ದೀರಿ ಎಂಬುದನ್ನು ಇಲ್ಲಿ ನೋಡಿ.",
    dogsReported: "ಒಟ್ಟು ವರದಿ ಮಾಡಿದ ನಾಯಿಗಳು: 12",
    dogsFed: "ಆಹಾರ ನೀಡಿದ ನಾಯಿಗಳು: 8",
    dogsAdopted: "ದತ್ತಕ ಪಡೆದ ನಾಯಿಗಳು: 2",
    pawPoints: "ಪಾವ್ ಪಾಯಿಂಟ್‌ಗಳು ಗಳಿಸಲಾಗಿದೆ: 85",
    badges: "ಬ್ಯಾಡ್ಜ್‌ಗಳು: 🥇 ಸ್ಟ್ರೀಟ್ ಸೇವಿಯರ್, 🐾 ಲಾಯಲ್ ರೆಸ್ಕ್ಯೂಯರ್"
  }
};
