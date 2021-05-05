import axios from "axios"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../constants/userConstants"
import { url } from "../store"
import Cookies from 'js-cookie'

export const login = (body) => async (dispatch) => {

    try {

        dispatch({ type: LOGIN_REQUEST })

        const { data } = await axios.post(`${url}/user/login`, body)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

        Cookies.set('user', data.token)

    } catch(e) {
        dispatch({
            type: LOGIN_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.response
        })
    }

}

export const logout = () => async (dispatch) => {

    try {

        const token = Cookies.get('user')

        if(!token) {
            throw new Error('No token')
        }

        const config = {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
        }

        dispatch({ type: LOGOUT_REQUEST })

        const { data } = await axios.get(`${url}/user/logout`, config)

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data
        })

        Cookies.remove('user')

    } catch(e) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.response
        })
    }

}