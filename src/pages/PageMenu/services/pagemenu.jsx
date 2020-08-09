import { request } from 'ice';

export default {
  pageMenuPage() {
    return request({
      url: '/pageMenuApi/findAll',
      method: 'post'
    });
  },
  pageMenuDelete(record) {
    return request({
      url: '/pageMenuApi/menuPageDelete',
      method: 'post',
      params: {
        id: record.id
      }
    })
  },
  pageMenuSave(data) {
    return request({
      url: '/pageMenuApi/saveMenuPage',
      method: 'post',
      data
    })
  },
  createRouteFile(data) {
    return request({
      url: '/pageMenuApi/createRouteFile',
      method: 'post',
      params: {
        routePath: data
      }
    })
  },
}