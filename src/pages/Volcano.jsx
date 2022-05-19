import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Map, Marker } from "pigeon-maps";

import { useVolcanoList } from "../apiVolcano";

export default function Volcano() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const country = searchParams.get("country");
  const data = useVolcanoList(country).rowData;

  /*search for the right volcanoe */
  var volcano = {};
  data.map((elt) => {
    if (elt.time === id) {
      volcano = elt;
    }
  });

  return (
    <div className="all_volcano">
      <div className="volcano">
        <UseData {...volcano} />
      </div>
      <div className="map">
        <UseMap long={50.879} lat={50.879} />
      </div>
    </div>
  );
}

/* return the map */
function UseMap(props) {
  return (
    <Map
      height={340}
      width={500}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={2}
    >
      <Marker width={50} anchor={[props.long, props.lat]} />
    </Map>
  );
}

/* return the data */
function UseData(volcano) {
  const navigate = useNavigate();

  return (
    <div className="volcano">
      <div className="container">
        <p>
          <h1>{volcano.text}</h1>
          <p>Country: {volcano.text}</p>
          <p>Region: {volcano.temp}</p>
          <p>Subregion: {volcano.time}</p>
          <p>Last Eruption: {volcano.wind}</p>
          <p>Summit: {volcano.temp}</p>
          <p>Elevation: {volcano.time}</p>
          <Button
            color="info"
            size="sm"
            className="mt-3"
            onClick={() => navigate("/VolcanoList")}
          >
            Back
          </Button>
        </p>
      </div>
    </div>
  );
}
