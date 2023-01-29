import React, { useState } from 'react';

//форма добавления нового контакта в таблицу и на сервер
const AddContactForm = ({
    //функция добавления нового контакта в таблицу и на сервер, если задана вся информация, необходимая для этого 
    addContactData 
}) => {
    //флаг открытия формы
    const [isFormOpen, setIsFormOpen] = useState(false);
    //идентификатор добавляемого контакта 
    const [id, setId]                 = useState('');  
    //firstName добавляемого контакта    
    const [firstName, setFirstName]   = useState('');  
    //lastName добавляемого контакта  
    const [lastName, setLastName]     = useState('');   
    //почта добавляемого контакта 
    const [email, setEmail]           = useState('');   
    //телефон добавляемого контакта  
    const [phone, setPhone]           = useState('');   

    //функция, связанная с кнопкой добавления нового контакта
    const submitHandler = () => {
        if (id !== '' && firstName !== '' && lastName !== '' &&  email !== '' && phone !== '')
        {
            //добавляем новый контакт в таблицу и на сервер, если задана вся информация, необходимая для этого 
            addContactData({id, firstName, lastName, email, phone});
            setId('');  
            setFirstName('');  
            setLastName('');  
            setEmail('');  
            setPhone('');  
        }
        //закрываем форму добавления нового контакта
        setIsFormOpen(false);
    }

    return (
        <div>
            {!isFormOpen ? (
                //Кнопка открытия формы
                <button
                    className="btn btn-outline-secondary mt-5 mb-5"
                    type="button"
                    onClick={() => {setIsFormOpen(true)}}
                >
                    show add contact form
                </button>
            ) : (
                <form>
                    <div className="row">
                        <div className="col-md-1 mb-3">
                            {/*Поле ввода идентификатора добавляемого контакта*/}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Id"
                                value={id}
                                onChange={(event) => {setId(event.target.value)}}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            {/*Поле ввода firstName добавляемого контакта*/}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event) => {setFirstName(event.target.value)}}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            {/*Поле ввода lastName добавляемого контакта*/}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event) => {setLastName(event.target.value)}}
                            />
                        </div>
                        <div className="col-md-2 mb-3">
                            {/*Поле ввода почты добавляемого контакта*/}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                            />
                        </div>   
                        <div className="col-md-2 mb-3">
                            {/*Поле ввода телефона добавляемого контакта*/}
                            <input
                                type="text"
                                className="form-control"
                                placeholder="phone"
                                value={phone}
                                onChange={(event) => {setPhone(event.target.value)}}
                            />
                        </div>                        
                    </div>
                    {/*Кнопка добавления нового контакта */}
                    <button
                        className='="btn btn-primary'
                        type="button"
                        onClick={() => {submitHandler()}}
                    >
                        add contact
                    </button>
                </form>
            )}
        </div>
    )
}

export default AddContactForm;