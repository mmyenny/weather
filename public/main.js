class WeatherAPI {
  getWeatherByCity(cityName) {
    // do all the work to fetch the data
    let cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=c41f56ca4bf0ad336c93e8389a094c98`

    fetch(cityURL)
      .then(response => {
        return response.json()
      })
      .then(weatherJson => {
        let weather = new Weather(weatherJson)

        let dom = new DocumentObjectModel()
        dom.addWeatherToPage(weather.temp(), weather.humidity(), weather.wind())
      })
  }

  getWeatherByZipCode(zipCode) {
    let zipURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&APPID=c41f56ca4bf0ad336c93e8389a094c98`

    fetch(zipURL)
      .then(response => {
        return response.json()
      })
      .then(weatherJson => {
        let weather = new Weather(weatherJson)

        let dom = new DocumentObjectModel()
        dom.addWeatherToPage(weather.temp(), weather.humidity(), weather.wind())
      })
  }
}

class Weather {
  constructor(weather) {
    this.weather = weather
  }

  temp() {
    return this.weather.main.temp
  }

  humidity() {
    return this.weather.main.humidity
  }

  wind() {
    return this.weather.wind.speed
  }
}

class DocumentObjectModel {
  addWeatherToPage(temp, humidity, wind) {
    let weatherInformation = document.querySelector('ul')
    // zap all the html inside that UL (delete whatever might already be there)
    weatherInformation.innerHTML = ''

    let tempLI = document.createElement('li')
    tempLI.textContent = `Temperature: ${temp} F`
    weatherInformation.appendChild(tempLI)

    let humidityLI = document.createElement('li')
    humidityLI.textContent = `Humidity: ${humidity}%`
    weatherInformation.appendChild(humidityLI)

    let windLI = document.createElement('li')
    windLI.textContent = `Wind: ${wind} mph`
    weatherInformation.appendChild(windLI)
  }

  getZipCode() {
    let inputSearch = document.querySelector('.zip-code')

    let zipCode = inputSearch.value

    return zipCode
  }

  getCityName() {
    let inputSearch = document.querySelector('.city-name')

    let cityName = inputSearch.value

    return cityName
  }
}

const cityWeatherSearch = () => {
  let dom = new DocumentObjectModel()
  let cityName = dom.getCityName()

  let weatherAPI = new WeatherAPI()
  weatherAPI.getWeatherByCity(cityName)
}

const zipWeatherSearch = () => {
  let dom = new DocumentObjectModel()
  let zipCode = dom.getZipCode()

  let weatherAPI = new WeatherAPI()
  weatherAPI.getWeatherByZipCode(zipCode)
}

const main = () => {
  let searchButton = document.querySelector('.city')
  searchButton.addEventListener('click', cityWeatherSearch)

  let zipSearchButton = document.querySelector('.zip')
  zipSearchButton.addEventListener('click', zipWeatherSearch)
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
