import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Map, Marker } from "pigeon-maps";

import { useVolcanoList } from "../apiVolcano";

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
        <p>
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
        </p>
      </div>
      <div className="map">
        <useMap />
      </div>
    </div>
  );
}

/* in Volcano. Return the map */
export function useMap() {
  const MAPTILER_ACCESS_TOKEN = "wtdjX1iqaPT1nwB8myBy#0.7/9.03041/-14.85704";
  const z = 4.6997;
  const x = 4.6997;
  const y = 4.6997;
  const MAP_ID = "basic";

  function mapTiler(x, y, z, dpr) {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  }

  return (
    <Map
      provider={mapTiler}
      dprs={[1, 2]} // add this to support hidpi/retina (2x) maps if your provider supports them
      height={300}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={0}
    />
  );
}
