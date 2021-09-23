import axios from 'axios'

// const baseURL = "http://localhost:3000"
const baseURL = "https://handson-panggabean-halo-dok.herokuapp.com"

const instanceAxios = axios.create({
  baseURL: baseURL
})

export default instanceAxios