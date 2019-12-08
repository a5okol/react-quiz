import React, {Component} from 'react'
import './Drawer.scss'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'


class Drawer extends Component {

    clickHandle = () => {
        this.props.onClose()
    };

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'classes.active'}
                        onClick={this.clickHandle}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = ['Drawer'];

        if (!this.props.isOpen) {
            cls.push('close')
        }

        const links = [
            {to: '/', label: 'Список', exact: true},
        ];

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Авторизация', exact: false})
        }


        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                        <li>
                            <a href="https://github.com/a5okol/react-app2"
                               className={'link'} target="_blank" style={{background: '#e4e4e4', marginLeft: '15px'}}>GitHub</a>
                        </li>
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer