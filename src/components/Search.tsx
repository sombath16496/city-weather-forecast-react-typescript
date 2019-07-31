import React from "react";
import { RouteProps } from "react-router";
import searchCity from "../services/searchCity";

interface IProps {
  match: any;
  history: any;
}

const Search: React.FC<RouteProps & IProps> = props => {
  const service = searchCity(props.match.params.name);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.history.goBack();
  };

  return (
    <div className="container">
      <div className="cityForecast">
        <h1>City forecast in the next hours</h1>
        <p>Extended forecast for every 3 hours in the next 5 days</p>
      </div>
      <div id="map" />
      <div className="container" id="cityCont">
        <button className="btn btn-primary" onClick={handleClick}>
          GoBack
        </button>
        {service.status === "loaded" && (
          <h2>
            <img
              src={`https://openweathermap.org/img/w/${
                service.payload.list[0].weather[0].icon
              }.png`}
              className="forecast-icon"
              alt="forecast"
            />
            {service.payload.list[0].weather[0].description} in{" "}
            {service.payload.city.name}, {service.payload.city.country}
          </h2>
        )}
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>At (date-time)</th>
                <th>Temperature min/max (C)</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <th>Forecast</th>
                <th />
                <th>Wind speed (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {service.status === "loaded" &&
                service.payload.list.map(cityForecast => (
                  <tr key={cityForecast.dt}>
                    <td className="forecast-info forecast-0">
                      {cityForecast.dt_txt}
                    </td>
                    <td className="forecast-info forecast-1">
                      {cityForecast.main.temp_min}/{cityForecast.main.temp_max}
                    </td>
                    <td className="forecast-info forecast-2">
                      {cityForecast.main.pressure}
                    </td>
                    <td className="forecast-info forecast-3">
                      {cityForecast.main.humidity}
                    </td>
                    <td className="forecast-info forecast-4">
                      <img
                        src={`https://openweathermap.org/img/w/${
                          cityForecast.weather[0].icon
                        }.png`}
                        className="forecast-icon"
                        alt="forecast"
                      />
                    </td>
                    <td className="forecast-info forecast-4">
                      {cityForecast.weather[0].description}
                    </td>
                    <td className="forecast-info forecast-5">
                      {cityForecast.wind.speed}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Search;
