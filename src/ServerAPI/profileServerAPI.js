
import axios from 'axios'

const URL = 'http://localhost:5000/profile/'

export default class CourseServerAPI {

    static async getProfile(personalNum) {
        return await axios.get(`${URL}${personalNum}`)
                        .catch(err => err.response)
    }

    static async addCoursesToProfile(cartItems, personalNum) {
       return await axios.patch(URL+`/${personalNum}`, {coursesToAdd: cartItems})
                        .then(res => res.data)
                        .catch(err => alert(err))
    }
}