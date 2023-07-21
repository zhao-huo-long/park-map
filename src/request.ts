import axios from 'axios'

const request = axios.create({
  baseURL: 'http://39.107.79.30'
})

export default request