import React from 'react'
import './input.scss'

function isInvalid({valid, touched, shouldValidate}) { // сюда передаем параметры props
    return !valid && shouldValidate && touched // Проверяем: если "не валидированный контрол" И "не должены его валедироват" И "если его уже потрогали", то значит информация не валидна
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = ['Input'];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }

        </div>
    )
};

export default Input