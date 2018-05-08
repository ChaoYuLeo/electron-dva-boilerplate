import axios from 'axios';
import hospitalConf from './hospital';
import { remote } from 'electron'
import fs from 'fs'
import qs from 'qs'
import path from 'path'

function HospitalDalApi(methodName, data, type = 'form') {
  const appConf = remote.getGlobal('settingConfig')
  let mode = appConf.mode
  let hospitalDal = appConf.baseUrl.hospitalDal
  if (!hospitalDal[mode]) return remote.dialog.showErrorBox('配置错误', '无法生成正确的服务实例，请检查配置')
  const hospitalDalInstance = axios.create({
    baseURL: hospitalDal[mode]
  })
  const conf = hospitalConf[methodName]
  if (!conf) return ({
    then(fn) {
      fn('method dont have')
    },
    catch(fn) {
      fn('method dont have')
    }
  })
  let p = null
  if (conf.method == 'get') {
    p = hospitalDalInstance.get(`${conf.url}?${qs.stringify(data)}`)
  } else if (conf.method == 'delete') {
    p = hospitalDalInstance.delete(`${conf.url}?${qs.stringify(data)}`)
  } else {
    let options = {
      data: type == 'json' ? data : qs.stringify(data)
    }
    if (type == 'form') {
      options.headers = { 'content-type': 'application/x-www-form-urlencoded' }
    }
    p = hospitalDalInstance[conf.method](conf.url, options)
  }
  return p
}

export default {
  HospitalDalApi
}
