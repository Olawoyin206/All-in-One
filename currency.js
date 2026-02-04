// ELEMENT SELECTORS

const currencyInput1 = document.getElementById("currencyInput1");
const currencyInput2 = document.getElementById("currencyInput2");
const countryList1 = document.getElementById("countryList1");
const countryList2 = document.getElementById("countryList2");
const swapBtn = document.getElementById("swapBtn");

const buttons = document.querySelectorAll("#buttonsContainer button");
const clearBtn = document.getElementById("clearBtn");
const equalsBtn = document.getElementById("equalsBtn");

// STATE

let currentInput = "";
let exchangeRates = {};
let isDataLoaded = false;

// COMPREHENSIVE CURRENCY LIST

const CURRENCIES = [
  // Major Currencies
  {
    code: "USD",
    name: "United States Dollar",
    country: "United States",
    symbol: "$",
  },
  { code: "EUR", name: "Euro", country: "European Union", symbol: "€" },
  {
    code: "GBP",
    name: "British Pound",
    country: "United Kingdom",
    symbol: "£",
  },
  { code: "JPY", name: "Japanese Yen", country: "Japan", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", country: "China", symbol: "¥" },
  {
    code: "AUD",
    name: "Australian Dollar",
    country: "Australia",
    symbol: "A$",
  },
  { code: "CAD", name: "Canadian Dollar", country: "Canada", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", country: "Switzerland", symbol: "Fr" },
  { code: "INR", name: "Indian Rupee", country: "India", symbol: "₹" },

  // African Currencies
  { code: "NGN", name: "Nigerian Naira", country: "Nigeria", symbol: "₦" },
  {
    code: "ZAR",
    name: "South African Rand",
    country: "South Africa",
    symbol: "R",
  },
  { code: "EGP", name: "Egyptian Pound", country: "Egypt", symbol: "E£" },
  { code: "KES", name: "Kenyan Shilling", country: "Kenya", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi", country: "Ghana", symbol: "GH₵" },
  {
    code: "TZS",
    name: "Tanzanian Shilling",
    country: "Tanzania",
    symbol: "TSh",
  },
  { code: "UGX", name: "Ugandan Shilling", country: "Uganda", symbol: "USh" },
  { code: "MAD", name: "Moroccan Dirham", country: "Morocco", symbol: "DH" },
  { code: "ETB", name: "Ethiopian Birr", country: "Ethiopia", symbol: "Br" },
  {
    code: "XOF",
    name: "West African CFA Franc",
    country: "West Africa",
    symbol: "CFA",
  },
  {
    code: "XAF",
    name: "Central African CFA Franc",
    country: "Central Africa",
    symbol: "FCFA",
  },
  { code: "DZD", name: "Algerian Dinar", country: "Algeria", symbol: "DA" },
  { code: "TND", name: "Tunisian Dinar", country: "Tunisia", symbol: "DT" },
  { code: "AOA", name: "Angolan Kwanza", country: "Angola", symbol: "Kz" },
  { code: "BWP", name: "Botswana Pula", country: "Botswana", symbol: "P" },
  { code: "MUR", name: "Mauritian Rupee", country: "Mauritius", symbol: "₨" },
  { code: "ZMW", name: "Zambian Kwacha", country: "Zambia", symbol: "ZK" },
  { code: "RWF", name: "Rwandan Franc", country: "Rwanda", symbol: "FRw" },
  { code: "SDG", name: "Sudanese Pound", country: "Sudan", symbol: "SDG" },

  // Middle East
  {
    code: "AED",
    name: "UAE Dirham",
    country: "United Arab Emirates",
    symbol: "د.إ",
  },
  { code: "SAR", name: "Saudi Riyal", country: "Saudi Arabia", symbol: "﷼" },
  { code: "ILS", name: "Israeli Shekel", country: "Israel", symbol: "₪" },
  { code: "QAR", name: "Qatari Riyal", country: "Qatar", symbol: "QR" },
  { code: "KWD", name: "Kuwaiti Dinar", country: "Kuwait", symbol: "KD" },

  // Asia
  {
    code: "KRW",
    name: "South Korean Won",
    country: "South Korea",
    symbol: "₩",
  },
  { code: "SGD", name: "Singapore Dollar", country: "Singapore", symbol: "S$" },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
    country: "Hong Kong",
    symbol: "HK$",
  },
  { code: "THB", name: "Thai Baht", country: "Thailand", symbol: "฿" },
  { code: "MYR", name: "Malaysian Ringgit", country: "Malaysia", symbol: "RM" },
  {
    code: "IDR",
    name: "Indonesian Rupiah",
    country: "Indonesia",
    symbol: "Rp",
  },
  { code: "PHP", name: "Philippine Peso", country: "Philippines", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong", country: "Vietnam", symbol: "₫" },
  { code: "PKR", name: "Pakistani Rupee", country: "Pakistan", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", country: "Bangladesh", symbol: "৳" },

  // Latin America
  { code: "BRL", name: "Brazilian Real", country: "Brazil", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", country: "Mexico", symbol: "Mex$" },
  { code: "ARS", name: "Argentine Peso", country: "Argentina", symbol: "AR$" },
  { code: "CLP", name: "Chilean Peso", country: "Chile", symbol: "CLP$" },
  { code: "COP", name: "Colombian Peso", country: "Colombia", symbol: "COL$" },
  { code: "PEN", name: "Peruvian Sol", country: "Peru", symbol: "S/" },

  // Europe (non-EUR)
  { code: "SEK", name: "Swedish Krona", country: "Sweden", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", country: "Norway", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", country: "Denmark", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", country: "Poland", symbol: "zł" },
  {
    code: "CZK",
    name: "Czech Koruna",
    country: "Czech Republic",
    symbol: "Kč",
  },
  { code: "HUF", name: "Hungarian Forint", country: "Hungary", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", country: "Romania", symbol: "lei" },
  { code: "TRY", name: "Turkish Lira", country: "Turkey", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", country: "Russia", symbol: "₽" },

  // Others
  {
    code: "NZD",
    name: "New Zealand Dollar",
    country: "New Zealand",
    symbol: "NZ$",
  },
  { code: "IQD", name: "Iraqi Dinar", country: "Iraq", symbol: "IQD" },
];

// CURRENCY MAP FOR QUICK ACCESS

const currencyMap = {};
CURRENCIES.forEach((currency) => {
  currencyMap[currency.code] = currency;
});

// POPULATE CURRENCY DROPDOWNS

function populateCurrencyList() {
  countryList1.innerHTML = "";
  countryList2.innerHTML = "";

  const sortedCurrencies = [...CURRENCIES].sort((a, b) =>
    a.country.localeCompare(b.country),
  );

  sortedCurrencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency.code;
    option1.textContent = `${currency.country} (${currency.code})`;

    const option2 = option1.cloneNode(true);

    countryList1.appendChild(option1);
    countryList2.appendChild(option2);
  });

  countryList1.value = "NGN";
  countryList2.value = "USD";

  console.log("Currency list populated");
}

// FORMAT NUMBER WITH COMMAS

function formatWithCommas(number) {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// REMOVE COMMAS FROM STRING

function removeCommas(str) {
  return str.replace(/,/g, "");
}

// UPDATE INPUT DISPLAY

function updateInput1Display() {
  if (!currentInput) {
    currencyInput1.value = "";
    return;
  }

  const formatted = formatWithCommas(currentInput);
  currencyInput1.value = formatted;
}

function updateInput2Display(value) {
  if (!value) {
    currencyInput2.value = "";
    return;
  }

  const formatted = formatWithCommas(value);
  currencyInput2.value = formatted;
}

// FETCH EXCHANGE RATES

async function fetchRates() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    exchangeRates = data.rates;
    exchangeRates["USD"] = 1;

    console.log(
      "Exchange rates loaded:",
      Object.keys(exchangeRates).length,
      "currencies",
    );
    isDataLoaded = true;

    if (currentInput) {
      convertCurrency();
    }
  } catch (err) {
    console.error("Rate fetch failed:", err);
    showError("Failed to load rates");
    isDataLoaded = false;

    setTimeout(() => {
      console.log("Retrying rate fetch...");
      fetchRates();
    }, 5000);
  }
}

// INITIAL LOAD

(async function init() {
  console.log("Initializing currency converter...");

  currencyInput2.placeholder = "Loading...";

  populateCurrencyList();

  await fetchRates();

  currencyInput1.placeholder = "0";
  currencyInput2.placeholder = "0";

  console.log("Initialization complete");
})();

// BUTTON INPUT

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") return resetAll();
    if (value === "⌫") return backspace();
    if (value === "=") return convertCurrency();

    if (["+", "-", "*", "/", "%"].includes(value)) return;

    if (value === "." && currentInput.includes(".")) return;

    if (currentInput === "0" && value !== ".") {
      currentInput = value;
    } else if (currentInput === "" && value === "00") {
      currentInput = "0";
    } else {
      currentInput += value;
    }

    if (currentInput.length > 15) {
      currentInput = currentInput.slice(0, 15);
    }

    updateInput1Display();
    convertCurrency();
  });
});

// SWAP BUTTON FUNCTIONALITY

if (swapBtn) {
  swapBtn.addEventListener("click", () => {
    // Swap currencies
    const temp = countryList1.value;
    countryList1.value = countryList2.value;
    countryList2.value = temp;

    // Swap values (extract numbers only, remove commas)
    const value1 = removeCommas(currencyInput1.value);
    const value2 = removeCommas(currencyInput2.value);

    currentInput = value2 || "";

    updateInput1Display();
    convertCurrency();
  });
}

// CONVERSION LOGIC

function convertCurrency() {
  if (!isDataLoaded) {
    currencyInput2.value = "Loading...";
    return;
  }

  if (!currentInput || currentInput === "" || currentInput === "0") {
    currencyInput2.value = "";
    return;
  }

  const fromCurrency = countryList1.value;
  const toCurrency = countryList2.value;

  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    currencyInput2.value = "Rate N/A";
    console.warn(`Missing rates for ${fromCurrency} or ${toCurrency}`);
    return;
  }

  const amount = parseFloat(currentInput);

  if (isNaN(amount) || amount < 0) {
    currencyInput2.value = "Invalid";
    return;
  }

  if (fromCurrency === toCurrency) {
    updateInput2Display(currentInput);
    return;
  }

  // Convert via USD
  const usdAmount = amount / exchangeRates[fromCurrency];
  const converted = usdAmount * exchangeRates[toCurrency];

  // Smart formatting
  let formattedResult;
  if (converted >= 1000000) {
    formattedResult = converted.toFixed(0);
  } else if (converted >= 100) {
    formattedResult = converted.toFixed(2);
  } else if (converted >= 1) {
    formattedResult = converted.toFixed(4);
  } else {
    formattedResult = converted.toFixed(6);
  }

  // Remove trailing zeros
  formattedResult = parseFloat(formattedResult).toString();

  updateInput2Display(formattedResult);
}

// HELPERS

function resetAll() {
  currentInput = "";
  currencyInput1.value = "";
  currencyInput2.value = "";
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateInput1Display();
  convertCurrency();
}

function showError(message) {
  currencyInput2.value = message;
  setTimeout(() => {
    if (!currentInput) {
      currencyInput2.value = "";
    } else {
      convertCurrency();
    }
  }, 3000);
}

// SELECT CHANGE LISTENERS

countryList1.addEventListener("change", () => {
  updateInput1Display();
  convertCurrency();
});

countryList2.addEventListener("change", () => {
  convertCurrency();
});

// KEYBOARD SUPPORT

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    const btn = Array.from(buttons).find((b) => b.textContent === e.key);
    if (btn) btn.click();
  }

  if (e.key === ".") {
    const btn = document.getElementById("decimalBtn");
    if (btn) btn.click();
  }

  if (e.key === "Backspace") {
    e.preventDefault();
    backspace();
  }

  if (e.key === "Escape") {
    resetAll();
  }

  if (e.key === "Enter") {
    convertCurrency();
  }
});

// Back button functionality
const backBtn = document.getElementById("backBtn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html#converterTitle";
  });
}
