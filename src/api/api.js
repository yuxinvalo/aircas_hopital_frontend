import axios from 'axios'
export const getUserDeviceStatus = params => { return axios.post('http://localhost:8081/info/userDeviceStatus', params).then(res => res.data) }
export const getUserDeviceStatusSize = params => { return axios.get('http://localhost:8081/info/allUserDeviceNum').then(res => res.data) }
export const getAlarmDevice = params => { return axios.get('http://localhost:8081/info/alarmUserDevice').then(res => res.data) }
