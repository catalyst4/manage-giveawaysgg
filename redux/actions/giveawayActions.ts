import axios from 'axios'
import Cookies from 'js-cookie'
import { REROLL_WINNER_FAIL, REROLL_WINNER_REQUEST, REROLL_WINNER_SUCCESS } from '../constants/giveawayConstants'
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

        const { data } = await axios.get(`${url}/type/${type}/id/${id}/reroll`, config)

        dispatch({
            type: REROLL_WINNER_SUCCESS,
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