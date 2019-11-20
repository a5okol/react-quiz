import React, {Component} from 'react'
import './QuizCreator.scss'
import Button from '../../components/UI/Button/Button'
import {creacteControl} from '../../form/formFramework'
import Input from '../../components/UI/input/input'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

function createOptionControl(number) {
    return creacteControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number,
        }, {required: true}
    )
}

function createFormControls() {
    return {
        question: creacteControl({
            label: 'Введите вопрос:',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}), // это набор конфигураций, и как второй параметр данной функции мы сюда должны передать набор валидаций
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault()
    };

    addQuestionHandler = () => {

    };

    createQuizHandler = () => {

    };

    changeHandler = (value, controlName) => {

    };

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shoildValidate={!!control.validation}
                toushed={control.touched}
                errorMessage={control.errorMessage}
                onChange={event => this.changeHandler(event.target.value, controlName)}
                />
            { index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    render() {
        return (
            <div className={'QuizCreator'}>
                <div>
                    <h1>Создание теста.</h1>

                    <div className={'QuizCreatorBlock'}>

                        <form onSubmit={this.submitHandler}>

                            {this.renderControls()}


                            <select name="" id=""></select>

                            <Button
                                type="primaryBut"
                                onClick={this.addQuestionHandler}
                            >
                                Добавить вопрос
                            </Button>
                            <Button
                                type="successBut"
                                onClick={this.createQuizHandler}
                            >
                                Создать тест
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}