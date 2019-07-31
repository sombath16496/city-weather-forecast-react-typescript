import { useEffect, useState } from "react";
import { ICity } from "../types/ICity";
import { Service } from "../types/Service";

const getCities = () => {
  const [result, setResult] = useState<Service<ICity>>({
    status: "loading"
  });

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/group?id=3191281,2759794,2643743,6455259,2761369&units=metric&appid=110ff02ed24ccd819801248373c3b208"
    )
      .then(response => response.json())
      .then(response => setResult({ status: "loaded", payload: response }))
      .catch(error => setResult({ status: "error", error }));
  }, []);

  return result;
};

export default getCities;
