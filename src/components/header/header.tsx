import { memo } from 'react';

import Logo from '../logo/logo.tsx';
import NavigationPanel from '../navigation-panel/navigation-panel.tsx';

type HeaderProps = {
  redirectHomeEnable?: boolean;
  hasNavigationPanel?: boolean;
};

function Header({ redirectHomeEnable, hasNavigationPanel }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo
              placingType={'header'}
              link={redirectHomeEnable ? '/' : undefined}
              width={81}
              height={41}
            />
          </div>
          {hasNavigationPanel && <NavigationPanel />}
        </div>
      </div>
    </header>
  );
}

const HeaderMemo = memo(Header);
HeaderMemo.displayName = 'HeaderMemo';
export default HeaderMemo;
