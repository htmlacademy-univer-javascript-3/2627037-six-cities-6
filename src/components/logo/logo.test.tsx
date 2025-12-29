import { render } from '@testing-library/react';
import faker from 'faker';
import { describe, it } from 'vitest';

import Logo from './logo.tsx';

describe('Component: Logo', () => {
  const placingType = faker.datatype.boolean() ? 'header' : 'footer';
  const link = faker.internet.url();
  const width = faker.datatype.number();
  const height = faker.datatype.number();

  it('Rendering when all values valid', () => {
    const { container } = render(
      <Logo
        placingType={placingType}
        link={link}
        width={width}
        height={height}
      />,
    );

    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('a')).toHaveAttribute('href', link);
    if (link === undefined && placingType === 'header') {
      expect(container.querySelector('a')).toHaveClass(
        'header__logo-link--active',
      );
    } else if (link === undefined && placingType === 'footer') {
      expect(container.querySelector('a')).toHaveClass(
        'footer__logo-link--active',
      );
    }

    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute('width', `${width}`);
    expect(container.querySelector('img')).toHaveAttribute(
      'height',
      `${height}`,
    );
    if (placingType === 'header') {
      expect(container.querySelector('img')).toHaveClass('header__logo');
    } else {
      expect(container.querySelector('img')).toHaveClass('footer__logo');
    }
  });
});
