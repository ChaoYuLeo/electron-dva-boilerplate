import React, { Component } from 'react';
import { Icon } from 'antd';
import { ipcRenderer } from 'electron'
import styles from './index.scss';

const windowNames = {
  '/login': 'loginWindow',
  '/conf': 'confWindow'
}

export default class TopHeader extends Component {
  constructor(props) {
    super(props)
    this.window = windowNames[props.history.location.pathname] || 'mainWindow'
    this.state = {
      hasConf: false,
      isTransparentHeader: false,
      isConf: false
    }
  }

  componentWillMount() {
    this.init(this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.pathname != this.props.history.location.pathname) {
      this.init(nextProps.history)
    }
  }

  init = (history) => {
    const pathname = history.location.pathname
    const firstPath = pathname.split('/')[1]
    const hasConf = firstPath == 'home' || firstPath == 'base'
    const isTransparentHeader = pathname == '/login'
    const isConf = pathname == '/conf'
    this.setState({
      hasConf,
      isTransparentHeader,
      isConf
    })
  }

  openConf = () => {
    ipcRenderer.send('open-conf-window')
    ipcRenderer.send('reload-conf')
  }

  onMinus = () => {
    ipcRenderer.send('window-minus', this.window)
  }

  onClose = () => {
    ipcRenderer.send('window-close', this.window)
  }

  render() {
    const { hasConf, isTransparentHeader, isConf } = this.state

    const headerStyle = {
      backgroundColor: isTransparentHeader ? 'transparent' : '#f0ebed',
      position: isTransparentHeader ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      right: 0
    }

    const settingStyle = process.platform == 'win32' ? {
      float: 'left',
      marginLeft: 12
    } : {}

    return (
      <div className="drag-header" style={headerStyle}>
        { process.platform == 'win32' ?
          <span className={`${styles.titleBtn} no-drag`}>
            {!isConf ? <Icon type="plus-circle" onClick={this.onPlus}/> : null}
            {!isConf ? <Icon type="minus-circle" onClick={this.onMinus} /> : null}
            <Icon type="close-circle" onClick={this.onClose}/>
          </span>
          : null
        }
        {hasConf ?
          <span className={`${styles.controlBtn} no-drag`} style={settingStyle}>
            <Icon onClick={this.openConf} type="setting" />
          </span>
          : null
        }
      </div>
    );
  }
}
