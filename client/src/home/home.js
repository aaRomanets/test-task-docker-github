import React, { Fragment, useState, useEffect } from 'react'
import Table from '../table/table';
import Loader from '../loader/loader';
import AddContactForm from "../actionContacts/addContactForm";
import DeleteContactForm from "../actionContacts/deleteContactForm";
import Paginator from '../paginator/paginator';
import infoApi from '../core-api/api';

//основной блок проекта
const Home = ({
    //адрес на сервере по которому скачена инфомация о контактах
    url,
    //скаченный с сервера набор контактов                   
    contactData,
    setContactData,
    //флаг процесса загрузки контактов
    isLoading,
    setIsRequestOnServer,
    //флаг активации запроса на загрузку контактов с сервера по адресу url
    isRequestOnServer
}) => {
    //ограниченное число контактов в таблице
    const limitCountContactsPage = 20;
    //отфильтрованные контакты
    let filteredData = [];
    //контакты в таблице, которые соответствуют текущей странице блока таблицы
    let currentBlockRows = {};

    //метка поиска нужных контактов по всем контактам в блоке таблицы
    const [searchText, setSearchText] = useState('');
    //число страниц в блоке таблицы         
    const [totalCountPage, setTotalCountPage] = useState(0);
    //номер текущей страницы блока таблицы  
    const [currentPageNumber, setCurrentPageNumber] = useState(1);


    useEffect(() => {
        //осуществлен новый запрос скачивания информации с сервера
        if (isRequestOnServer) {
            //метку поиска нужных контактов по всем контактам в блоке таблице приравниваем к ''
            setSearchText('');
            //число страниц в блоке таблицы приравниваем к 0
            setTotalCountPage(0);
            //номер текущей страницы блока таблицы приравниваем к 1
            setCurrentPageNumber(1);
        }
    },
        [
            isRequestOnServer,
            setCurrentPageNumber,
            setTotalCountPage
        ])

    //функция добавления нового контакта в блок таблицы и на сервер
    const addContactData = ({ id, firstName, lastName, email, phone }) => {
        infoApi.addRow(url, id, firstName, lastName, email, phone).then(() => {
            contactData.push({ id, firstName, lastName, email, phone });
        })
    }

    //функция удаления имеющегося контакта из блока таблицы и из сервера
    const deleteContactData = (id) => {
        infoApi.deleteRow(url, id).then(() => {
            let newConcatData = contactData.filter(el =>  el.id !== id);
            setContactData(newConcatData);
        })
    }

    //функция определения набора контактов соответствующих текущей странице блока таблицы из массива filteredData
    const createCurrentBlockRows = (pg) => {
        let lastBlockRow = 0;

        if (totalCountPage > 0 && totalCountPage < pg) {
            //случай когда применена филтрация тут это возможно
            lastBlockRow = totalCountPage * limitCountContactsPage;
        }
        else {
            //все остальные случаи, когда фильтрация по метке searchText для всех скаченных контактов не применена
            lastBlockRow = pg * limitCountContactsPage;
        }
        const firstBlockRow = lastBlockRow - limitCountContactsPage;
        currentBlockRows = filteredData.slice(firstBlockRow, lastBlockRow);
    }

    //проводим фильтрацию по всем скаченным контактам для блока таблицы по зафиксированной метке searchText
    const getFilteredData = () => {
        //при searchText === '' фильтрацию не проводим
        if (searchText === '') {
            filteredData = contactData;
        }
        else {
            //в остальных случаях фильтрацию проводим
            filteredData = contactData.filter(el => {
                return (
                    el['firstName'].toLowerCase().includes(searchText.toLowerCase())
                    || el['lastName'].toLowerCase().includes(searchText.toLowerCase())
                    || el['email'].toLowerCase().includes(searchText.toLowerCase())
                    || el['phone'].toLowerCase().includes(searchText.toLowerCase())
                );
            })
        }
        createCurrentBlockRows(currentPageNumber);
    }

    //функция фиксации элемента searchText по которому ищем необходимые контакты из всех загруженных контактов
    //the function of fixing an element searchText by which we seeking needed contacts from all uploaded contacts
    const onSearchSend = (text) => {
        //фиксируем метку searchText по которой ищем необходимые контакты из всех загруженных контактов
        //fix label searchText by which we seeking needed contacts from all uploaded contacts
        setSearchText(text);
    }

    //проводим фильтрацию по всем скаченным контактам в таблице по зафиксированной метке searchText
    //carrying out filtering entire all downloaded contacts in table according to fixed label searchText
    getFilteredData();

    useEffect(() => {
        if (isLoading) {
            return;
        }
        //Определяем число страниц блока таблицы когда уже все контакты с сервера загружены
        //и фильтрация загруженных контактов по метке searchText проведена
        //Define the number of pages of block table when are all the contacts already with server is loaded
        //and filtering of uploaded contacts according to label searchText is carried out
        setTotalCountPage(Math.ceil(filteredData.length / limitCountContactsPage));

    }, [isLoading, filteredData.length, setTotalCountPage])

    return (
        isLoading ?
            //сигнализатор загрузки коттактов, включается и остается до тех пор пока идет загрузка 
            //contact loading alarm, turns on and remains as long as the download is in progress
            <Loader /> :
            currentBlockRows.length ?
                (
                    <div>
                        <Fragment>
                            {/*форма добавления нового контакта в таблицу и на сервер */}
                            {/*the adding form of new contact in table and into server */}
                            <AddContactForm addContactData={addContactData} />
                            {/*форма удаления имеющегося контакта из таблицы и из сервера */}
                            {/*the removing form of available contact from table and from server */}
                            <DeleteContactForm deleteContactData={deleteContactData} />
                            {/*таблица данных по текущей странице */}
                            {/*the table of data according to current page */}
                            <Table
                                currentBlockRows={currentBlockRows}
                                contactData={contactData}
                                setContactData={setContactData}
                                onSearchSend={onSearchSend}
                                isRequestOnServer={isRequestOnServer}

                            />

                        </Fragment>
                        {
                            !isLoading && filteredData.length > limitCountContactsPage &&
                            //Пагинатор станиц
                            //Paginator of pages
                            <Paginator
                                totalCountPage={totalCountPage}
                                createCurrentBlockRows={createCurrentBlockRows}
                                currentPageNumber={currentPageNumber}
                                setCurrentPageNumber={setCurrentPageNumber}
                                setIsRequestOnServer={setIsRequestOnServer}
                                isRequestOnServer={isRequestOnServer}
                            />
                        }
                    </div>
                ) :
                (
                    <></>
                )
    )
}

export default Home;