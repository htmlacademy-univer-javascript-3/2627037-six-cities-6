import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import {MapPointType} from '../../types/map-point-type.ts';
import {OfferType} from '../../types/offer-type.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import {CityType} from '../../types/city-type.ts';

type MapProps = {
  city: CityType;
  offer: OfferType;
  points: MapPointType[];
  styleBlockName: string;
  selectedPoint?: MapPointType;
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

export function Map({ city, offer, points, styleBlockName, selectedPoint }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offer === undefined ? city.location : offer.location);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: offer === undefined ? city.location.latitude : offer.location.latitude,
          lng: offer === undefined ? city.location.longitude : offer.location.longitude,
        },
        offer === undefined ? 8 : 13
      );

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
  }, [map, offer, city, points, selectedPoint]);

  return <section className={styleBlockName} ref={mapRef}></section>;
}
