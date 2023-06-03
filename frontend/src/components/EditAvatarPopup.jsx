import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../utils/useFormValidation';

function EditAvatarPopup({ isOpened, onClose, onEditAvatar, isLoading }) {

  const ref = useRef('');

  const { values, errors, isValid, handleChange, resetValidation } = useFormValidation();

  useEffect(() => {
    resetValidation();
    ref.current.value = '';
  }, [isOpened, resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();

    onEditAvatar({
      avatar: ref.current.value
    })
  }

  const errorClassName = (name) => `popup__error ${errors[name] ? 'popup__error_visible' : ''}`;

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      value={values['avatar'] || ''}
      btnText='Сохранить'
      isLoading={isLoading}
      loadingText="Сохранение..."
    >
      <input
        className="popup__input popup__input_value_avatar"
        id="avatar"
        placeholder="Ссылка на аватар"
        onChange={handleChange}
        type="url"
        name="avatar"
        ref={ref}
        required
      />
      <div className='popup__error-container'>
        <span className={errorClassName('avatar')}>{errors['avatar']}</span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;