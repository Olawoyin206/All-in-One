    // ELEMENT SELECTORS

    const historyDisplay = document.getElementById("historyDisplay");
    const inputDisplay = document.getElementById("inputDisplay");
    const resultDisplay = document.getElementById("resultDisplay");
    const buttons = document.querySelectorAll("button");
    const clearBtn = document.getElementById("clearBtn");
    const equalsBtn = document.getElementById("equalsBtn");

    // CONSTANTS & STATE

    const OPERATORS = ["+", "-", "*", "/", "%"];
    const MAX_HISTORY_ITEMS = 3;
    let currentInput = "";
    equalsBtn.disabled = true;
    let lastResult = null;
    let justCalculated = false;

    // MAIN BUTTON HANDLER

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "⌫") return handleBackspace();
        if (value === "=") return handleEquals();
        if (value === "%") return applyPercentage();
        handleInput(value);
      });
    });

    // INPUT HANDLING

    function handleInput(value) {
      // ✅ If last action was "=" and user presses an operator
      if (justCalculated && OPERATORS.includes(value)) {
        currentInput = lastResult.toString();
        justCalculated = false;
      }

      // If user types a number after "=", start fresh
      if (justCalculated && !OPERATORS.includes(value)) {
        currentInput = "";
        resultDisplay.value = "";
        justCalculated = false;
      }
      if (isInvalidOperatorStart(value)) return;

      replaceDoubleOperator(value);
      preventMultipleDecimals(value);

      currentInput += value;
      updateDisplays();

      if (value !== "=" && value !== "C" && value !== "AC") {
        clearBtn.textContent = "C";
      }
      toggleEqualsButton();
      updateLiveResult();
    }

    function isInvalidOperatorStart(value) {
      return OPERATORS.includes(value) && currentInput === "";
    }

    function replaceDoubleOperator(value) {
      const lastChar = currentInput.slice(-1);
      if (OPERATORS.includes(value) && OPERATORS.includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
      }
    }

    function preventMultipleDecimals(value) {
      if (value !== ".") return;

      const lastNumber = currentInput.split(/[\+\−×÷]/).pop();
      if (lastNumber.includes(".")) {
        throw new Error("Multiple decimals");
      }
    }

    // DISPLAY UPDATES

    function updateDisplays() {
      inputDisplay.value = currentInput;
      resultDisplay.style.display = "block";
      inputDisplay.style.fontSize = "50px";
      resultDisplay.style.opacity = "0.7";
      resultDisplay.style.fontSize = "20px";
    }

    // CLEAR / BACKSPACE

    clearBtn.addEventListener("click", () => {
      if (clearBtn.textContent === "AC") resetAll();
      else clearInput();
    });

    function resetAll() {
      currentInput = "";
      inputDisplay.value = "";
      resultDisplay.value = "";
      historyDisplay.innerHTML = "";
      clearBtn.textContent = "AC";
      toggleEqualsButton();
    }

    function clearInput() {
      currentInput = "";
      inputDisplay.value = "";
      clearBtn.textContent = "AC";
      toggleEqualsButton();
    }

    function handleBackspace() {
      if (!currentInput) return;
      currentInput = currentInput.slice(0, -1);
      inputDisplay.value = currentInput;

      // Clear result if input becomes empty
      if (!currentInput) {
        resultDisplay.value = "";
      }

      toggleEqualsButton();
      updateLiveResult();
    }

    // CALCULATIONS

    function handleEquals() {
      if (!currentInput) return;
      try {
        const result = eval(currentInput);

        addToHistory(currentInput, result);

        resultDisplay.value = "= " + result;
        resultDisplay.style.fontSize = "30px";
        resultDisplay.style.opacity = "1";
        inputDisplay.style.fontSize = "20px";

        lastResult = result; // save result
        justCalculated = true; // flag last action

        currentInput = "";
        inputDisplay.value = "";
        equalsBtn.disabled = true;
      } catch {
        resultDisplay.value = "Error";
      }
    }

    function updateLiveResult() {
      // If input is empty, clear result
      if (!currentInput.trim()) {
        resultDisplay.value = "";
        return;
      }

      // Don't evaluate if input ends with operator
      if (endsWithOperator()) {
        resultDisplay.value = "";
        return;
      }

      try {
        const preview = eval(currentInput);

        // Prevent showing undefined / NaN
        if (preview === undefined || Number.isNaN(preview)) {
          resultDisplay.value = "";
          return;
        }

        resultDisplay.value = "= " + preview;
      } catch {
        resultDisplay.value = "";
      }
    }

    function endsWithOperator() {
      return OPERATORS.includes(currentInput.slice(-1));
    }

    function applyPercentage() {
      if (!currentInput) return;
      currentInput = `(${currentInput})/100`;
      inputDisplay.value = currentInput;
    }

    // HISTORY

    function addToHistory(expression, result) {
      const historyItem = document.createElement("div");
      historyItem.textContent = `${expression} = ${result}`;
      historyDisplay.appendChild(historyItem);

      if (historyDisplay.children.length > MAX_HISTORY_ITEMS) {
        historyDisplay.removeChild(historyDisplay.children[0]);
      }
    }

    // UI STATE HELPERS

    function toggleEqualsButton() {
      equalsBtn.disabled = currentInput.trim() === "";
    }
