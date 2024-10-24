import request from '@/utils/request'
import qs from 'qs'

// 用户登录接口
export const login = data => {
  request({
    method: 'POST',
    url: '/font/user/login',
    data: qs.stringify(data)
  })
}
