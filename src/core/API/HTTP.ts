import Axios, { type AxiosInstance } from 'axios'

const axiosInstanceOptions = {
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
}

const requestInterceptors = {
  onFulfill: (config: any) => {
    return config
  }
}

const responseInterceptors = {
  onFulfill: (response: any) => {
    return response.data
  }
}

const HTTP: AxiosInstance = Axios.create(axiosInstanceOptions)

HTTP.interceptors.response.use(responseInterceptors.onFulfill)
HTTP.interceptors.request.use(requestInterceptors.onFulfill)

export default HTTP
