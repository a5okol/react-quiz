import React, {Component} from 'react'
import './QuizCreator.scss'
import Button from '../../components/UI/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../components/UI/input/input'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
    return createControl({
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number,
        }, {required: true}
    )
}

function createFormControls() {
    return {
        question: createControl({
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
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault()
    };

    addQuestionHandler = event => {
        event.preventDefault();

        const quiz = this.state.quiz.concat(); // кланируем массив вызывая метод concat, данный метод нам просто вернет копиу массива (так мы также защищаемся от мутаций)
        const index = quiz.length +1;

        // const questionItem = {
        //     question: this.state.formControls.question.value,
        //     id: index,
        //     rightAnswerId: this.state.rightAnswerId,
        //     answers: [
        //         {text: this.state.formControls.option1.value, id: this.state.formControls.option1.id},
        //     ]
        // }

        // Тоже самое, что и выше, только упрощенное:

        const {question, option1, option2, option3, option4} = this.state.formControls; // создание диструктуризации из объекта this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };

        quiz.push(questionItem);

        this.setState({
            quiz,
            // и обнуляем форму (устанавливаем форму по-умолчанию):
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    };

    createQuizHandler = event => {
        event.preventDefault()

    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);


        formControls[controlName] = control; // в локальные копии formControls по имени controlName занести новое значение control'a

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

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
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
           rightAnswerId: +event.target.value
        })
    };

    render() {
        const select = <Select
            label="Выбирите правельный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text:1, value: 1},
                {text:2, value: 2},
                {text:3, value: 3},
                {text:4, value: 4}
            ]}
        />;

        return (
            <div className={'QuizCreator'}>
                <div>
                    <h1>Создание теста.</h1>

                    <div className={'QuizCreatorBlock'}>

                        <form onSubmit={this.submitHandler}>

                            {this.renderControls()}


                            { select }

                            <Button
                                type="primaryBut"
                                onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Добавить вопрос
                            </Button>
                            <Button
                                type="successBut"
                                onClick={this.createQuizHandler}
                                disabled={this.state.quiz.length === 0}
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