import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Badge } from "reactstrap";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import "../App.css";
import { useVolcanoList } from "../apiVolcano";
import SearchBar from "../components/SearchBar";

/*display the grid*/
export default function VolcanoList() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("Brisbane");
  const { loading, rowData, error } = useVolcanoList(country);

  /*Get the list of countries */
  var countries = ["Brisbane", "Paris", "London", "Mexico"];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error !== null) {
    return <p>Error: {error}</p>;
  }

  const columns = [
    { headerName: "Time", field: "time", sortable: true, filter: true },
    { headerName: "Text", field: "text" },
    { headerName: "Temp", field: "temp" },
    { headerName: "Wind", field: "wind" }
  ];

  return (
    <div className="container">
      <SearchBar countriesToAdd={countries} onChange={setCountry} />
      <div
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "800px"
        }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination
          paginationPageSize={7}
          onRowClicked={(row) =>
            navigate(
              `/VolcanoList/Volcano?country=${country}&id=${row.data.time}`
            )
          }
        />
      </div>
    </div>
  );
}

/*get the list of countries */
function GetCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`http://sefdb02.qut.edu.au:3001countries`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);

  return countries;
}
