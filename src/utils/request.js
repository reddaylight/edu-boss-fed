import axios from 'axios'

const request = axios.create({
  timeout: 2000
})

function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss/lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

request.interceptors.request.use(config => {
  config.baseURL = getBaseURL(config.url)
  return config
})

export default request
