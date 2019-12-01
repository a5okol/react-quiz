import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './QuizList.scss'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz-actions'

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map(quiz => {
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
        this.props.fetchQuizes();
        // try {
        //     const response = await axios.get('/quizes.json');
        //
        //     const quizes = [];
        //     Object.keys(response.data).forEach((key, index) => {
        //         quizes.push({
        //             id: key,
        //             name: `Тест №${index + 1}`
        //         })
        //
        //     });
        //
        //     this.setState({
        //         quizes, loading: false
        //     })
        //
        // } catch (e) {
        //     console.log(e);
        // }

    }

    render() {
        return (
            <div className={'QuizList'}>
                <div className={'QuizWrapper'}>
                    <h1>Список тестов</h1>
                    <div className={'QuizListBlock'}>

                        {
                            this.props.loading && this.props.quizes.length !== 0
                            ? <Loader/>
                            :
                            <ul>
                                {this.renderQuizes()}
                            </ul>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchProps)(QuizList)