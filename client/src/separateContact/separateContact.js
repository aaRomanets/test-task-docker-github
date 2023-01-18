import React from 'react'

//отдельная информация о контакте
const SeparateContact = ({separateContactData}) => {
    return (
        <div>
            {/*идентификатор контакта*/}
            <div>
                id: <b>{separateContactData.id}</b>
            </div>
            {/*firstName контакта*/}
            <div>
                firstName: <b>{separateContactData.firstName}</b>
            </div>
            {/*lastName контакта*/}
            <div>
                lastName: <b>{separateContactData.lastName}</b>
            </div>
            {/*телефон контакта*/}
            <div>
                phone: <b>{separateContactData.phone}</b>
            </div>
            {/*почта контакта*/}
            <div>
                email: <b>{separateContactData.email}</b>
            </div>
        </div>
    )
}

export default SeparateContact;