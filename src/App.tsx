import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CitiesList from "./components/CitiesList";
import City from "./components/City";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <div className="container">
              <h1>Welcome to City Weather</h1>
              <img width="300" src="assets/img/city.jpg" />
            </div>
          </header>
          <div className="container">
            <Route exact path="/" component={CitiesList} />
            <Route path="/cities" component={CitiesList} />
            <Route path="/city/:id" component={City} />
            <Route path="/city-name/:name" component={Search} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
