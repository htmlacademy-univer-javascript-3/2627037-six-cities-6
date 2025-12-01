import {Logo} from '../logo/logo.tsx';
import {NavigationPanel} from '../navigation-panel/navigation-panel.tsx';

export type HeaderProps = {
  redirectHomeEnable?: boolean;
  omitNavigationPanel?: boolean;
}

export function Header({redirectHomeEnable, omitNavigationPanel}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo placingType={'header'} link={redirectHomeEnable ? '/' : ''} width={81} height={41} />
          </div>
          {omitNavigationPanel
            ?
            <>
            </>
            :
            <NavigationPanel />}
        </div>
      </div>
    </header>
  );
}
