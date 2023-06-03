import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';

function AddPlacePopup({ isOpened, onClose, onAddCard, isLoading }) {

    const { values, errors, isValid, handleChange, setValue, resetValidation } = useFormValidation();

    useEffect(() => {
        resetValidation();
        setValue({});
    }, [isOpened, resetValidation, setValue]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddCard({
            name: values['name'],
            link: values['link']
        });
    }

    const errorClassName = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
            btnText='Сохранить'
            isLoading={isLoading}
            loadingText="Сохранение..."
        >
            <input
                className="popup__input popup__input_value_place"
                id="place"
                type="text"
                placeholder="Название"
                name="name"
                minLength="2"
                maxLength="30"
                value={values['name'] || ''}
                onChange={handleChange}
                required
            />
            <div className='popup__error-container'>
                <span className={errorClassName('name')}>{errors['name']}</span>
            </div>
            <input
                className="popup__input popup__input_value_link"
                id="link"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                value={values['link'] || ''}
                onChange={handleChange}
                required
            />
            <div className='popup__error-container'>
                <span className={errorClassName('link')}>{errors['link']}</span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;