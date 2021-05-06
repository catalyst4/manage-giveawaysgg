import { EDIT_WINNER_FAIL, EDIT_WINNER_SUCCESS, REROLL_WINNER_FAIL, REROLL_WINNER_SUCCESS } from "../constants/giveawayConstants"
import { DELETE_TYPE_SUCCESS, EDIT_TYPE_SUCCESS, GET_TYPES_FAIL, GET_TYPES_REQUEST, GET_TYPES_SUCCESS, NEW_TYPE_SUCCESS } from "../constants/typeConstants"

export const typeReducer = (state = { }, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export const typesReducer = (state = { types: undefined }, action) => {
    switch(action.type) {
        case GET_TYPES_REQUEST:
            return { loading: true }
        case GET_TYPES_SUCCESS:
            return { loading: false, types: action.payload }
        case GET_TYPES_FAIL:
            return { loading: false, error: action.payload }

        case NEW_TYPE_SUCCESS:
            return { loading: false, types: [...state.types, action.payload]}

        case DELETE_TYPE_SUCCESS: {
            
            const deletedType = action.payload

            console.log(deletedType)

            const updatedTypes = state.types.filter(type => type._id !== deletedType._id)
            
            console.log(updatedTypes)

            return { loading: false, types: [...updatedTypes] }
        }
            
        case EDIT_TYPE_SUCCESS: {
            
            const editedType = action.payload

            const updatedTypes = state.types.map(type => {
                if(type._id === editedType._id) {
                    console.log()
                    return editedType
                }
                return type
            })

            return { loading: false, types: [...updatedTypes] }
        }
        case EDIT_WINNER_FAIL:
            return { loading: false, types: [...state.types], error: action.payload }

        case REROLL_WINNER_FAIL:
            return { loading: false, types: [...state.types], error: action.payload }

        default:
            return state
    }
}