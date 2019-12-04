import {combineReducers} from 'redux'
import quizReducer from './quiz-reduser'
import createReducer from './create'

export default combineReducers({
    quiz: quizReducer,
    create: createReducer
})