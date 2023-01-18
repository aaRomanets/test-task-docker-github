import React, {useState, useEffect} from 'react'
import ArrowUp from '../svg/arrowUp'
import ArrowDown from '../svg/arrowDown'
import SeparateContact from '../separateContact/separateContact';
import SearchElement from '../search/searchElement';

//таблица данных по текущей странице 
const Table = ({
    //собранный блок данных по текущей странице 
    currentBlockRows,
    //все скаченные контакты с сервера
    contactData,     
    setContactData, 
    //функция метки фильтрации загруженных контактов
    onSearchSend,    
    //флаг запроса на загрузку контактов с сервера 
    isRequestOnServer
}) => {
    //поле соритировки
    const [field, setField] = useState('');
    //направление сортировки 
    const [directionSort, setDirectionSort] = useState(false);

    //флаг показа отдельной информации о любом контакте в таблице
    const [rowIsClick, setRowIsClick] = useState(false);
    //отдельная информация о любом контакте в таблице
    const [separateContactData, setSeparateContactData] = useState(null);

    //функция фиксации отдельной информации о контакте, если щелкнули по его строке в таблице
    const separateContact = (contact) => {
        if (contact === separateContactData)
        {
            //повторно щелкнули по строке контакта в таблице, который выведен под таблицей 
            setRowIsClick(!rowIsClick);
            //уничтожаем отдельную информацию о этом контакте
            setSeparateContactData(null);
        }
        else
        {
            //щелкнули по строке контакта в таблице
            setRowIsClick(true);
            //фиксируем отдельную информацию о этом контакте
            setSeparateContactData(contact);
        }
    }

    //стрелка которая указывает направление сортировки directionSort === false 
    //сортировка идет снизу вверх directionSort === true сортировка идет сверху вниз
    const Arrow = () => {
        return (
            directionSort ? <ArrowUp/> : <ArrowDown/> 
        )
    }

    //функция сортировки данных по полю field
    const sortData = (field) => {
        const copyData = contactData.concat();
    
        //сюда будем собирать отсортированные данные
        let sortData;
    
        //сортировка сверху вниз
        if (!directionSort) 
        {
            sortData = copyData.sort(
                (a,b) => {
                    return (
                        a[field] > b[field] ? 1 : -1
                    )
                }
            )
        } 
        //сортировка снизу вверх
        else 
        {
            sortData = copyData.sort(
                (a,b) => {
                    return (
                        a[field] > b[field] ? -1 : 1
                    )
                }
            )
        }
        
        //фиксируем отсортированные данные
        setContactData(sortData);
        //меняем направление следующей сортировки
        setDirectionSort(!directionSort)
    }

    //фунция запуска сортировки
    const fieldSortData = (field) => {
        //сортируем данные по полю field
        sortData(field);
        //фиксируем поле сортировки field
        setField(field);
    }

    useEffect(() => {
        //если осуществлен запрос на скачивание новых контактов то скрываем
        //всю информацию об отдельном контакте, если она была выведена под таблицу
        //скрываем ee под таблицей и уничтожаем ее
        if (isRequestOnServer) 
        {
            setSeparateContactData(null);
            setRowIsClick(false);
        }
    },
    [
        isRequestOnServer, 
        setSeparateContactData,
        setRowIsClick
    ])

    return (
        <div>
            {/*Блок определения элемента поиска требуемых контактов по всем контактам скаченных с сервера */}
            <SearchElement onSearchSend={onSearchSend}/>
            <table className="table">
                {/*Заголовок таблицы */}
                <thead>
                    <tr>
                        <th onClick={() => (fieldSortData('id'))}>
                            id {field === 'id' ? <Arrow/> : null}
                        </th>
                        <th onClick={() => (fieldSortData('FirstName'))}>
                            FirstName {field === 'FirstName' ? <Arrow/> : null}
                        </th>
                        <th onClick={() => (fieldSortData('LastName'))}>
                            LastName {field === 'LastName' ? <Arrow/> : null}
                        </th>
                        <th onClick={() => (fieldSortData('email'))}>
                            email {field === 'email' ? <Arrow/> : null}
                        </th>
                        <th onClick={() => (fieldSortData('phone'))}>
                            phone {field === 'phone' ? <Arrow/> : null}
                        </th>
                    </tr>
                </thead>
                {/*Сама таблица которая строится по данным в наборе контактов currentBlockRows*/}
                <tbody>
                    {currentBlockRows.map(
                        (contact) => {
                        return (
                            <tr key={contact.id + contact.email} onClick={() => separateContact(contact)}>
                                <td>{contact.id}</td>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                            </tr>
                        )}
                        )}
                </tbody>
            </table>
            {/*Выводим под таблицей отдельную информацию о контакте если щелкнули по его строке в таблице 
               в первый раз, если во второй раз щелкнули по этой же строке в таблице то скрываем и 
               уничтожаем эту информацию */}
            {rowIsClick === true && separateContactData !== null ? <SeparateContact separateContactData={separateContactData}/> : null} 
        </div>
    )
}

export default Table;