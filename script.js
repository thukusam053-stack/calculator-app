let display = document.getElementById("display");

// Add number/operator
function appendValue(value) {
  display.value += value;
}

// Clear everything
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate result
function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}