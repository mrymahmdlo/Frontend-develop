import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import React, { useEffect, useRef } from 'react';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([50.889482059680475, 36.811547180371655]),
        maxZoom: 18,
        zoom: 18
      })
    });

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([50.889482059680475, 36.811547180371655]))
    });

    const iconStyle = new Style({
      image: new Icon({
        src: '/assets/images/location-marker.png',
        scale: 0.5 // adjust icon size if needed
      })
    });
    iconFeature.setStyle(iconStyle);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [iconFeature]
      })
    });
    map.addLayer(vectorLayer);

    return () => {
      map.setTarget();
    };
  }, []);

  return (
      <div
        ref={mapRef}
        id='map'
        style={{ width: '100%', height: '400px' }}
      ></div>
  );
};

export default MapComponent;
