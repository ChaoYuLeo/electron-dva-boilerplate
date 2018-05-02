import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { Icon, Spin } from 'antd';
import { ipcRenderer, remote } from 'electron'
import TopHeader from '../components/TopHeader'
import HomePage from './Home';
import LoginPage from './Login';
import ConfPage from './Conf';
import ReloadPage from './Home/ReloadPage'
import styles from './index.scss'

const { ConnectedRouter } = routerRedux;

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    remote.ipcMain.on('reload-page', (event) => {
      const path = '/rootreload?redirect='+this.props.history.location.pathname
      this.props.history.replace(path)
      this.props.dispatch({type: 'hospital/reinit'})
    })
  }

  render() {
    return (
      <Fragment>
        {this.props.app.loading ?
          <div className={styles.loadingBlur} >
            <Spin spinning={this.props.app.loading} />
          </div>
          : null
        }
        <TopHeader history={this.props.history} />
        <ConnectedRouter history={this.props.history}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/conf" component={ConfPage} />
            <Route path="/rootreload" component={ReloadPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </Fragment>
    )
  }
}

export default connect(({
  app
}) => ({
  app
}))(App)
