// Interactive Website JavaScript
// Demonstrates the power of JavaScript in web development

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Interactive Website Loaded Successfully!");

  // Initialize all interactive features
  initializeButtons();
  initializeFormValidation();
  initializeInteractiveDemo();
  initializeFeatureCards();
  initializeAnimations();
});

// Button Event Handlers
function initializeButtons() {
  // Primary Button - Shows notification
  const primaryBtn = document.getElementById("primaryBtn");
  primaryBtn.addEventListener("click", function () {
    showToast("🎉 Tombol berfungsi dengan sempurna!", "success");
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // Secondary Button - Changes content
  const secondaryBtn = document.getElementById("secondaryBtn");
  secondaryBtn.addEventListener("click", function () {
    const hero = document.querySelector(".hero h2");
    const originalText = hero.textContent;
    hero.textContent = "🎊 JavaScript membuat website menjadi hidup!";
    hero.style.color = "#4facfe";
    hero.style.transform = "scale(1.1)";

    setTimeout(() => {
      hero.textContent = originalText;
      hero.style.color = "#333";
      hero.style.transform = "scale(1)";
    }, 2000);

    showToast("✨ Konten berubah secara dinamis!", "success");
  });

  // Animate Button - Triggers animations
  const animateBtn = document.getElementById("animateBtn");
  animateBtn.addEventListener("click", function () {
    // Animate all feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.animation = "pulse 0.6s ease-in-out";
        setTimeout(() => {
          card.style.animation = "";
        }, 600);
      }, index * 100);
    });

    showToast("🎭 Animasi keren diaktifkan!", "success");
  });
}

// Form Validation
function initializeFormValidation() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Real-time validation
  nameInput.addEventListener("input", function () {
    validateName(this);
  });

  emailInput.addEventListener("input", function () {
    validateEmail(this);
  });

  messageInput.addEventListener("input", function () {
    validateMessage(this);
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = validateMessage(messageInput);

    if (isNameValid && isEmailValid && isMessageValid) {
      showLoading();
      setTimeout(() => {
        hideLoading();
        showToast("✅ Form berhasil dikirim!", "success");
        form.reset();
        clearAllErrors();
      }, 2000);
    } else {
      showToast("❌ Silakan perbaiki error di form", "error");
    }
  });
}

// Validation Functions
function validateName(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById("nameError");

  if (value.length < 2) {
    showError(input, errorElement, "Nama harus minimal 2 karakter");
    return false;
  } else {
    showSuccess(input, errorElement);
    return true;
  }
}

function validateEmail(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    showError(input, errorElement, "Format email tidak valid");
    return false;
  } else {
    showSuccess(input, errorElement);
    return true;
  }
}

function validateMessage(input) {
  const value = input.value.trim();
  const errorElement = document.getElementById("messageError");

  if (value.length < 10) {
    showError(input, errorElement, "Pesan harus minimal 10 karakter");
    return false;
  } else {
    showSuccess(input, errorElement);
    return true;
  }
}

function showError(input, errorElement, message) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function showSuccess(input, errorElement) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorElement.classList.remove("show");
}

function clearAllErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  const inputs = document.querySelectorAll("input, textarea");

  errorMessages.forEach((error) => error.classList.remove("show"));
  inputs.forEach((input) => {
    input.classList.remove("valid", "invalid");
  });
}

// Interactive Demo
function initializeInteractiveDemo() {
  // Counter functionality
  let counter = 0;
  const counterDisplay = document.getElementById("counter");
  const incrementBtn = document.getElementById("incrementBtn");
  const decrementBtn = document.getElementById("decrementBtn");
  const resetBtn = document.getElementById("resetBtn");

  incrementBtn.addEventListener("click", function () {
    counter++;
    updateCounter();
    this.style.animation = "pulse 0.3s ease-in-out";
    setTimeout(() => (this.style.animation = ""), 300);
  });

  decrementBtn.addEventListener("click", function () {
    counter--;
    updateCounter();
    this.style.animation = "pulse 0.3s ease-in-out";
    setTimeout(() => (this.style.animation = ""), 300);
  });

  resetBtn.addEventListener("click", function () {
    counter = 0;
    updateCounter();
    showToast("🔄 Counter direset!", "success");
  });

  function updateCounter() {
    counterDisplay.textContent = counter;
    counterDisplay.style.transform = "scale(1.2)";
    counterDisplay.style.color =
      counter > 0 ? "#28a745" : counter < 0 ? "#dc3545" : "#333";
    setTimeout(() => {
      counterDisplay.style.transform = "scale(1)";
    }, 200);
  }

  // Color Changer
  const colorBox = document.getElementById("colorBox");
  const changeColorBtn = document.getElementById("changeColorBtn");
  const colors = [
    "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
    "linear-gradient(45deg, #4facfe, #00f2fe)",
    "linear-gradient(45deg, #43e97b, #38f9d7)",
    "linear-gradient(45deg, #fa709a, #fee140)",
    "linear-gradient(45deg, #a8edea, #fed6e3)",
    "linear-gradient(45deg, #ff9a9e, #fecfef)",
  ];
  let colorIndex = 0;

  changeColorBtn.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    colorBox.style.background = colors[colorIndex];
    colorBox.style.transform = "rotate(360deg) scale(1.1)";
    setTimeout(() => {
      colorBox.style.transform = "rotate(0deg) scale(1)";
    }, 500);
    showToast("🎨 Warna berubah!", "success");
  });

  // Text Animator
  const textDisplay = document.getElementById("textDisplay");
  const animateTextBtn = document.getElementById("animateTextBtn");
  const texts = [
    "Halo JavaScript!",
    "JavaScript itu keren!",
    "Website interaktif!",
    "DOM manipulation!",
    "Event handling!",
    "Form validation!",
  ];
  let textIndex = 0;

  animateTextBtn.addEventListener("click", function () {
    textIndex = (textIndex + 1) % texts.length;
    textDisplay.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      textDisplay.textContent = texts[textIndex];
      textDisplay.style.animation = "fadeIn 0.5s ease-in-out";
    }, 250);
    showToast("📝 Teks berubah!", "success");
  });
}

// Feature Cards Interaction
function initializeFeatureCards() {
  const featureCards = document.querySelectorAll(".feature-card");

  featureCards.forEach((card) => {
    const btn = card.querySelector(".feature-btn");
    const feature = card.dataset.feature;

    btn.addEventListener("click", function () {
      switch (feature) {
        case "interaction":
          card.style.animation = "bounce 1s ease-in-out";
          showToast("🎯 Interaksi berhasil!", "success");
          break;
        case "dynamic":
          const icon = card.querySelector(".feature-icon");
          icon.textContent = icon.textContent === "✅" ? "🔄" : "✅";
          showToast("🔄 Konten berubah dinamis!", "success");
          break;
        case "notification":
          showToast("🔔 Notifikasi JavaScript!", "warning");
          break;
        case "validation":
          showToast("✅ Validasi JavaScript aktif!", "success");
          break;
      }
      setTimeout(() => (card.style.animation = ""), 1000);
    });
  });
}

// Animation Effects
function initializeAnimations() {
  // Add hover effects to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add scroll animations
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero");
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  });
}

// Toast Notification System
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 100);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Loading Overlay
function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.classList.add("show");
}

function hideLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.classList.remove("show");
}

// Keyboard Shortcuts
document.addEventListener("keydown", function (e) {
  // Press 'A' for animation
  if (e.key.toLowerCase() === "a") {
    const animateBtn = document.getElementById("animateBtn");
    animateBtn.click();
  }

  // Press 'C' for counter increment
  if (e.key.toLowerCase() === "c") {
    const incrementBtn = document.getElementById("incrementBtn");
    incrementBtn.click();
  }

  // Press 'Escape' to close loading
  if (e.key === "Escape") {
    hideLoading();
  }
});

// Console welcome message
console.log(`
🚀 Welcome to Interactive Website!
📝 Try these keyboard shortcuts:
   - Press 'A' for animations
   - Press 'C' for counter
   - Press 'Escape' to close loading
🎯 All features are powered by JavaScript!
`);

// Performance monitoring
const startTime = performance.now();
window.addEventListener("load", function () {
  const endTime = performance.now();
  const loadTime = endTime - startTime;
  console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});
