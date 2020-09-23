
import axios from 'axios'

const URL = 'http://localhost:5000/courses'

export default class CourseServerAPI {

    static async getAllCourses() {
        // get all courses
    }

    static async addCourseDate(dateToAdd, courseId) {
        await axios.patch(URL+`/${courseId}`, {dateToAdd: dateToAdd})
                        .then(res => console.log(res.data))
                        .catch(err => alert(err))
    }

    static async addCourse(courseToAdd) {
        return await axios.post(URL, {courseToAdd})
                        .then(res => res.data)
                        .catch(err => alert(err))
    }
}