import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCoonfirmationPopup from './DeleteCoonfirmationPopup';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import PageNotFound from './PageNotFound';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isDeleteCardPopup, setIsDeleteCardPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cardForDelete, setCardForDelete] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isInfoTooltipText, setIsInfoTooltipText] = useState("");
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInformation(), api.getInitialCards()])
                .then(([userData, cards]) => {
                    setCurrentUser(userData);
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [loggedIn])

    useEffect(() => {
        function handleOverlayClick(evt) {
            if (evt.target.classList.contains('popup_opened')) {
                closeAllPopups();
            }
        }

        function handleEscClose(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isDeleteCardPopup) {
            document.addEventListener('keydown', handleEscClose);
            document.addEventListener('mousedown', handleOverlayClick);
            return () => {
                document.removeEventListener('keydown', handleEscClose);
                document.removeEventListener('mousedown', handleOverlayClick);
            };
        }
    }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isDeleteCardPopup]);

    function handleRegister(values) {
        auth.register(values.email, values.password)
            .then(() => {
                navigate("/sign-in")
                setIsRegistrationSuccess(true);
                handlePopupStatusText("Вы успешно зарегистрировались!");
            })
            .catch((err) => {
                console.log(err);
                setIsRegistrationSuccess(false);
                handlePopupStatusText("Что-то пошло не так! Попробуйте еще раз.");
            });
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setLoggedIn(true);
                    setEmail(email);
                    navigate("/react-mesto-auth")
                }
            })
            .catch((err) => {
                console.log(err);
                setIsRegistrationSuccess(false);
                handlePopupStatusText("Что-то пошло не так! Попробуйте еще раз.");
            });
    }

    function tokenCheck() {
        const token = localStorage.getItem("token")
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setEmail(res.data.email);
                        navigate("/react-mesto-auth");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        tokenCheck();
    }, [loggedIn]);

    function handlePopupStatusText(text) {
        setIsInfoTooltipText(text);
        setIsInfoTooltipOpen(true);
    }

    function handleSingOut() {
        setLoggedIn(false);
        localStorage.removeItem('token');
    }


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleOpenImagePopup(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setCardForDelete(card);
        setIsDeleteCardPopup(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsDeleteCardPopup(false);
        setIsInfoTooltipOpen(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api.editProfile(userData)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    }

    function handleEditAvatar(userData) {
        setIsLoading(true);
        api.refreshAvatar(userData)
            .then((newData) => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    }

    function handleAddNewCard(name, link) {
        setIsLoading(true);
        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    }

    function handleDeleteCard() {
        setIsLoading(true);
        api.deleteCard(cardForDelete._id)
            .then(() => {
                setCards((state) =>
                    state.filter((item) => item._id !== cardForDelete._id));
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className='page'>
            <CurrentUserContext.Provider value={currentUser}>
                <Routes>
                    <Route path="/sign-up"
                        element={
                            <>
                                <Header title='Войти' route="/sign-in" />
                                <Register onRegister={handleRegister} />
                            </>
                        }
                    />
                    <Route path="/sign-in"
                        element={
                            <>
                                <Header title='Регистрация' route="/sign-up" />
                                <Login onLogin={handleLogin} />
                            </>
                        }
                    />
                    <Route path="/react-mesto-auth" element={
                        <>
                            <Header
                                title='Выйти'
                                email={email}
                                onClick={handleSingOut}
                                route=""
                            />
                            <ProtectedRoute
                                element={Main}
                                loggedIn={loggedIn}
                                cards={cards}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleOpenImagePopup}
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeleteCardClick}
                            />
                            <Footer />
                        </>
                    }
                    />
                    <Route path="*" element={
                        <>
                            <Header route="" />
                            <PageNotFound />
                        </>
                    }
                    />
                </Routes>
                <EditProfilePopup
                    isOpened={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                >
                </EditProfilePopup>
                <AddPlacePopup
                    isOpened={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddCard={handleAddNewCard}
                    isLoading={isLoading}
                >
                </AddPlacePopup>
                <EditAvatarPopup
                    isOpened={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onEditAvatar={handleEditAvatar}
                    isLoading={isLoading}
                >
                </EditAvatarPopup>
                <DeleteCoonfirmationPopup
                    card={selectedCard}
                    isOpened={isDeleteCardPopup}
                    onClose={closeAllPopups}
                    onDeleteCard={handleDeleteCard}
                    isLoading={isLoading}
                >
                </DeleteCoonfirmationPopup>
                <ImagePopup
                    isOpened={isImagePopupOpen}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />
                <InfoToolTip
                    isOpened={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    text={isInfoTooltipText}
                    isSuccess={isRegistrationSuccess}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;