import { memo } from 'react';

function Loading() {
  return (
    <div style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
      <img width={60} height={60} src='../../../markup/img/loading.gif' alt='Loading...'></img>
    </div>
  );
}

const LoadingMemo = memo(Loading);
LoadingMemo.displayName = 'LoadingMemo';
export default LoadingMemo;
