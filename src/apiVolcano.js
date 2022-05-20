import { useEffect, useState } from "react";

const API_KEY = "de867676b7ca457aa7041433220504";

/* in VolcanoList. Returns data for the grid */
/*in Volcano. Returns data for the volcano selected */
export function useVolcanoList(country) {
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetVolcanoList(country)
      .then((volcanoList) => {
        setRowData(volcanoList);
        setLoading(false);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [country]);

  return {
    loading,
    rowData,
    error
  };
}

function GetVolcanoList(country) {
  const token = localStorage.getItem("token");
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer" + token
  };

  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${country}`,
    { headers }
  )
    .then((res) => res.json())
    .then((works) =>
      works.forecast.forecastday[0].hour.map((work) => {
        return {
          time: work.time,
          text: work.condition.text,
          temp: work.temp_c,
          wind: work.wind_kph,
          icon: work.condition.icon
        };
      })
    )
    .catch((error) => console.log(error));
}
