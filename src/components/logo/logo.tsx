export type LogoProps = {
  placingType: string;
  link?: string;
  width: number;
  height: number;
}

export function Logo({placingType, link, width, height}: LogoProps) {
  return (
    <a
      className={`${link === undefined ? `${placingType}__logo-link--active ` : ''}${placingType}__logo-link`}
      href={link}
    >
      <img
        className={`${placingType}__logo`}
        src="../../../markup/img/logo.svg"
        alt="6 cities logo"
        width={`${width}`}
        height={`${height}`}
      >
      </img>
    </a>
  );
}
