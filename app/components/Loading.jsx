import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    marginTop: '50px',
    marginLeft: '50px'
  },
};

const Loading = () => (
  <div style={style.container}>
    <CircularProgress size={80} thickness={5} style={ style.refresh } />
  </div>
);

export default Loading;