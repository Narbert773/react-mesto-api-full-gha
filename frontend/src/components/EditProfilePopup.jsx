import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';

function EditProfilePopup({ isOpened, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext);

    const { values, errors, isValid, handleChange, setValue, resetValidation, setIsValid } = useFormValidation();

    useEffect(() => {
        resetValidation();
        if (currentUser) {
            setValue('name', currentUser.name);
            setValue('about', currentUser.about);
        }
        if (currentUser.name && currentUser.about) {
            setIsValid(true);
        }
    }, [currentUser, isOpened, setValue, resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: values['name'],
            about: values['about']
        });
    }

    const errorClassName = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
            btnText='Сохранить'
            isLoading={isLoading}
            loadingText="Сохранение..."
        >
            <input
                className="popup__input popup__input_value_name"
                id="name"
                type="text"
                placeholder="Имя"
                name="name"
                minLength="2"
                maxLength="40"
                value={values['name'] || ''}
                onChange={handleChange}
                required
            />
            <div className='popup__error-container'>
                <span className={errorClassName('name')}>{errors['name']}</span>
            </div>
            <input
                className="popup__input popup__input_value_about"
                id="about"
                type="text"
                placeholder="О себе"
                name="about"
                minLength="2"
                maxLength="200"
                value={values['about'] || ''}
                onChange={handleChange}
                required
            />
            <div className='popup__error-container'>
                <span className={errorClassName('about')}>{errors['about']}</span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;