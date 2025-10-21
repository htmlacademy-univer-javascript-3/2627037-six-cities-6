import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {MapPointType} from '../../types/map-point-type.ts';
import {OfferType} from '../../types/offer-type.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';

type MapProps = {
  offer: OfferType;
  points: MapPointType[];
  selectedPoint: MapPointType | undefined;
  styleBlockName: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export function Map({ offer, points, selectedPoint, styleBlockName }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offer);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <section className={styleBlockName} ref={mapRef}></section>;
}
