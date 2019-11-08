import React from 'react'
import './Answeritem.scss'

const Answeritem = props => {
    const cls = ['Answeritem'];

    if (props.state) {
        cls.push([props.state])
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
};

export default Answeritem