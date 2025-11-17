// API CALLING
const btn = document.getElementById("SearchBtn");
const input = document.getElementById("city-input");

const city = document.getElementById("city-name");
const time = document.getElementById("city-time");
const temperature = document.getElementById("city-temp");
const feeltemp = document.getElementById("Feel-temp");
const weather = document.getElementById("weather");
const img = document.getElementById('image');

// FIXED: Use HTTPS instead of HTTP (Netlify blocks HTTP)
async function getData(cityName) {
  const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=b2b047a7577f4660a4a193329243005&q=${cityName}&aqi=yes`
  );

  return promise.json();
}

btn.addEventListener("click", async () => {
  const val = input.value.trim();

  if (val === "") {
    alert("Please enter a city name!");
    return;
  }

  try {
    const result = await getData(val);

    city.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
    time.innerText = `${result.location.localtime}`;
    weather.innerText = `${result.current.condition.text}`;
    temperature.innerText = `${result.current.temp_c} °C`;
    feeltemp.innerText = `${result.current.feelslike_c} °C`;

    // FIXED: WeatherAPI icons need HTTPS prefix
    img.style.visibility = 'visible';
    img.setAttribute('src', `https:${result.current.condition.icon}`);

  } catch (error) {
    alert("City not found! Please enter a valid city.");
  }
});
