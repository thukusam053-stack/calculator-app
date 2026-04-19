let display = document.getElementById("display");

// Keep track of last result
let lastResult = "";

// ✅ Append value safely
function appendValue(value) {
  if (display.value === "Error") {
    display.value = "";
  }

  display.value += value;
}

// ✅ Clear display
function clearDisplay() {
  display.value = "";
}

// ✅ Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// ✅ Safe calculation (no eval)
function calculateResult() {
  try {
    let expression = display.value
      .replace(/×/g, "*")
      .replace(/÷/g, "/");

    // Prevent invalid endings like "5+"
    if (/[\+\-\*\/.]$/.test(expression)) return;

    let result = Function('"use strict"; return (' + expression + ')')();

    display.value = result;
    lastResult = result;

  } catch {
    display.value = "Error";
  }
}

// 🔥 Keyboard support (improved)
document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);
  }

  else if (key === "Enter") {
    event.preventDefault();
    calculateResult();
  }

  else if (key === "Backspace") {
    deleteLast();
  }

  else if (key === "Escape") {
    clearDisplay();
  }
});

// 🌙 Dark mode toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggleBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ✨ Bonus: Click animation effect
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");

    setTimeout(() => {
      btn.classList.remove("active");
    }, 100);
  });
});
