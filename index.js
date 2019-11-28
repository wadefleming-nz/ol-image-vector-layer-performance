import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import VectorImageLayer from "ol/layer/VectorImage";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { Fill, Stroke, Style, Text } from "ol/style";
import { routes } from "./data.js";
import Feature from "ol/Feature.js";
import { LineString } from "ol/geom.js";
import { fromLonLat } from "ol/proj.js";

var lineFeatures = routes.map(function(r) {
  var feature = new Feature({
    geometry: new LineString(
      r.coordinates.map(function(c) {
        return fromLonLat(c);
      })
    )
  });
  return feature;
});

var singleLineStyleDashed = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.6)"
  }),
  stroke: new Stroke({
    color: "#319FD3",
    width: 2,
    lineDash: [5, 2],
    lineCap: "butt"
  }),
  text: new Text()
});

var doubleLineStyleNoDashes = [
  new Style({
    stroke: new Stroke({
      color: 'red',
      width: 8
    })
  }),
  new Style({
    stroke: new Stroke({
      color: '#A1A1A1',
      width: 2,
    })
  })
];

var doubleLineStyleDashed = [
  new Style({
    stroke: new Stroke({
      color: 'red',
      width: 8
    })
  }),
  new Style({
    stroke: new Stroke({
      color: '#A1A1A1',
      width: 2,
      lineDash: [5, 2],
      lineCap: 'butt'
    })
  })
];

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new VectorImageLayer({
      imageRatio: 2,
      source: new VectorSource({
        features: lineFeatures
      }),
      style: doubleLineStyleDashed
    })
  ],
  target: "map",
  view: new View({
    center: fromLonLat([-92.65, 29.75]),
    zoom: 7
  })
});

