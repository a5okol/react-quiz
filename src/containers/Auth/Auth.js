import React, {Component} from 'react'
import './Auth.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'
import is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                },
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль (минимум 6 сим.)',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                },
            }
        },
    };

    loginHandler = () => {

    };

    registerHandler = () => {

    };

    validateControl(value, validation) {

        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid //trim() - очищает лишние пробелы.
        }

        if (validation.email) {
           isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }


        return isValid
    }

    submitHandler = event => {
        event.preventDefault()
    };

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: `, event.target.value);

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => { // где оператор .forEach  переопределяет на каждой итерации значение переменной isFormValid
           isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        })

    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation} // передаем параметр shouldValidate (из input.js), который будет проверяять: нужно ли валидировать инпут или нет. Где '!!'-  приводим к булиан типу
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={'Auth'}>
                <div>
                    <h1>Аторизация</h1>
                    <form onSubmit={this.submitHandler} className={'AuthForm'}>

                        {this.renderInputs()}

                        <Button
                            type="successButAuth"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primaryButAuth"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}