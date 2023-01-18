import React, {useState} from 'react';
import useServerData from './hooks/useServerData';
import Switcher from './switcher/switcher';
import Home from './home/home';

function App() {
  //флаг активации запроса на сервер по скачиванию информации
  //isRequestOnServer == true - указанный запрос на сервер активен в противном случае нет
  const [isRequestOnServer, setIsRequestOnServer] = useState(false);
  //адрес хранения информации о контактах на сервере
  const [url, setUrl] = useState("");
  //флаг загрузки информации с сервера
  const [isLoading, setIsLoading]     = useState(false);
  
  //функция нажатия либо кнопки получения малого количества контактов либо кнопки большого количества контактов
  const buttonHandler = (url) => {
    //адрес хранения информации о контактах на сервере определен
    setUrl(url); 
    //флаг активации запроса на сервер по скачиванию информации положительный             
    setIsRequestOnServer(true);
    //флаг загрузки информации с сервера положительный
    setIsLoading(true);         
  }

  //получаем данные contactData с сервера по адресу url с помощью самодельного хука useServerData
  const [{contactData, setContactData}] = useServerData({url,setUrl, isRequestOnServer, setIsLoading});

  return (
    <div className="container">
      {/*блок кнопок осуществления запросов на скачивание информации по контактам с сервера
         в начальный момент времени все кнопки с disabled === false */}
      <Switcher buttonHandler={buttonHandler}/> 
      <div style={{ margin: "25px 0 0 0"}}>
        {/*Основной блок проекта */} 
        <Home
          url = {url}
          contactData = {contactData}
          setContactData = {setContactData}
          isLoading = {isLoading}  
          setIsRequestOnServer = {setIsRequestOnServer}
          isRequestOnServer = {isRequestOnServer}
        />
      </div>
    </div>
  );
}

export default App;