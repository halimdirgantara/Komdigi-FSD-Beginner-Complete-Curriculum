// Age Calculator JavaScript
// Demonstrates JavaScript fundamentals: variables, functions, DOM manipulation, events

// Global variables
let currentDate = new Date();
let birthDate = null;
let userName = "";

// DOM elements
const ageForm = document.getElementById("ageForm");
const birthDateInput = document.getElementById("birthDate");
const nameInput = document.getElementById("name");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
const clearBtn = document.getElementById("clearBtn");

// Result display elements
const resultTitle = document.getElementById("resultTitle");
const ageNumber = document.getElementById("ageNumber");
const totalDays = document.getElementById("totalDays");
const totalHours = document.getElementById("totalHours");
const totalMinutes = document.getElementById("totalMinutes");
const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");
const factsList = document.getElementById("funFacts");

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  console.log("Age Calculator loaded successfully!");

  // Set maximum date to today
  birthDateInput.max = formatDate(currentDate);

  // Add event listeners
  ageForm.addEventListener("submit", handleFormSubmit);
  clearBtn.addEventListener("click", clearResult);
  birthDateInput.addEventListener("change", validateBirthDate);

  // Initialize
  initializeApp();
});

// Initialize application
function initializeApp() {
  console.log("Initializing Age Calculator...");

  // Set default values
  birthDateInput.value = "";
  nameInput.value = "";

  // Hide result initially
  resultDiv.classList.add("hidden");

  console.log("Age Calculator initialized successfully!");
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  console.log("Form submitted!");

  try {
    // Get form data
    const formData = getFormData();

    // Validate input
    if (!validateInput(formData)) {
      return;
    }

    // Calculate age
    const ageData = calculateAge(formData.birthDate);

    // Display result
    displayResult(ageData, formData.name);

    console.log("Age calculated successfully:", ageData);
  } catch (error) {
    console.error("Error calculating age:", error);
    showError("Terjadi kesalahan dalam menghitung umur. Silakan coba lagi.");
  }
}

// Get form data
function getFormData() {
  const birthDateValue = birthDateInput.value;
  const nameValue = nameInput.value.trim();

  return {
    birthDate: new Date(birthDateValue),
    name: nameValue,
  };
}

// Validate input
function validateInput(formData) {
  const { birthDate, name } = formData;

  // Check if birth date is provided
  if (!birthDate || isNaN(birthDate.getTime())) {
    showError("Silakan masukkan tanggal lahir yang valid.");
    return false;
  }

  // Check if birth date is not in the future
  if (birthDate > currentDate) {
    showError("Tanggal lahir tidak boleh di masa depan.");
    return false;
  }

  // Check if birth date is not too far in the past (reasonable limit)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 150);

  if (birthDate < minDate) {
    showError(
      "Tanggal lahir tidak valid. Silakan masukkan tanggal yang masuk akal."
    );
    return false;
  }

  return true;
}

// Validate birth date input
function validateBirthDate() {
  const selectedDate = new Date(birthDateInput.value);

  if (selectedDate > currentDate) {
    birthDateInput.setCustomValidity(
      "Tanggal lahir tidak boleh di masa depan."
    );
  } else {
    birthDateInput.setCustomValidity("");
  }
}

// Calculate age
function calculateAge(birthDate) {
  console.log("Calculating age for:", birthDate);

  const today = new Date();
  const birth = new Date(birthDate);

  // Calculate total days
  const totalDaysDiff = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

  // Calculate years
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate additional metrics
  const totalHours = totalDaysDiff * 24;
  const totalMinutes = totalHours * 60;

  return {
    years: years,
    months: months,
    days: days,
    totalDays: totalDaysDiff,
    totalHours: totalHours,
    totalMinutes: totalMinutes,
    birthDate: birth,
    currentDate: today,
  };
}

// Display result
function displayResult(ageData, name) {
  console.log("Displaying result:", ageData);

  // Update title
  if (name) {
    resultTitle.textContent = `Halo ${name}! Ini adalah umur Anda:`;
  } else {
    resultTitle.textContent = "Hasil Kalkulasi Umur:";
  }

  // Update age display
  ageNumber.textContent = ageData.years;
  totalDays.textContent = formatNumber(ageData.totalDays);
  totalHours.textContent = formatNumber(ageData.totalHours);
  totalMinutes.textContent = formatNumber(ageData.totalMinutes);

  // Update breakdown
  years.textContent = ageData.years;
  months.textContent = ageData.months;
  days.textContent = ageData.days;

  // Generate fun facts
  generateFunFacts(ageData);

  // Show result
  resultDiv.classList.remove("hidden");

  // Scroll to result
  resultDiv.scrollIntoView({ behavior: "smooth" });
}

// Generate fun facts
function generateFunFacts(ageData) {
  const facts = [];

  // Age-based facts
  if (ageData.years >= 18) {
    facts.push(`Anda sudah ${ageData.years >= 21 ? "dewasa" : "remaja"}!`);
  }

  if (ageData.years >= 25) {
    facts.push(
      `Anda telah hidup selama ${ageData.totalDays.toLocaleString()} hari!`
    );
  }

  if (ageData.years >= 30) {
    facts.push(
      `Anda telah menghabiskan ${Math.floor(
        ageData.totalHours / 8
      ).toLocaleString()} jam untuk tidur (asumsi 8 jam/hari).`
    );
  }

  // Zodiac sign (simplified)
  const zodiacSign = getZodiacSign(ageData.birthDate);
  if (zodiacSign) {
    facts.push(`Zodiak Anda: ${zodiacSign}`);
  }

  // Day of week born
  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const dayOfWeek = dayNames[ageData.birthDate.getDay()];
  facts.push(`Anda lahir pada hari ${dayOfWeek}.`);

  // Season born
  const season = getSeason(ageData.birthDate);
  if (season) {
    facts.push(`Anda lahir di musim ${season}.`);
  }

  // Update facts list
  factsList.innerHTML = "";
  facts.forEach((fact) => {
    const li = document.createElement("li");
    li.textContent = fact;
    factsList.appendChild(li);
  });
}

// Get zodiac sign
function getZodiacSign(birthDate) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const zodiacSigns = [
    { name: "Capricorn", start: [12, 22], end: [1, 19] },
    { name: "Aquarius", start: [1, 20], end: [2, 18] },
    { name: "Pisces", start: [2, 19], end: [3, 20] },
    { name: "Aries", start: [3, 21], end: [4, 19] },
    { name: "Taurus", start: [4, 20], end: [5, 20] },
    { name: "Gemini", start: [5, 21], end: [6, 20] },
    { name: "Cancer", start: [6, 21], end: [7, 22] },
    { name: "Leo", start: [7, 23], end: [8, 22] },
    { name: "Virgo", start: [8, 23], end: [9, 22] },
    { name: "Libra", start: [9, 23], end: [10, 22] },
    { name: "Scorpio", start: [10, 23], end: [11, 21] },
    { name: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  for (const sign of zodiacSigns) {
    if (
      (month === sign.start[0] && day >= sign.start[1]) ||
      (month === sign.end[0] && day <= sign.end[1])
    ) {
      return sign.name;
    }
  }

  return null;
}

// Get season
function getSeason(birthDate) {
  const month = birthDate.getMonth() + 1;

  if (month >= 3 && month <= 5) return "Semi";
  if (month >= 6 && month <= 8) return "Panas";
  if (month >= 9 && month <= 11) return "Gugur";
  return "Dingin";
}

// Clear result
function clearResult() {
  console.log("Clearing result...");

  // Hide result
  resultDiv.classList.add("hidden");

  // Reset form
  ageForm.reset();

  // Clear variables
  birthDate = null;
  userName = "";

  console.log("Result cleared successfully!");
}

// Show error message
function showError(message) {
  console.error("Error:", message);

  // You could implement a toast notification or modal here
  alert(message);
}

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString("id-ID");
}

// Format date for input
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Utility functions for demonstration
function demonstrateJavaScriptBasics() {
  console.log("=== JavaScript Fundamentals Demo ===");

  // 1. Variables and Data Types
  console.log("1. Variables and Data Types:");
  let name = "John Doe"; // string
  let age = 25; // number
  let isStudent = true; // boolean
  let hobbies = ["coding", "reading", "gaming"]; // array
  let person = { name: "John", age: 25 }; // object
  let nothing = null; // null
  let notDefined = undefined; // undefined

  console.log("String:", name, typeof name);
  console.log("Number:", age, typeof age);
  console.log("Boolean:", isStudent, typeof isStudent);
  console.log("Array:", hobbies, typeof hobbies);
  console.log("Object:", person, typeof person);
  console.log("Null:", nothing, typeof nothing);
  console.log("Undefined:", notDefined, typeof notDefined);

  // 2. Operators
  console.log("\n2. Operators:");
  let a = 10;
  let b = 5;
  console.log("Arithmetic:", a + b, a - b, a * b, a / b, a % b);
  console.log("Comparison:", a > b, a < b, a === b, a !== b);
  console.log("Logical:", true && false, true || false, !true);

  // 3. Built-in Functions
  console.log("\n3. Built-in Functions:");
  console.log(
    "Math functions:",
    Math.max(1, 2, 3),
    Math.min(1, 2, 3),
    Math.round(3.7)
  );
  console.log(
    "String functions:",
    "Hello".toUpperCase(),
    "WORLD".toLowerCase()
  );
  console.log("Array functions:", hobbies.length, hobbies.includes("coding"));

  // 4. Functions
  console.log("\n4. Functions:");
  function greet(name) {
    return `Hello, ${name}!`;
  }
  console.log("Function result:", greet("World"));

  // Arrow function
  const add = (x, y) => x + y;
  console.log("Arrow function:", add(5, 3));

  // 5. DOM Manipulation
  console.log("\n5. DOM Manipulation:");
  console.log("Current page title:", document.title);
  console.log("Number of elements:", document.querySelectorAll("*").length);

  console.log("=== End Demo ===");
}

// Run demonstration (uncomment to see in console)
// demonstrateJavaScriptBasics();
