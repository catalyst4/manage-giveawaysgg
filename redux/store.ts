import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { typeReducer, typesReducer } from "./reducers/typeReducer"
import { userReducer } from "./reducers/userReducer"
export const url = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_LOCALHOST

const reducers = combineReducers({
    user: userReducer,
    type: typeReducer,
    types: typesReducer
})

const middleware = [thunk]

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

