import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";

import { useVolcanoList } from "../api";

export default function Book() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const country = searchParams.get("country");
  const data = useVolcanoList(country).rowData;

  /*search for the right volcanoe */
  var volcanoe = {};
  data.map((elt) => {
    if (elt.time === id) {
      volcanoe = elt;
    }
  });

  return (
    <div className="volcano">
      <div className="container">
        <h1>{volcanoe.text}</h1>
        <p>Country: {volcanoe.text}</p>
        <p>Region: {volcanoe.temp}</p>
        <p>Subregion: {volcanoe.time}</p>
        <p>Last Eruption: {volcanoe.wind}</p>
        <p>Summit: {volcanoe.temp}</p>
        <p>Elevation: {volcanoe.time}</p>
        <Button
          color="info"
          size="sm"
          className="mt-3"
          onClick={() => navigate("/VolcanoList")}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
