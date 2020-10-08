import sqlService from '../services/sql';

export default {

  namespace: 'sql',

  state: {
    sqlTableData: [],
    sqlVisible: false,
    sqlFormData: {},
    sqlLoadingVisible: true,
    sqlTotal: 0,
    sqlCurrent: 1,
    formItemLayout: {
      labelCol: {
        fixedSpan: 5,
      },
      wrapperCol: {
        span: 40,
      },
    },
    sqlStr: '',
    drawerVisible: false,
    SQL_TYPE: [],
    drawerTableData: [],
    drawerLoadingVisible: true,
    drawerTotal: 0,
    drawerCurrent: 1,
  },

  reducers: {
    setState(prevState, payload) {
      return { ...prevState, ...payload };
    },
  },

  effects: (dispatch) => ({
    sqlPage(data) {
      sqlService.sqlPage(data).then(res => {
        const payload = {
          sqlTotal: res.data.totalElements,
          sqlTableData: res.data.content,
          sqlLoadingVisible: false,
        };
        dispatch.sql.setState(payload);
      });
    },
    sqlEdit(data) {
      if (data) {
        const payload = {
          sqlFormData: data,
          sqlStr: data.sqlStr,
          sqlVisible: true,
        };
        dispatch.sql.setState(payload);
      } else {
        const payload = {
          sqlFormData: {},
          sqlStr: '',
          sqlVisible: true,
        };
        dispatch.sql.setState(payload);
      }
    },
    sqlDelete(data) {
      sqlService.sqlDelete(data.record).then(() => {
        sqlService.sqlPage(data.sqlCurrent).then(res => {
          const payload = {
            sqlTotal: res.data.totalElements,
            sqlTableData: res.data.content,
            sqlLoadingVisible: false,
          };
          dispatch.sql.setState(payload);
        });
      });
    },
    sqlSave(data) {
      sqlService.sqlSave(data.sqlFormData).then(() => {
        sqlService.sqlPage(data.sqlCurrent).then(res => {
          const payload = {
            sqlTotal: res.data.totalElements,
            sqlTableData: res.data.content,
            sqlLoadingVisible: false,
          };
          dispatch.sql.setState(payload);
        });
      });
      const payload = { sqlVisible: false };
      dispatch.sql.setState(payload);
    },
    setInputValue(value, data) {
      if (data.sql.sqlFormData.sortCode) {
        const payload = {
          sqlFormData: {
            id: data.sql.sqlFormData.id,
            sqlStr: value,
            sqlDescription: data.sql.sqlFormData.sqlDescription,
            sqlType: data.sql.sqlFormData.sqlType,
            sortCode: data.sql.sqlFormData.sortCode,
          },
          sqlStr: value,
        };
        dispatch.sql.setState(payload);
      } else {
        const payload = {
          sqlFormData: { id: data.sql.sqlFormData.id, sqlStr: value },
          sqlStr: value,
        };
        dispatch.sql.setState(payload);
      }
    },
    sqlExcited(data) {
      sqlService.sqlExcited(data).then(res => {
        if (res.code === 200) {
          const payload = {
            drawerVisible: true,
            drawerTableData: res.data,
            drawerLoadingVisible: false,
          };
          dispatch.sql.setState(payload);
        }
      });
    },
    findCatalogByValue(data) {
      sqlService.findCatalogByValue(data).then(res => {
        const formArr = [];
        res.forEach(item => {
          formArr.push({
            label: item.dictionaryName,
            value: item.dictionaryValue,
          });
        });
        const payload = JSON.parse(JSON.stringify({
          data: formArr,
        }).replace(/data/g, data));
        dispatch.sql.setState(payload);
      });
    },
  }),
};
