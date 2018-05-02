import React, { Component } from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { Layout, Menu, Icon, Tag } from 'antd';
import SiderMenu from '../../components/SiderMenu'
import IndexPage from './IndexPage'
import SecondPage from './SecondPage'
import ReloadPage from './ReloadPage'
import { getMenuData } from '../../common/menu'
import { ipcRenderer } from 'electron'

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: ''
    }
  }


  componentWillMount() {
    const conf = ipcRenderer.sendSync('get-mode-info')
    this.setState({
      mode: conf.mode
    })
  }

  handleClick = () => {

  }

  handleMenuCollapse = () => {

  }

  render() {
    const {
      match,
      location,
    } = this.props;
    const { mode } = this.state

    return (
      <Layout style={{height: '100%'}}>
        <SiderMenu
          menuData={getMenuData()}
          collapsed={false}
          location={location}
          isMobile={false}
          onCollapse={this.handleMenuCollapse}
        />
        <Tag style={{position: 'absolute', bottom: 10, left: 10, zIndex: 99}} color="blue">Mode：{mode}</Tag>
        <Content style={{backgroundColor: '#fff'}}>
          <Switch>
            <Route
              path="/home"
              component={IndexPage}
              exact={true}
            />
            <Route
              path="/base/second"
              component={SecondPage}
              exact={true}
            />
            <Route
              path="/reload"
              component={ReloadPage}
              exact={true}
            />
          </Switch>
        </Content>
      </Layout>
    );
  }
}
