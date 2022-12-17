import {combineReducers} from "redux"
import { productidReducer, productReducer, search } from "./productReducer"

const reducers=combineReducers({
    Allproduct: productReducer,
    product: productidReducer,
    searchopt: search
})
export default reducers;