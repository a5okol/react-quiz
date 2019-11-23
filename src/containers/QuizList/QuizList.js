import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './QuizList.scss'
import axios from 'axios'

export default class QuizList extends Component {

    state = {
        quizes: []
    };

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() { // основной компонент для работы с БД
        try {
            const response = await axios.get('https://react-quiz-bd01b.firebaseio.com/quizes.json');

            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id:key,
                    name: `Тест №${index + 1}`
                })

            });

            this.setState({
                quizes
            })

        } catch (e) {
            console.log(e);
        }

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