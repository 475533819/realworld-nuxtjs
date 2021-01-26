import { request } from '@/plugins/request'

// 获取用户配置信息
export const getUserProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}
