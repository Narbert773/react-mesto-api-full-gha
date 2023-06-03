import React from 'react';
import successImg from '../images/Union.svg';
import errorImg from '../images/Error.svg';
import closeIcon from '../images/Close-Icon.svg';

function InfoToolTip({ isOpened, onClose, isSuccess, text }) {
    return (
        <section className={`popup popup_type_success ${isOpened ? "popup_opened" : ""}`} onClick={onClose}>
            <div className='popup__container'>
                <img src={isSuccess ? successImg : errorImg} className="popup__status-img" alt="Статус" />
                <span className="popup__inside-text">{text}</span>
                <button className='popup__close' onClick={onClose} type='button'>
                    <img src={closeIcon} className='popup__icon' alt='Закрывающая иконка' />
                </button>
            </div>
        </section>
    )
}

export default InfoToolTip;