// Define an object with the supported currencies and their names
const currencies = {
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    USD: "United States Dollar",
    ZAR: "South African Rand",
    MMK: "Myanmar Kyat",
  };
  
  // Get the elements from the HTML document
  const primaryCurrency = document.getElementById("primary");
  const secondaryCurrency = document.getElementById("secondary");
  const amount = document.getElementById("amount");
  const btnConvert = document.getElementById("btn-convert");
  const result = document.getElementById("result");
  const txtPrimary = document.getElementById("txt-primary");
  const txtSecondary = document.getElementById("txt-secondary");
  
  // Populate the select elements with the currency options
  primaryCurrency.innerHTML = getOptions(currencies);
  secondaryCurrency.innerHTML = getOptions(currencies);
  
  // Define a function that generates the HTML for the options
  function getOptions(data) {
    return Object.entries(data)
      .map(
        ([country, currency]) =>
          `<option value="${country}">${country} | ${currency}</option>`
      )
      .join("");
  }
  
  // Add an event listener to the button to perform the conversion
  btnConvert.addEventListener("click", fetchCurrencies);
  
  // Define a function that fetches the currency rates from an API
  function fetchCurrencies() {
    // Get the values of the selected currencies and the amount
    const primary = primaryCurrency.value;
    const secondary = secondaryCurrency.value;
    const value = amount.value;
  
    // Fetch the data from the API using your own key
    fetch(
      "https://v6.exchangerate-api.com/v6/20edd4725237f486b3d9c58c/latest/" + primary
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then((data) => {
        // Display the converted currency
        displayCurrency(data, primary, secondary, value);
      })
      .catch((error) => console.error("FETCH ERROR:", error));
  }
  
  // Define a function that displays the converted currency
  function displayCurrency(data, primary, secondary, value) {
    // Get the conversion rate from the data
    const rate = data.conversion_rates[secondary];
  
    // Calculate the converted amount
    const converted = (value * rate).toFixed(2);
  
    // Show the result paragraph
    result.style.display = "block";
  
    // Update the text content of the result paragraph
    txtPrimary.textContent = `${value} ${primary} is equal to `;
    txtSecondary.textContent = `${converted} ${secondary}`;
  }
  