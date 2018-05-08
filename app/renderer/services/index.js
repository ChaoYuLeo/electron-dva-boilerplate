import axios from 'axios';
import hospitalConf from './hospital';
import { remote } from 'electron'
import qs from 'qs'


function HospitalDalApi(methodName, data, type = 'form') {
  const appConf = remote.getGlobal('settingConfig')
  let mode = appConf.mode
  let hospitalDal = appConf.baseUrl.hospitalDal
  if (!hospitalDal[mode]) return remote.dialog.showErrorBox('配置错误', '无法生成正确的服务实例，请检查配置')
  const hospitalDalInstance = axios.create({
    baseURL: hospitalDal[mode]
  })
  const { err, fakePromise } = checkMethod(hospitalConf, methodName)
  if (err) return fakePromise
  return genApiPromise(hospitalDalInstance)
}

function genApiPromise(instance) {
  let p = null
  if (conf.method == 'get') {
    p = instance.get(`${conf.url}?${qs.stringify(data)}`)
  } else if (conf.method == 'delete') {
    p = instance.delete(`${conf.url}?${qs.stringify(data)}`)
  } else {
    let options = {
      data: type == 'json' ? data : qs.stringify(data)
    }
    if (type == 'form') {
      options.headers = { 'content-type': 'application/x-www-form-urlencoded' }
    }
    p = instance[conf.method](conf.url, options)
  }
  return p
}

function checkMethod(config, methodName) {
  const conf = config[methodName]
  let returnValue = {
    err: false,
    fakePromise: null
  }
  if (!conf) {
    returnValue.err = true
    returnValue.fakePromise = new Promise((resolve, reject) => {
      reject('methodName error')
    })
    return returnValue
  } else {
    return returnValue
  }
}


export default {
  HospitalDalApi
}
