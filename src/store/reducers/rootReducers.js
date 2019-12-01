import {combineReducers} from 'redux'
import quizReducer from './quiz-reduser'

export default combineReducers ({
quiz: quizReducer
})