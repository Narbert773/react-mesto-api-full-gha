import closeIcon from '../images/Close-Icon.svg'

function ImagePopup({ card, onClose, isOpened }) {
    return (
        <div className={`popup popup_type_large-image ${isOpened && 'popup_opened'}`}>
            <div className='popup__photo-container'>
                <img src={card.link} className='popup__large-photo' alt={card.name} />
                <h3 className='popup__title'>{card.name}</h3>
                <button className='popup__close popup__close_type_large-image' type='button' onClick={onClose}>
                    <img src={closeIcon} className='popup__icon popup__icon_type_large-image' alt='Закрывающая иконка' />
                </button>
            </div>
        </div>
    )
}

export default ImagePopup;

