import axios from 'axios'
import Cookies from 'js-cookie'
import { EDIT_WINNER_FAIL, EDIT_WINNER_REQUEST, REROLL_WINNER_FAIL, REROLL_WINNER_REQUEST, REROLL_WINNER_SUCCESS } from '../constants/giveawayConstants'
import { EDIT_TYPE_SUCCESS } from '../constants/typeConstants'
import { url } from '../store'

export const rerollWinner = (type, id) => async (dispatch) => {

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

        dispatch({ type: REROLL_WINNER_REQUEST })

        const { data } = await axios.get(`${url}/admin/type/${type}/id/${id}/reroll`, config)

        dispatch({
            type: EDIT_TYPE_SUCCESS,
            payload: data
        })

    } catch(e) {
        dispatch({
            type: REROLL_WINNER_FAIL,
            payload: e.response && e.response.data.message 
                ? e.response.data.message  
                : e.response
        })
    }

}

export const editWinner = (body, type, id) => async (dispatch) => {

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

        dispatch({ type: EDIT_WINNER_REQUEST })

        const { data } = await axios.post(`${url}/admin/type/${type}/id/${id}`, body, config)

        console.log(data)

        dispatch({
            type: EDIT_TYPE_SUCCESS,
            payload: data
        })

    } catch(e) {
        dispatch({
            type: EDIT_WINNER_FAIL,
            payload: e.response && e.response.data.message 
                ? e.response.data.message  
                : e.response
        })
    }

}