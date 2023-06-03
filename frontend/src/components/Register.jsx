import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../utils/useFormValidation';

function Register({ onRegister }) {

    const { values, errors, handleChange, resetValidation, isValid } = useFormValidation({});

    useEffect(() => {
        resetValidation();
    }, [resetValidation]);

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values);
    }

    const errorClassName = (name) => `main-form__error ${errors[name] ? 'main-form__error_visible' : ''}`;

    return (
        <div className='screen-page screen-page_register'>
            <form className='main-form main-form_sign-up' name='sign-up' onSubmit={handleSubmit}>
                <h2 className='main-form__text main-form__text_sign-up'>Регистрация</h2>
                <input className="main-form__input main-form__input_value_mail"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    minLength="2"
                    maxLength="40"
                    value={values.email || ''}
                    onChange={handleChange}
                    required
                />
                <div className='main-form__error-container'>
                    <span className={errorClassName('email')}>{errors['email']}</span>
                </div>
                <input className="main-form__input main-form__input_value_password"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Пароль"
                    name="password"
                    minLength="5"
                    maxLength="40"
                    value={values.password || ''}
                    onChange={handleChange}
                    required
                />
                <div className='main-form__error-container'>
                    <span className={errorClassName('password')}>{errors['password']}</span>
                </div>
                <button className={`main-form__button ${isValid ? '' : 'main-form__button_disabled'}`} type="submit">Зарегистрироваться</button>
                <button className="main-form__button-confirm" type="button"><Link to="/sign-in" className='main-form__link'>Уже зарегистрированы? Войти</Link></button>
            </form>
        </div>
    )
}

export default Register;