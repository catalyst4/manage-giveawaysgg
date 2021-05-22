import axios from "axios"
import { DELETE_TYPE_FAIL, DELETE_TYPE_REQUEST, DELETE_TYPE_SUCCESS, EDIT_TYPE_FAIL, EDIT_TYPE_REQUEST, EDIT_TYPE_SUCCESS, GET_TYPES_FAIL, GET_TYPES_REQUEST, GET_TYPES_SUCCESS, NEW_TYPE_FAIL, NEW_TYPE_REQUEST, NEW_TYPE_SUCCESS } from "../constants/typeConstants"
import Cookies from 'js-cookie'
import { url } from "../store"

export const getTypes = () => async (dispatch) => {

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

        dispatch({ type: GET_TYPES_REQUEST })

        const { data } = await axios.get(`${url}/admin/type`, config)

        console.log(data)

        dispatch({
            type: GET_TYPES_SUCCESS,
            payload: data
        })

    } catch(e) {
        dispatch({
            type: GET_TYPES_FAIL,
            payload: e.response && e.response.data.message 
                ? e.response.data.message 
                : e.response
        })
    }

}

export const newType = (body) => async (dispatch) => {

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

        dispatch({ type: NEW_TYPE_REQUEST })

        const { data } = await axios.post(`${url}/admin/type`, body, config)

        dispatch({
            type: NEW_TYPE_SUCCESS,
            payload: data
        })

    } catch(e) {
        dispatch({
            type: NEW_TYPE_FAIL,
            payload: e.response && e.response.data.message 
                ? e.response.data.message 
                : e.response
        })
    }

}

export const deleteType = (type) => async (dispatch) => {

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

        dispatch({ type: DELETE_TYPE_REQUEST })

        const { data } = await axios.delete(`${url}/admin/type/${type}`, config)

        dispatch({
            type: DELETE_TYPE_SUCCESS,
            payload: data
        })

    } catch(e) {
        dispatch({
            type: DELETE_TYPE_FAIL,
            payload: e.response && e.response.data.message 
                ? e.response.data.message 
                : e.response
        })
    }

}

export const editType = (body, type) => async (dispatch) => {

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

        dispatch({ type: EDIT_TYPE_REQUEST })

        const { data } = await axios.post(`${url}/admin/type/${type}`, body, config)

        dispatch({
            type: EDIT_TYPE_SUCCESS,
            payload: data
        })
        
    } catch(e) {
        dispatch({
            type: EDIT_TYPE_FAIL,
            payload: e.response && e.response.data.message 
                ? e.response.data.message 
                : e.response
        })
    }

}