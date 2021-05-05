import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = { }, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return { loading: true }
        case LOGIN_SUCCESS:
            return { loading: false, user: action.payload }
        case LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case LOGOUT_SUCCESS:
            return { loading: false, user: null, logout: true }
        case LOGOUT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}