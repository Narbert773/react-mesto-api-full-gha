import React, { useContext } from 'react';
import profileEditButton from '../images/Vector.svg'
import addButton from '../images/Cross.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onCardClick, onCardLike, onCardDelete, onEditProfile, onEditAvatar, onAddPlace }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} className="profile__avatar" alt="Кусто" />
                </button>
                <div className="profile-info">
                    <h1 className="profile-info__title">{currentUser.name}</h1>
                    <button className="profile-info__edit-button" type="button" onClick={onEditProfile}><img
                        src={profileEditButton} alt=" Курсор" className="profile-info__icon" /></button>
                    <p className="profile-info__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}><img src={addButton}
                    alt="Крест" className="profile__icon" /></button>
            </section>
            <section className='elements'>
                {cards.map((card) => {
                    return (<Card
                        card={card}
                        key={card._id}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />)
                })
                }
            </section>
        </main>
    )
}

export default Main;