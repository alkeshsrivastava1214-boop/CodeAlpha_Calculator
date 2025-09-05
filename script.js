const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

function calculate() {
  try {
    // Replace symbols with JS operators
    let expression = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    // ❌ Prevent eval if last char is operator
    if (/[\+\-\*\/%]$/.test(expression)) {
      return;
    }

    // ✅ Calculate result
    currentInput = eval(expression).toString();
    display.value = currentInput;
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    } 
    else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } 
    else if (value === "=") {
      calculate();
    } 
    else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// ✅ Keyboard support
document.addEventListener("keydown", (event) => {
  if ((event.key >= "0" && event.key <= "9") || "+-*/.%".includes(event.key)) {
    currentInput += event.key;
    display.value = currentInput;
  } 
  else if (event.key === "Enter") {
    calculate();
  } 
  else if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } 
  else if (event.key === "Escape") {
    currentInput = "";
    display.value = "";
  }
});
