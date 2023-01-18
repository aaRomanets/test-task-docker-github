import { useState, useEffect } from "react"
import infoApi from '../core-api/api'

//самодельный хук получения данных по контактам с сервера по адресу url
const useServerData = ({url, isRequestOnServer, setIsLoading}) => {
  //сюда будем собирать полученные данные по контактам
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    //никаких запросов не делаем если флаг isRequestOnServer отрицательный
    if (!isRequestOnServer)
    {
      return;
    }
    //делаем запрос на сервер по адресу url для получения информации о всех контактов на web странице по этому адресу
    infoApi.getAll(url).then((res) => 
      {
        //фиксируем полученные данные
        setContactData(res.data); 
        //флаг скачивания информации с сервера делаем отрицательным
        setIsLoading(false);      
      }
    )
  }, [url, isRequestOnServer, setIsLoading])

  //возвращаем результат
  return [{contactData, setContactData}];
}

export default useServerData;