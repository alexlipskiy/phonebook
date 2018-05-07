import React, { PureComponent } from 'react';
import { FontIcon } from 'material-ui';

export default class NoResults extends PureComponent {
    render() {
        return (
            <div className="no-results">
                <FontIcon className="material-icons">mood_bad</FontIcon>
                <span className="text">We don't have any results</span>
            </div>
        );
    }
}