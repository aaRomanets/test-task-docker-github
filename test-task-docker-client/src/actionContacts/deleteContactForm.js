import React, { useState } from 'react';

//форма удаления имеющегося контакта в таблице из таблицы и из сервера
const DeleteContactForm = ({
    //функция удаления контакта из таблицы и из сервера
    deleteContactData 
}) => {
    //флаг открытия формы удаления контакта
    const [isFormOpen, setIsFormOpen] = useState(false);
    //идентификатор удаляемого контакта
    const [id, setId] = useState('');

    //функция, связанная с кнопкой удаления контакта по введенному идентификатору
    const submitHandler = () => {
        if (id !== '')
        {
            //если задан идентификатор, то производим указанное удаление
            deleteContactData(id);
            setId('');
        }
        //в любом случае закрываем форму
        setIsFormOpen(false);
    }

    return (
        <div style={{ margin: "25px 0 0 0"}}>
            {!isFormOpen ? (
                //Кнопка открытия формы
                <button
                    className="btn btn-outline-secondary mt-5 mb-5"
                    type="button"
                    onClick={() => {setIsFormOpen(true)}}
                >
                    show delete contact form
                </button>
            ) : (
                <form>
                    <div className="row">
                        <div className="col-md-1 mb-3">
                            {/*Поле ввода идентификатора удаляемого контакта*/}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Id"
                                value={id}
                                onChange={(event) => {setId(event.target.value)}}
                            />
                        </div>                      
                    </div>
                    {/*Кнопка удаления контакта по введенному идентификатору */}
                    <button
                        className='="btn btn-primary'
                        type="button"
                        onClick={() => {submitHandler()}}
                    >
                        delete contact
                    </button>
                </form>
            )}
        </div>
    )
}

export default DeleteContactForm;