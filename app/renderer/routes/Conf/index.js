import React, { Component } from 'react';
import { Form, Radio, Input, Button, message } from 'antd';
import { ipcRenderer, remote } from 'electron'
import styles from './index.scss'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

export default class ConfPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'dev',
      baseUrl: {
        hospitalDal: {
          dev: '',
          prod: ''
        }
      }
    }
  }

  componentWillMount() {
    this.initState()
    remote.ipcMain.on('reload-conf', (event) => {
      this.initState()
    })
    ipcRenderer.on('start-reload-page', (event) => {
      ipcRenderer.send('reload-page')
    })
  }

  initState = () => {
    const modeInfo = ipcRenderer.sendSync('get-mode-info')
    this.setState(modeInfo)
  }

  onModeChange = ({target: {value}}) =>{
    this.setState({mode: value})
  }

  setUrl = (mode, url) => {
    this.setState({
      baseUrl: {
        hospitalDal: {
          ...this.state.baseUrl.hospitalDal,
          [mode]: url
        }
      }
    })
  }

  onSaveConf = () => {
    const conf = {
      mode: this.state.mode,
      baseUrl: this.state.baseUrl
    }
    if (!conf.baseUrl.hospitalDal.dev || !conf.baseUrl.hospitalDal.prod) {
      return message.error('请将配置填写完整！')
    }
    ipcRenderer.send('save-config', conf)
  }

  render() {
    const { mode, baseUrl: { hospitalDal: { dev, prod } } } = this.state

    return (
      <div style={{padding: '15px 20px'}}>
        <div className={styles.control} style={{position: 'absolute', top: '7px', zIndex: 99}}>
          <h3 style={{marginLeft: 68}}>基础配置</h3>
        </div>
        <Form>
          <FormItem
            {...formItemLayout}
            label="运行模式："
          >
            <RadioGroup value={mode} onChange={this.onModeChange}>
              <Radio value="dev">测试环境</Radio>
              <Radio value="prod">正式环境</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="测试环境URL："
          >
            <Input value={dev} onChange={({target: {value}}) => this.setUrl('dev', value)} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="正式环境URL："
          >
            <Input value={prod} onChange={({target: {value}}) => this.setUrl('prod', value)}  />
          </FormItem>
          <div style={{textAlign: 'center', marginTop: 86}}>
            <Button onClick={this.onSaveConf} type="primary" style={{width: '128px'}}>保存配置</Button>
          </div>
        </Form>
      </div>
    );
  }
}
