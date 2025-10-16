export type LocationsPanelProps = {
  locations: string[];
}

export function LocationsPanel({locations}: LocationsPanelProps) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((location) => (
            <li key={location} className="locations__item">
              <a className={`locations__item-link tabs__item${location === 'Amsterdam' ? ' tabs__item--active' : ''}`} href={location === 'Amsterdam' ? undefined : '#'}>
                <span>{location}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
