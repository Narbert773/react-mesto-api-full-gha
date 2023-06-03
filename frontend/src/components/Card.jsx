import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleCardClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };

    return (
        <article className="element">
            {isOwn && (<button className="element__trash-button" type="button" onClick={handleDeleteClick}></button>)}
            <img src={card.link} className="element__image" alt={card.name} onClick={handleCardClick} />
            <div className="element__group">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-group">
                    <button className={`element__like-button ${isLiked && 'element__like-button_active'}`} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-quantity">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;