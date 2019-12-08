import {combineReducers} from 'redux'
import quizReducer from './quiz-reduser'
import createReducer from './create'
import authReducer from './auth-reducer'

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
})