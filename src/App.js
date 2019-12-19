import React from "react";
import Weather from "./components/Weather";

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
      fahrenheit: "",
      temp_max: "",
      temp_min: "",
      description: "",
      error: false
    };
    this.getWeather();
  }

  calFahrenheit(temp) {
    let cel = Math.floor(temp - 273.15);
    let fahr = (cel * 9) / 5 + 32;
    return fahr;
  }

  getWeather = async () => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`
    );

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country,
      icon: response.weather.icon,
      fahrenheit: this.calFahrenheit(response.main.temp),
      temp_max: response.main.temp_max,
      temp_min: response.main.temp_min,
      description: response.weather.description
    });
  };

  render() {
    return (
      <div className="App">
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_fahrenheit={this.state.fahrenheit}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
