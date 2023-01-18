import axios from 'axios'

//структура запросов
const infoApi = {
    //запрос на получение всех контактов сервера по указанному адресу url
    getAll: (url) => {
        return axios.get(url)
    },
    //запрос на добавление нового контакта на сервер по указанному адресу url
    addRow: (url, id, firstName, lastName, email, phone) => {
        return axios.post(url, {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        })
    },
    //запрос на удаление контакта с идентификатором id с сервера по указанному адресу url
    deleteRow: (url,id) => {
        return axios.delete(url+'/'+id)
    }
}

export default infoApi;