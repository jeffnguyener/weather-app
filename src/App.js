import React from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";

import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//API CALL - api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "82c474b0047181f823e85c3e413f2346";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      icon: "",
      main: "",
      fahrenheit: "",
      temp_max: "",
      temp_min: "",
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calFahrenheit(temp) {
    let cel = Math.floor(temp - 273.15);
    let fahr = (cel * 9) / 5 + 32;
    let convertCtoF = Math.round(fahr);
    return convertCtoF;
  }

  windSpeed(speed){
    let ws = Math.round(speed)
    return ws;
  }

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        fahrenheit: this.calFahrenheit(response.main.temp),
        temp_max: this.calFahrenheit(response.main.temp_max),
        temp_min: this.calFahrenheit(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
        wind: this.windSpeed(response.wind.speed)
      });
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_fahrenheit={this.state.fahrenheit}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
          wind={this.state.wind}
        />
      </div>
    );
  }
}

export default App;
