import React from "react";

const Weather = props => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
        </h5>

        {props.temp_fahrenheit ? (
          <h1 className="py-2">{props.temp_fahrenheit}&deg;</h1>
        ) : null}

        {/** show max and min temp */}
        {minmaxTemp(props.temp_min, props.temp_max)}

        <h4 className="py-3">{props.description}</h4>

        {props.wind ? <h6 className="py-2">wind @ {props.wind} mph</h6> : null}

        {props.humidity ? <h6 className="py-2">{props.humidity}% humidity</h6> : null}
      </div>
    </div>
  );
};

function minmaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
