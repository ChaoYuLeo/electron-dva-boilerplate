/**
 * Renderer entry file
 *
 */
import React from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';
import { render } from 'react-dom';
import router from './renderer/router'
import appModel from './renderer/models/app'
import './renderer/app.global.css';

const app = dva({
  onError: function(err) {
    console.log(err)
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
// app.model(require('./models/global').default);
app.model(appModel)

// 4. Router
app.router(router);

// 5. Start
app.start('#root');


if (module.hot) {
  module.hot.accept('./renderer/routes/App', () => {
    app.router(require('./renderer/router')); // eslint-disable-line global-require
    app.start('#root');
  });
}
