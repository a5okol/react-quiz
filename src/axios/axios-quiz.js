import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-bd01b.firebaseio.com/'
})