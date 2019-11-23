import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './QuizList.scss'
import axios from 'axios'

export default class QuizList extends Component {

    renderQuizes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <NavLink to={'/quiz/' + quiz}>
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount(){
axios.get('https://react-quiz-bd01b.firebaseio.com/quiz.json').then(response => {
    console.log(response);
})
    }

    render() {
        return (
            <div className={'QuizList'}>
                <div className={'QuizWrapper'}>
                    <h1>Список тестов</h1>
                    <div className={'QuizListBlock'}>
                        <ul>
                            {this.renderQuizes()}
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}