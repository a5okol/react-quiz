import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwe1rX7SzdL5PNE37r-qTwjNYgxQ8cHh8';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwe1rX7SzdL5PNE37r-qTwjNYgxQ8cHh8'
        }

        const response = await axios.post(url, authData);
        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken); // ложим в localStorage токен, который мы получили от сервера.
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(authLogout(data.expiresIn))
    }
}

export function authLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token'); // ложим в localStorage токен, который мы получили от сервера.
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) /  1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}