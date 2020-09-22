
const url = 'http://localhost:5000/'

export default class courseServerAPI {
    static async test() {
        await fetch(url)
        .then(res => res.json())
        .then(data => alert(data))
        .catch((err) => {
            alert('Error ' + err)
        })
    }
}