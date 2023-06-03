import closeIcon from '../images/Close-Icon.svg'

function PopupWithForm({ isOpened, onClose, name, title, btnText, isLoading,
    loadingText, children, onSubmit, isValid }) {
    return (
        <div className={`popup popup_type_${name} ${isOpened ? "popup_opened" : ""}`}>
            <div className='popup__container'>
                <h2 className='popup__text'>{title}</h2>
                <form className='popup__form' name={name} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className={`popup__save ${isValid ? '' : 'popup__save_disabled'}`} type='submit'>{isLoading ? loadingText : btnText}</button>
                </form>
                <button className='popup__close' onClick={onClose} type='button'>
                    <img src={closeIcon} className='popup__icon' alt='Закрывающая иконка' />
                </button>
            </div>
        </div >
    )
}

export default PopupWithForm;