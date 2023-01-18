import React, {useState} from 'react'

//блок задания элемента по которому ищятся необходимые контакты из всех загруженных контактов
const SearchElement = ({
    //функция фиксации элемента по которому ищем необходимые контакты из всех загруженных контактов
    onSearchSend 
}) => {
    //элемент searchValue по которму ищятся необходимые контакты из всех загруженных контактов
    const [searchValue, setSearchValue] = useState('');

    return (
        <div 
            className="input-group mb-3 mt-3" 
            style={{display: 'flex', justifyContent: "center", margin: "25px 0 0 0"}}
        >
            {/*окно задания элемента по которому ищятся необходимые контакты из всех загруженных контактов */}
            <input
                type="text"
                className="form-control"
                style={{margin: "0 25px 0 0"}}
                placeholder="Recipient's username"
                aria-label="Rcipient's username"
                aria-describedby="basic-addon2"

                value={searchValue}
                onChange={(event) => {setSearchValue(event.target.value)}}
            />
            <div className="input-group-append">
                {/*кнопка фиксации элементов по которым ищятся необходимые контакты из всех загруженных контактов */}
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={
                        () => { 
                            //фиксируем элемент по которому ищем необходимые контакты из всех загруженных контактов
                            onSearchSend(searchValue); 
                            //элемент по которому необходимые контакты из всех загруженных контактов присваиваем к ''
                            setSearchValue('');
                        }
                    }
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchElement;