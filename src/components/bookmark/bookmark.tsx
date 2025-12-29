import classNames from 'classnames';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { getBookmarkStyle } from '../../helpers/markup-styles-provider.ts';
import { RootState } from '../../store';

type BookmarkProps = {
  inBookmarks: boolean;
  styleId: string;
  onBookmarkChange?: (active: boolean) => void;
};

function Bookmark({ inBookmarks, styleId, onBookmarkChange }: BookmarkProps) {
  const navigate = useNavigate();
  const authorizationStatus = useSelector(
    (state: RootState) => state.users.authorizationStatus,
  );
  const bookmarkStyle = getBookmarkStyle(styleId);
  const [isActive, setIsActive] = useState(inBookmarks);

  const bookmark = classNames(`${styleId}__bookmark-button button`, {
    'place-card__bookmark-button--active': isActive && styleId === 'place-card',
    'offer__bookmark-button--active': isActive && styleId === 'offer',
  });

  const handleBookmarkClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      navigate(AppRoute.Login);
    } else {
      setIsActive((prev) => !prev);
      if (onBookmarkChange) {
        onBookmarkChange(isActive);
      }
    }
  };

  return (
    <button className={bookmark} type="button" onClick={handleBookmarkClick}>
      <svg
        className={`${styleId}__bookmark-icon`}
        width={bookmarkStyle.width}
        height={bookmarkStyle.height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{`${isActive ? 'In' : 'To'} bookmarks`}</span>
    </button>
  );
}

const BookmarkMemo = memo(Bookmark);
BookmarkMemo.displayName = 'BookmarkMemo';
export default BookmarkMemo;
