const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const submitButton = document.querySelector("button");
const apikey = "083815eb1b743edfa8045df57bda332b";

const weatherEmojis = {
  clear: "☀️",
  clouds: "⛅",
  rain: "🌧️",
  drizzle: "🌦️",
  thunderstorm: "⛈️",
  snow: "❄️",
  mist: "🌫️",
  smoke: "🌫️",
  haze: "🌫️",
  dust: "🌫️",
  fog: "🌫️",
  sand: "🌫️",
  ash: "🌫️",
  squall: "🌬️",
  tornado: "🌪️",
};

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeather(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError("Failed to fetch weather data. Please try again.");
    }
  } else {
    displayError("Please enter a city.");
    submitButton.disabled = true;
  }
});

cityInput.addEventListener("change", () => {
  if (submitButton.disabled) {
    submitButton.disabled = false;
  }
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity, feels_like },
    weather: [{ description, main }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const feelLikeDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("p");

  const weatherMain = main.toLowerCase();
  const emoji = weatherEmojis[weatherMain] || "";

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  feelLikeDisplay.textContent = `Feels like: ${(feels_like - 273.15).toFixed(
    0
  )}°C`;
  emojiDisplay.textContent = emoji;

  card.appendChild(cityDisplay);
  card.appendChild(emojiDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(feelLikeDisplay);

  cityDisplay.classList.add("cityDisplay");
  emojiDisplay.classList.add("weatherEmoji");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("description");
  feelLikeDisplay.classList.add("feelsLikeDisplay");
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.appendChild(errorDisplay);
}
