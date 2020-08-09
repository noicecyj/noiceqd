import logService from '../services/log'

export default {

  namespace: 'log',

  state: {
    logName: '',
    logPort: '',
    logTableData: [],
    logVisible: false,
    logFormData: {},
    logLoadingVisible: true,
    logTotal: 0,
    logCurrent: 1,
    drawerVisible: false,
    logText: '',
    formItemLayout: {
      labelCol: {
        fixedSpan: 6
      },
      wrapperCol: {
        span: 40
      }
    }
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload }
    }
  },

  effects: (dispatch) => ({
    LogPage(data) {
      logService.logPage(data).then(res => {
        const payload = {
          logTotal: res.data.totalElements,
          logTableData: res.data.content,
          logLoadingVisible: false
        }
        dispatch.log.setState(payload);
      })
    },
    editLog(data) {
      if (data) {
        const payload = {
          logFormData: data,
          logVisible: true
        }
        dispatch.log.setState(payload);
      } else {
        const payload = {
          logFormData: {},
          logVisible: true
        }
        dispatch.log.setState(payload);
      }
    },
    deleteLog(data) {
      logService.logDelete(data.record).then(() => {
        logService.logPage(data.logCurrent).then(res => {
          const payload = {
            logTotal: res.data.totalElements,
            logTableData: res.data.content,
            logLoadingVisible: false
          }
          dispatch.log.setState(payload);
        })
      })
    },
    logSave(data) {
      logService.logSave(data.logFormData).then(() => {
        logService.logPage(data.logCurrent).then(res => {
          const payload = {
            logTotal: res.data.totalElements,
            logTableData: res.data.content,
            logLoadingVisible: false
          }
          dispatch.log.setState(payload);
        })
      })
      const payload = { logVisible: false }
      dispatch.log.setState(payload);
    },
    findLogsByPort(data) {
      logService.findLogsByPort(data.record.serverPort).then(res => {
        const logArr = [];
        res.forEach(item => {
          const log = `${item.createDate}  [ ${item.threadName} ]  ${item.msgLevel}  ${item.classpath} - ${item.msg}`;
          logArr.push(log);
        })
        const payload = {
          logText: logArr.join(' \n'),
          drawerVisible: true,
          logName: data.record.serverName,
          logPort: data.record.serverPort,
        }
        dispatch.log.setState(payload);
      })
    },
    deleteLogsByPort(data) {
      logService.deleteLogsByPort(data).then(() => {
        logService.findLogsByPort(data).then(res => {
          const logArr = [];
          res.forEach(item => {
            const log = `${item.createDate}  [ ${item.threadName} ]  ${item.msgLevel}  ${item.classpath} - ${item.msg}`;
            logArr.push(log);
          })
          const payload = {
            logText: logArr.join(' \n'),
            drawerVisible: true,
          }
          dispatch.log.setState(payload);
        })
      })
    }
  })
};