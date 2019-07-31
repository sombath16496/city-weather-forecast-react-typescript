import { useEffect, useState } from "react";
import { ICity } from "../types/ICity";
import { Service } from "../types/Service";

const searchCity = (cityName: string) => {
  const [result, setResult] = useState<Service<ICity>>({
    status: "loading"
  });

  useEffect(() => {
    if (cityName) {
      setResult({ status: "loading" });
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          cityName +
          "&units=metric&appid=110ff02ed24ccd819801248373c3b208"
      )
        .then(response => response.json())
        .then(response => setResult({ status: "loaded", payload: response }))
        .catch(error => setResult({ status: "error", error }));
    }
  }, [cityName]);

  return result;
};

export default searchCity;
