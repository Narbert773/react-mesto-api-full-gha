class Api {
    constructor(options) {
        this._headers = options.headers;
        this._baseUrl = options.baseUrl;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._handleResponse)
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._handleResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse)
    }

    refreshAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._handleResponse)
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '607ef4db-13a0-4098-bd46-3084d2682bc1',
        'Content-Type': 'application/json'
    }
});


export default api;