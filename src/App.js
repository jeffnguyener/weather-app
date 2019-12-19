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
    this.state = {};
  }

  getWeather = async () => {
    const api_call = await fetch(`api.openweathermap.org/data/2.5/weather?q=London,uk`)
    
  }

  render() {
    return (
      <div className="App">
        <Weather />
      </div>
    );
  }
}

export default App;
