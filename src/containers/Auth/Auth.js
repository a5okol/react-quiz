import React, {Component} from 'react'
import './Auth.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'

export default class Auth extends Component {

    loginHandler = () =>{

    };

    registerHandler = () => {

    };

    submitHandler = event => {

    };

    render() {
        return(
        <div className={'Auth'}>
            <div>
                <h1>Аторизация</h1>
                <form onSubmit={this.submitHandler} className={'AuthForm'}>

                    <Input label="Email"/>
                    <Input
                        label="Пароль"
                        errorMessage={'Test'}
                    />

                    <Button
                        type="success"
                        onClick={this.loginHandler}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.registerHandler}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </div>
        )
    }
}