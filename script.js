// script.js

const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

const history = document.getElementById("history");

const themeToggle = document.getElementById("theme-toggle");

const copyBtn = document.getElementById("copy-btn");

let currentInput = "";

/* BUTTON CLICK EVENTS */

buttons.forEach(button => {

  button.addEventListener("click", () => {

    const value = button.textContent;

    handleInput(value);
  });
});

/* HANDLE INPUT */

function handleInput(value) {

  if (value === "AC") {

    clearDisplay();

  } else if (value === "DEL") {

    deleteLast();

  } else if (value === "=") {

    calculate();

  } else {

    appendValue(value);
  }
}

/* APPEND VALUES */

function appendValue(value) {

  const operators = ["+", "−", "×", "÷", "%"];

  const lastChar = currentInput.slice(-1);

  if (
    operators.includes(lastChar) &&
    operators.includes(value)
  ) {
    return;
  }

  currentInput += value;

  display.value = currentInput;
}

/* CLEAR DISPLAY */

function clearDisplay() {

  currentInput = "";

  display.value = "";
}

/* DELETE LAST */

function deleteLast() {

  currentInput = currentInput.slice(0, -1);

  display.value = currentInput;
}

/* CALCULATE */

function calculate() {

  try {

    let expression = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    const result = eval(expression);

    addToHistory(currentInput, result);

    currentInput = result.toString();

    display.value = currentInput;

  } catch {

    display.value = "Error";

    currentInput = "";
  }
}

/* HISTORY */

function addToHistory(expression, result) {

  const item = document.createElement("div");

  item.textContent = `${expression} = ${result}`;

  history.prepend(item);
}

/* KEYBOARD SUPPORT */

document.addEventListener("keydown", (e) => {

  const key = e.key;

  if ("0123456789+-*/.%".includes(key)) {

    appendValue(key);

  } else if (key === "Enter") {

    calculate();

  } else if (key === "Backspace") {

    deleteLast();

  } else if (key === "Escape") {

    clearDisplay();
  }
});

/* THEME TOGGLE */

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {

    themeToggle.textContent = "☀";

  } else {

    themeToggle.textContent = "🌙";
  }
});

/* COPY RESULT */

copyBtn.addEventListener("click", async () => {

  if (!display.value) return;

  try {

    await navigator.clipboard.writeText(display.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {

      copyBtn.textContent = "Copy";

    }, 1500);

  } catch {

    copyBtn.textContent = "Failed";
  }
});
