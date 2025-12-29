import classNames from 'classnames';
import { CSSProperties, memo } from 'react';

type LogoProps = {
  placingType: string;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  link?: string;
};

function Logo({ placingType, link, width, height }: LogoProps) {
  const logo = classNames(`${placingType}__logo-link`, {
    'header__logo-link--active': placingType === 'header' && link === undefined,
    'footer__logo-link--active': placingType === 'footer' && link === undefined,
  });

  return (
    <a className={logo} href={link}>
      <img
        className={`${placingType}__logo`}
        src="../../../markup/img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      >
      </img>
    </a>
  );
}

const LogoMemo = memo(Logo);
LogoMemo.displayName = 'LogoMemo';
export default LogoMemo;
