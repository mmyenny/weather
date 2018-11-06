const addWeatherToPage = weather => {
  let weatherInformation = document.querySelector('ul')
  // zap all the html inside that UL (delete whatever might already be there)
  weatherInformation.innerHTML = ''

  let tempLI = document.createElement('li')
  tempLI.textContent = `Temperature: ${weather.main.temp} F`
  weatherInformation.appendChild(tempLI)

  let humidityLI = document.createElement('li')
  humidityLI.textContent = `Humidity: ${weather.main.humidity}%`
  weatherInformation.appendChild(humidityLI)

  let windLI = document.createElement('li')
  windLI.textContent = `Wind: ${weather.wind.speed} mph`
  weatherInformation.appendChild(windLI)
}

const cityWeatherSearch = () => {
  let inputSearch = document.querySelector('input')

  let cityName = inputSearch.value

  let cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=c41f56ca4bf0ad336c93e8389a094c98`

  fetch(cityURL)
    .then(response => {
      return response.json()
    })
    .then(weather => {
      addWeatherToPage(weather)
    })
}

const main = () => {
  let searchButton = document.querySelector('.search')
  searchButton.addEventListener('click', cityWeatherSearch)
}

document.addEventListener('DOMContentLoaded', main)
// &APPID=c41f56ca4bf0ad336c93e8389a094c98

//- [x] Create a search button for user
// - [x] Allow user to enter input- city or zip
// 1. Allow user to submit input in button
//     1. Find input
//     2. Read value
// 2. Display elements of weather in a list form
//     1. Build url
//     2. Use fetch to request url
//     3. Get back data
//     4. Find temp and humidity
//     5. Add temp and humidity to webpage
