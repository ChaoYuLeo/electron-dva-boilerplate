import React, { Component } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { ipcRenderer } from 'electron'
import styles from './index.css'

const FormItem = Form.Item;

@Form.create()
export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  componentWillMount() {
    ipcRenderer.on('login-fail', (event) => {
      message.error('用户名或密码错误！')
      this.setState({loading: false})
    })
  }

  login = () => {
    this.setState({loading: true})
    const { username, password } = this.state
    ipcRenderer.send('login', {username, password})
  }

  render() {
    const { username, password, loading } = this.state

    return (
      <div>
        <div className={styles.loginBanner}>
          <h1 className={styles.title}>App Name</h1>
        </div>
        <Form style={{padding: '36px 30px 0'}}>
          <FormItem>
            <Input addonBefore={<Icon type="user" />} value={username} onChange={({target}) => this.setState({username: target.value})} />
          </FormItem>
          <FormItem>
            <Input addonBefore={<Icon type="lock" />} password={password} type="password"
              onChange={({target}) => this.setState({password: target.value})}
              onPressEnter={this.login}
            />
          </FormItem>
          <div style={{textAlign: 'center'}}>
            <Button loading={loading} type="primary" style={{width: 123}} onClick={this.login}>登录</Button>
          </div>
        </Form>
      </div>
    );
  }
}
