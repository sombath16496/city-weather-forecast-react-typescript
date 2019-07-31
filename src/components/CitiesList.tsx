import React, {useState} from "react";
import { RouteProps } from "react-router";
import { Link } from "react-router-dom";
import getCities from "../services/getCities";

interface IProps {
  history: any;
}

const CitiesList: React.FC<RouteProps & IProps> = props => {
  const service = getCities();

  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([""]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(service.status === "loaded"){
      const suggestions = service.payload.list.map(city => city.name);
      const userInput = event.target.value;
      const filteredSuggestions = suggestions.filter((suggestion) => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1);
      setActiveSuggestion(0);
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setUserInput(event.target.value);
    }
  };

  const keyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // User pressed the enter key, update the input and close the suggestions 
    if (event.keyCode === 13) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
      props.history.push("/city-name/" + event.currentTarget.value);
    }

    // User pressed the up arrow, decrement the index
    else if (event.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    // User pressed the down arrow, increment the index
    else if (event.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLElement>) => {

    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(event.currentTarget.innerText);
  };

  const isShowSuggestions = showSuggestions && userInput;
  const isFilteredSuggestionsEmpty = !filteredSuggestions.length;

  return (
    <div className="container">
      <div className="container search">
        <label className="search-label">Search for your city</label>
        <input
          type="text"
          className="form-control searchInput"
          onKeyDown={keyPressed}
          onChange={onChange}
          value={userInput}
        />

        {isShowSuggestions ? (isFilteredSuggestionsEmpty ? 
          (<div className="no-suggestions">
            <em>No suggestions!</em>
          </div>) :
          (<ul className="list-group">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion} className="list-group-item" onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>) 
        ) : null}
        
      </div>
      <div className="container">
        <h2>City list</h2>
        <p>Click on the city name to get extended forecast</p>
        <div>
          <table id="citiesTable" className="table">
            <thead>
              <tr>
                <th>City name</th>
                <th>Average temperature (C)</th>
                <th>Average wind strength (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {service.status === "loaded" &&
                service.payload.list.map(city => (
                  <tr key={city.id}>
                    <td className="forecast-info-main">
                      <img
                        src={`https://openweathermap.org/img/w/${
                          city.weather[0].icon
                        }.png`}
                        className="forecast-icon"
                        alt="forecast"
                      />
                      <Link to={`/city/${city.id}`}>{city.name}</Link>
                    </td>
                    <td className="forecast-info">{city.main.temp}</td>
                    <td className="forecast-info-sec">{city.wind.speed}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CitiesList;
