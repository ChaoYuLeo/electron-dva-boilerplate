import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from './routes/App'

function RouterConfig({ history, app }) {
  return (
    <AppContainer>
      <App history={history} />
    </AppContainer>
  );
}

export default RouterConfig;
