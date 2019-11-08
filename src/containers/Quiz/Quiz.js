import React, {Component} from 'react'
import './Quiz.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error' }
        quiz: [
            {
                question: 'В каком году была известная Октя́брьская революция?',
                rightAnswerId: 3,
                id: 1,
                answers: [
                    {text: 'В 1923 г.', id: 1},
                    {text: 'В 1915 г.', id: 2},
                    {text: 'В 1917 г.', id: 3},
                    {text: 'В 1884 г.', id: 4}
                ]
            },
            {
                question: 'Как гости ресторанов в «Славянском базаре» называли официантов в конце ХIХ, начала ХХ века?',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: 'Метрдотель', id: 1},
                    {text: 'Человек', id: 2},
                    {text: 'Кельнер', id: 3},
                    {text: 'Половые', id: 4}
                ]
            }
        ]
    };

    onAnswerClickHandler = answerId => {
        console.log('Answer Id: ', answerId);

        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {

            this.setState({
               answerState: {[answerId]: 'success'}
            });

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeout)
            }, 800);
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }


    };

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={'Quiz'}>

                <div className={'QuizWrapper'}>
                    <h1>Quiz</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz