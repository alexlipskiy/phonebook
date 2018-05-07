import React, { Component } from 'react';
import Header from '../Header/Header';
import { observer } from 'mobx-react';
import NoResults from '../Results/NoResults';
import Results from '../Results/Results';
import "./app.scss";

@observer(['phones', 'getPhone', 'test'])
export default class App extends Component {
    componentDidMount() {
        this.props.getPhone();
    }

    render() {
        const phones = this.props.phones.slice() || [];

        return (
            <div className="container">
                <Header/>
                <div className="wrapper">
                    { phones.length ? <Results phones={phones}/> : <NoResults /> }
                </div>
            </div>
        );
    }
}