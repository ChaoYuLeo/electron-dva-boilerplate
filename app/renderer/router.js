import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { AppContainer } from 'react-hot-loader';
import App from './routes/App'

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  return (
    <AppContainer>
      <App history={history} />
    </AppContainer>
  );
}

export default RouterConfig;
