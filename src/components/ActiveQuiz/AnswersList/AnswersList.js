import React from 'react'
import './AnswersList.scss'
import Answeritem from './Answeritem/Answeritem'

const AnswersList = props => {
    return (
        <ul className={'AnswersList'}>
            {props.answers.map((answer, index) => {
                return (
                    <Answeritem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        state={props.state ? props.state[answer.id] : null}
                    />
                )
            })}
        </ul>
    );
};
export default AnswersList