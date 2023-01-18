import React, {useState} from 'react'

// блок кнопок осуществления запросов на скачивание информации по контактам с сервера
//в начальный момент времени все кнопки с disabled === false
const Switcher = ({buttonHandler}) => {
    // по этому адресу на сервере в json-формате хранится небольшое количество контактов
    const smallUrl = "http://localhost:4009/contactsSmall";
    // по этому адресу на сервере в json-формате хранится большое количество контактов
    const bigUrl = "http://localhost:4009/contactsBig";

    //web адрес по которому с сервера скачиваем данные о контактах
    const [outputUrl, setOutputUrl] = useState('');

    const defineUrl = (url) => {
        //определяем web адрес по которому с сервера скачиваем данные о контактах
        setOutputUrl(url);
        //осуществляем запрос на скачивание информации о контактах с сервера по определенному web адресу
        buttonHandler(url); 
    }

    return (
        <div style={{display: 'flex', justifyContent: "center", margin: "25px 0 0 0"}}>
            {/*кнопка на осуществление запроса по скачиванию небольшой информации по контактам,
                при осуществлении запроса эта кнопка становится с disabled = true а кнопка с 
                именем Big с disabled = false */}
            <button 
                className='btn btn-danger' 
                disabled= {(outputUrl !== smallUrl)  ? false : true} 
                style={{margin: "0 25px 0 0"}} 
                onClick={() => {defineUrl(smallUrl)}}
            >
                Small
            </button>
            {/*кнопка на осуществление запроса по скачиванию большой информации по контактам,
                при осуществлении запроса эта кнопка становится с disabled = true а кнопка с 
                именем Small с disabled = false */}
            <button 
                className='btn btn-warning' 
                disabled= {(outputUrl !== bigUrl)  ? false : true} 
                onClick={() => {defineUrl(bigUrl)}}
            >
                Big
            </button>
        </div>
    )
}

export default Switcher;