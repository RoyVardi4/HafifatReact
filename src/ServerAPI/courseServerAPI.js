
import axios from 'axios'

const URL = 'http://localhost:5000/courses'

export default class CourseServerAPI {

    static async getAllCourses() {
        return await axios.get(URL)
                        .then(response => response.data)
                        .catch(err => alert(err))
    }

    static async addCourseDate(dateToAdd, courseId) {
       return await axios.patch(URL+`/${courseId}`, {dateToAdd: dateToAdd})
                        .then(res => res.data)
                        .catch(err => alert(err))
    }

    static async addCourse(courseToAdd) {
        return await axios.post(URL, {courseToAdd})
                        .then(res => res.data)
                        .catch(err => alert(err))
    }
}