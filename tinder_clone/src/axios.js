import axios  from 'axios'

const instance = axios.create({
    baseURL: 'https://tinder-backend9400.herokuapp.com/'
})

export default instance;