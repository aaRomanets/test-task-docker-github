import React, {useState, useEffect} from "react";

//блок пагинации
const Paginator = ({
    //количество страниц
    totalCountPage, 
    createCurrentBlockRows,
    //номер текущей страницы
    currentPageNumber, 
    setCurrentPageNumber,
    setIsRequestOnServer,
    //флаг активации запроса на скачивание информации с сервера
    isRequestOnServer 
}) => {

    //составляем массив страниц
    let pages = [];
    for (let i=1; i <= totalCountPage; i++) {
      pages.push(i);
    }

    //состояние кнопки с именем Next
    const [buttonNextDisabled, setButtonNextDisabled] = useState('');
    //состояние кнопки с именем Previous
    const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState('');

    useEffect(() => {
        if (isRequestOnServer)
        {
            //при положительном флаге запроса на скачивание информации с сервера кнопка с именем Next активируется
            setButtonNextDisabled('');
            //при отрицательном флаге запроса на скачивание информации с сервера кнопка с именем Previous деактивируется
            setButtonPreviousDisabled('disabled');
            //флаг активации запроса на скачивание информации с сервера делаем отрицательным
            setIsRequestOnServer(false); 
        }
    },
    [
        isRequestOnServer, 
        setCurrentPageNumber,
        setButtonNextDisabled,
        setButtonPreviousDisabled,
        setIsRequestOnServer
    ])

    const currentPage = (pg) => {
        //устанавливаем новую текущую страницу
        setCurrentPageNumber(pg);
    
        //активируем кнопку с именем Next
        if (buttonNextDisabled === 'disabled') 
        {
            setButtonNextDisabled('');
        }
    
        //активируем кнопку с именем Previous
        if (buttonPreviousDisabled === 'disabled') 
        {
            setButtonPreviousDisabled('');
        }
        //создаем блок новых контактов, соответствующих странице с номером pg
        createCurrentBlockRows(pg);
    }

    //функция перехода на предыдущую страницу
    const onPreviousClick = () => {
        if (currentPageNumber > 1)
        {
            //меняем текущую страницу если это возможно
            setCurrentPageNumber(currentPageNumber-1);
        }
        else
        {
            //в противном случае деактивируем кнопку с именем Previous
            setButtonPreviousDisabled('disabled');
        }
    }

    //функция перехода на следующую страницу
    const onNextClick = () => {
        if (currentPageNumber < pages.length)
        {
            //меняем текущую страницу если это возможно
            setCurrentPageNumber(currentPageNumber+1);
        }
        else
        {
            //в противном случае деактивируем кнопку с именем Next
            setButtonNextDisabled('disabled');
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                {/*кнопка перехода на предыдущую страницу */}
                <li className={`page-item ${buttonPreviousDisabled}`}>
                    <a className="page-link" href="/#" tabIndex="-1" onClick={() => {onPreviousClick()}}>
                        Previous
                    </a>
                </li> 
                {/*показываем все страницы и выделяем фиксированную страницу с номером currentPageNumber */}
                {pages.map((p) => {
                    return (
                        <li className={
                            ((currentPageNumber === p) || (totalCountPage === p && totalCountPage < currentPageNumber))  ? `page-item active` : `page-item`} key={p}
                        >
                            <a className="page-link" href="/#" onClick={() => {currentPage(p)}}>
                                {p} 
                            </a>
                        </li>
                    )
                })}
                {/*кнопка перехода на следующую страницу */}
                <li className={`page-item ${buttonNextDisabled}`}>
                    <a className="page-link" href="/#" onClick={() => {onNextClick()}}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator;