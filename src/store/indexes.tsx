import {combineReducers, createStore} from "redux"
import { tasksReducer } from "./emplReducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"



const rootReducer = combineReducers({
    tasks: tasksReducer
})

const persistConfig = {
    key:"root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

